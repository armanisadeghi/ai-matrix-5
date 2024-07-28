"use client";

import { atom, atomFamily, DefaultValue, selector, selectorFamily } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
import { ChatDetailsType, ChatType, mapToChatType, MessageType } from "@/types";
import { addMultipleCustomMessages, createChatStartEntry, updateMessageText } from "@/utils/supabase/chatDb";
import supabase from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

export const isNewChatAtom = atom<boolean | null>({
    key: "isNewChatAtom",
    default: null,
});

export const activeChatIdAtom = atom<string>({
    key: "activeChatId",
    default: undefined,
});

export const hasSubmittedMessageAtom = atom({
    key: "hasSubmittedMessage",
    default: false,
});

export const systemMessageAtom = atom<string>({
    key: "systemMessageAtom",
    default: "You are a helpful assistant",
});

export const userTextInputAtom = atom<string>({
    key: "userTextInputAtom",
    default: "",
});

export const focusInputAtom = atom<boolean>({
    key: "focusInputAtom",
    default: false,
});

export const submitChatIdAtom = atom<string>({
    key: "submitChatIdAtom",
    default: undefined,
});

export const userInputAtomFamily = atomFamily<string, string>({
    key: "userInputAtomFamily",
    default: "",
});

export const activeChatMessagesArrayAtom = atom<MessageType[]>({
    key: "activeChatMessagesArrayAtom",
    default: [],
});

export const hookIdAtom = atom<string>({
    key: "hookIdAtom",
    default: "OpenAiStream",
});

export const hookIndexAtom = atom<number>({
    key: "hookIndexAtom",
    default: 0,
});

export const streamTriggerAtomFamily = atomFamily<boolean, { hookId: string; index: number }>({
    key: "streamTriggerAtomFamily",
    default: false,
});

export const fetchStatusAtom = atom<"idle" | "fetching" | "success" | "error" | "dbError">({
    key: "fetchStatusAtom",
    default: "idle",
});

export const fullAssistantTextAtom = atom<string>({
    key: "fullAssistantTextAtom",
    default: "",
});

export const remainingCountAtom = atom<number>({
    key: "remainingCountAtom",
    default: 1,
});

export const chatTransitionAtom = atom<"idle" | "new" | "transition">({
    key: "chatTransitionAtom",
    default: "idle",
});

export const streamStatusAtom = atom<"idle" | "waiting" | "streaming" | "success" | "error">({
    key: "streamStatusAtom",
    default: "idle",
});

export const assistantTextStreamAtom = atom<string>({
    key: "assistantTextStreamAtom",
    default: "",
});

export const chatSummariesAtom = atom<ChatType[]>({
    key: "chatSummariesAtom",
    default: selector({
        key: "chatSummariesDefault",
        get: async ({ get }) => {
            const matrixId = get(activeUserAtom).matrixId;
            if (!matrixId) return [];
            console.log("activeUser Matrix ID:", matrixId);
            const { data, error } = await supabase.rpc("fetch_user_chats", { user_matrix_id: matrixId });
            if (error) {
                console.error("Failed to fetch chat summaries:", error);
                return [];
            }
            return data
                ? data
                      .map(mapToChatType)
                      .sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime())
                : [];
        },
    }),
});

export const chatMessagesAtomFamily = atomFamily<MessageType[], string>({
    key: "chatMessagesAtomFamily",
    default: [],
});

