import { ChatId, MessageType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { createChatStartEntry } from "@/utils/supabase/chatDb";
import supabase from "@/utils/supabase/client";
import { activeUserAtom } from "@/state/userAtoms";
import { useRecoilValue } from "recoil";
import { activeChatIdAtom } from "@/state/aiAtoms/aiChatAtoms";

const chatId = uuidv4();

export const createChatStart = async (
    userMessage: string,
    userId: string,
): Promise<{
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: any;
    messages: MessageType[];
}> => {
    const systemMessageEntry: MessageType = {
        chatId: chatId,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        index: 0,
        role: "system",
        text: "You are a helpful assistant",
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

    await createChatStartEntry(chatStartObject).catch((error) => {
        console.error("Failed to add custom message:", error);
    });

    return chatStartObject;
};

const addCustomMessage = async (chatId: ChatId, newEntry: MessageType) => {
    if (!chatId || !newEntry?.role || !newEntry?.text) {
        console.error("Missing required fields");
        return { data: null, error: new Error("Missing required fields") };
    }
    const { data, error } = await supabase.rpc("add_custom_message", {
        chat_id: chatId,
        id: newEntry.id,
        role: newEntry.role,
        text: newEntry.text,
        index: newEntry.index,
        created_at: newEntry.createdAt,
    });
    return { data, error };
};

export const sendUserPrompt = async (userMessage: string, userId: string) => {
    const newChat = await createChatStart(userMessage, userId);

    const { data, error } = await supabase.rpc("fetch_messages", { matrix_chat_id: chatId });
    console.log("DATABASE: chatMessagesSelectorFamily Fetched Messages:", data);

    if (error) {
        return [];
    }

    const messageEntry: MessageType = {
        chatId: newChat.chatId,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        index: 3,
        role: "user",
        text: userMessage,
    };

    const response = await addCustomMessage(chatId, messageEntry);

    console.log({ response });

    return {
        data: response,
        errors: error,
    };
};