export const chatMessagesSelectorFamily = selectorFamily({
    key: "chatMessagesSelectorFamily",
    get:
        (chatId: string) =>
        ({ get, getCallback }) => {
            const initialChats = get(chatSummariesAtom);
            const messages = get(chatMessagesAtomFamily(chatId)) ? get(chatMessagesAtomFamily(chatId)) : [];

            const fetchMessages = getCallback(({ snapshot, set }) => async () => {
                const newChat = get(isNewChatAtom);
                if (newChat) return [];

                const messages = await snapshot.getPromise(chatMessagesAtomFamily(chatId));
                if (messages && messages.length > 0) {
                    set(isNewChatAtom, false);
                    console.log("LOCAL MESSAGES: chatMessagesSelectorFamily:", messages);
                    return messages;
                }

                const { data, error } = await supabase.rpc("fetch_messages", { matrix_chat_id: chatId });
                console.log("DATABASE: chatMessagesSelectorFamily Fetched Messages:", data);
                if (error) {
                    return [];
                }

                if (data && !error) {
                    set(chatMessagesAtomFamily(chatId), data as unknown as MessageType[]);
                    set(chatSummariesAtom, (prevChats) =>
                        prevChats.map((chat) => (chat.chatId === chatId ? { ...chat, fetchedMessages: true } : chat)),
                    );
                }
                const updatedMessages = data as unknown as MessageType[];
                console.log("Messages Data:", data);
                return updatedMessages;
            });

            const addFirstUserMessage = getCallback(({ snapshot, set }) => async (userInput: string) => {
                const activeChatId = get(activeChatIdAtom);
                if (activeChatId !== chatId) throw new Error("Chat ID mismatch");

                const chatWithMessages = get(chatStarter)(userInput, activeChatId);

                const messages = chatWithMessages.messages;
                const allChats = get(chatSummariesAtom);

                set(chatSummariesAtom, [chatWithMessages, ...allChats]);
                set(chatMessagesAtomFamily(chatId), messages);
                set(chatTransitionAtom, "transition");

                const hookId = get(hookIdAtom);
                const hookIndex = get(hookIndexAtom);
                set(streamTriggerAtomFamily({ hookId: hookId, index: hookIndex }), true);

                return messages;
            });

            const addUserMessage = getCallback(({ snapshot, set }) => async (userInput: string) => {
                const activeMessages = get(chatMessagesAtomFamily(chatId));

                set(userTextInputAtom, userInput);
                set(hasSubmittedMessageAtom, true);
                set(isNewChatAtom, false);

                const messages = get(userMessageUpdater)(userInput, chatId, activeMessages);
                set(chatMessagesAtomFamily(chatId), messages);

                const hookId = get(hookIdAtom);
                const hookIndex = get(hookIndexAtom);
                set(streamTriggerAtomFamily({ hookId: hookId, index: hookIndex }), true);

                return messages;
            });

            const addAssistantText = getCallback(
                ({ snapshot, set }) =>
                    async (messageId: string, fullResponse: string) => {
                        const { data, error } = await updateMessageText(messageId, fullResponse);
                        if (error) {
                            console.error("Error adding user message:", error);
                        } else {
                            console.log("addUserMessage User message added:", data);
                        }
                    },
            );

            return {
                messages,
                initialChats,
                fetchMessages,
                addFirstUserMessage,
                addUserMessage,
                addAssistantText,
            };
        },
});

export const chatStarter = selector<(userMessage: string, chatId: string) => ChatDetailsType>({
    key: "chatStarter",
    get:
        ({ get }) =>
        (userMessage: string, chatId: string): ChatDetailsType => {
            const newChatState = get(chatTransitionAtom);
            const userId = get(activeUserAtom).matrixId;
            const systemMessage = get(systemMessageAtom);

            if (newChatState !== "new") throw new Error('ERROR! chatStarter called when transition state is not "NEW"');
            if (userMessage.length === 0) throw new Error("ERROR! chatStarter called with empty messages");
            if (!userId) throw new Error("ERROR! chatStarter called but User Id not found");

            const systemMessageEntry: MessageType = {
                chatId: chatId,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                index: 0,
                role: "system",
                text: systemMessage,
            };

            const userMessageEntry: MessageType = {
                chatId: chatId,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                index: 1,
                role: "user",
                text: userMessage,
            };

            const assistantEntry = {
                chatId: chatId,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                index: 2,
                role: "assistant",
                text: "",
            };

            const initialMessages: MessageType[] = [systemMessageEntry, userMessageEntry, assistantEntry];
            const chatTitle = userMessage.length > 35 ? userMessage.substring(0, 35) + "..." : userMessage;

            const chatStartObject = {
                chatId: chatId,
                chatTitle: chatTitle,
                createdAt: new Date().toISOString(),
                lastEdited: new Date().toISOString(),
                matrixId: userId,
                metadata: {},
                messages: initialMessages,
            };

            console.log("chatStarter: Chat Start Object:", chatStartObject);

            Promise.resolve().then(() => {
                createChatStartEntry(chatStartObject).catch((error) => {
                    console.error("Failed to add custom message:", error);
                });
            });
            return chatStartObject;
        },
});

const userMessageUpdater = selector<
    (userMessage: string, chatId: string, activeMessages: MessageType[]) => MessageType[]
>({
    key: "userMessageUpdater",
    get:
        ({ get }) =>
        (userMessage: string, chatId: string, activeMessages: MessageType[]): MessageType[] => {
            const userIndex = activeMessages.length;

            const userEntry: MessageType = {
                chatId: chatId,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                index: userIndex,
                role: "user",
                text: userMessage,
            };
            const assistantEntry: MessageType = {
                chatId: chatId,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                index: userIndex + 1,
                role: "assistant",
                text: "",
            };

            const updatedMessagesArray = [...activeMessages, userEntry, assistantEntry];

            Promise.resolve().then(() => {
                addMultipleCustomMessages(chatId, [userEntry, assistantEntry]).catch((error) => {
                    console.error("Failed to add custom messages:", error);
                });
            });
            return updatedMessagesArray;
        },
});

export const chatSelectorFamily = selectorFamily<ChatType | null, string>({
    key: "chatSelector",
    get:
        (chatId: string) =>
        ({ get }) => {
            const chatSummaries = get(chatSummariesAtom);
            return chatSummaries.find((chat) => chat.chatId === chatId) || null;
        },
});

// Selector family for getting a specific chat with its messages
export const chatWithMessagesSelector = selectorFamily<ChatDetailsType | null, string>({
    key: "chatWithMessagesSelector",
    get:
        (chatId: string) =>
        async ({ get }) => {
            const chat = get(chatSelectorFamily(chatId));
            if (!chat) {
                return null;
            }

            const { messages, fetchMessages } = get(chatMessagesSelectorFamily(chatId));

            if (!messages || messages.length === 0) {
                await fetchMessages();
            }

            const updatedMessages = get(chatMessagesSelectorFamily(chatId)).messages;
            return {
                ...chat,
                messages: updatedMessages,
            };
        },
});

// You can keep the activeChatSelector if you still need it
export const activeChatSelector = selector<ChatType | null>({
    key: "activeChatSelector",
    get: ({ get }) => {
        const activeChatId = get(activeChatIdAtom);
        return get(chatSelectorFamily(activeChatId));
    },
});

// And an active chat with messages selector
export const activeChatWithMessagesSelector = selector<ChatDetailsType | null>({
    key: "activeChatWithMessagesSelector",
    get: ({ get }) => {
        const activeChatId = get(activeChatIdAtom);
        return get(chatWithMessagesSelector(activeChatId));
    },
});

export const userUpdatedArraySelector = selector<any | null>({
    key: "userUpdatedArraySelector",
    get: ({ get }) => {
        return [];
    },
});

export const chatStartSelector = selector<any | null>({
    key: "chatStartSelector",
    get: ({ get }) => {
        return ;
    },
});

export const blankAssistantTextSelector = selector<any | null>({
    key: "blankAssistantTextSelector",
    get: ({ get }) => {
        return [];
    },
});

export const openAiArraySelector = selector<any | null>({
    key: "openAiArraySelector",
    get: ({ get }) => {
        return [];
    },
});

// Currently not in use -------------------------------------------------------------------------------------------

export const chatMessagesSelector = selector({
    key: "chatMessagesSelector",
    get: async ({ get }) => {
        const activeChatId = get(activeChatIdAtom);
        const chatSummaries = get(chatSummariesAtom);
        if (!activeChatId) {
            throw new Error("No active chat ID");
        }
        if (activeChatId === "new-chat") {
            return [];
        }
        const existingChat = chatSummaries.find((chat) => chat.chatId === activeChatId);

        if (existingChat && existingChat.messages) {
            return existingChat.messages;
        }
        const { data, error } = await supabase.rpc("fetch_messages", { matrix_chat_id: activeChatId });
        if (error) {
            return [];
        }
        return data;
    },
    set: ({ set, get }, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const chatSummaries = get(chatSummariesAtom);
            const updatedSummaries = chatSummaries.map((chat) =>
                chat.chatId === (newValue as MessageType[])[0]?.chatId
                    ? { ...chat, messages: newValue as MessageType[] }
                    : chat,
            );
            set(chatSummariesAtom, updatedSummaries);
            set(activeChatMessagesArrayAtom, newValue as MessageType[]);
        }
    },
});

export const requestTaskAtom = atom<string>({
    key: "requestTaskAtom",
    default: "matrix_chat",
});

export const taskTriggerAtomFamily = atomFamily<boolean, { hookId: string; index: number }>({
    key: "taskTriggerAtomFamily",
    default: false,
});

export const socketStatusAtom = atom<any>({
    key: "socketStatusAtom",
    default: "not-connected",
});

export const taskStatusAtom = atom<string>({
    key: "taskStatusAtom",
    default: "idle",
});

export const recipeIdAtom = atom<any>({
    key: "recipeIdAtom",
    default: null,
});
