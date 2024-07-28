import supabase from "@/utils/supabase/client";
import { deepEqual } from "@hapi/hoek";
import { useCallback, useState } from "react";

// hooks/ai/new/useManageChatState.ts
// This is how we could fully manage state with Redis. It's not perfect, but it's very close to what we need.
// SEE THIS: lib/ai-chat/new/messages.ts

type MessageType = {
    chatId: string;
    createdAt: string;
    id: string;
    index: number;
    text: string;
    role: string;
    isFetched?: boolean;
    isChanged?: boolean;
    isNew?: boolean;
    isDeleted?: boolean;
};

interface ChatType {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: any;
    messages?: MessageType[];
    isFetched?: boolean;
    isChanged?: boolean;
    isNew?: boolean;
    isDeleted?: boolean;
}

const useManageChats = (initialChats: ChatType[]) => {
    const [chats, setChats] = useState<ChatType[]>(initialChats);

    const detectChanges = useCallback((oldChats: ChatType[], newChats: ChatType[]) => {
        const changes = newChats.map((newChat) => {
            const oldChat = oldChats.find((c) => c.chatId === newChat.chatId);
            if (!oldChat) {
                return { ...newChat, isNew: true };
            }
            const messagesChanges = detectMessageChanges(oldChat.messages || [], newChat.messages || []);
            const chatChanged = !deepEqual(
                { ...oldChat, messages: oldChat.messages },
                { ...newChat, messages: newChat.messages },
            );
            return { ...newChat, isChanged: chatChanged, messages: messagesChanges };
        });

        oldChats.forEach((oldChat) => {
            if (!newChats.some((c) => c.chatId === oldChat.chatId)) {
                //@ts-ignore
                changes.push({ ...oldChat, isDeleted: true });
            }
        });

        return changes;
    }, []);

    const detectMessageChanges = (oldMessages: MessageType[], newMessages: MessageType[]) => {
        const changes = newMessages.map((newMessage) => {
            const oldMessage = oldMessages.find((m) => m.id === newMessage.id);
            if (!oldMessage) {
                return { ...newMessage, isNew: true };
            }
            return deepEqual(oldMessage, newMessage) ? newMessage : { ...newMessage, isChanged: true };
        });

        oldMessages.forEach((oldMessage) => {
            if (!newMessages.some((m) => m.id === oldMessage.id)) {
                changes.push({ ...oldMessage, isDeleted: true });
            }
        });

        return changes;
    };

    const applyChanges = useCallback(async (chatChanges: ChatType[]) => {
        for (const chat of chatChanges) {
            if (chat.isNew) {
                //@ts-ignore
                await supabase.rpc("create_chat_and_messages", { start_chat: chat });
                continue;
            }
            if (chat.isDeleted) {
                //@ts-ignore
                await supabase.rpc("delete_chat", { chat_id: chat.chatId });
                continue;
            }
            if (chat.isChanged) {
                //@ts-ignore
                await supabase.rpc("update_chat", { chat_id: chat.chatId, new_chat_data: chat });
            }

            // Handle message changes
            for (const message of chat.messages || []) {
                if (message.isNew) {
                    //@ts-ignore
                    await supabase.rpc("add_message", { chat_id: chat.chatId, message });
                } else if (message.isChanged) {
                    //@ts-ignore
                    await supabase.rpc("edit_message", { message_id: message.id, new_message_data: message });
                } else if (message.isDeleted) {
                    //@ts-ignore
                    await supabase.rpc("delete_message", { message_id: message.id });
                }
            }
        }
    }, []);

    const updateChats = useCallback(
        async (newChats: ChatType[]) => {
            const chatChanges = detectChanges(chats, newChats);
            await applyChanges(chatChanges);
            setChats(newChats); // Update state only after successful API operations
        },
        [chats, detectChanges, applyChanges],
    );

    return { chats, updateChats };
};

export default useManageChats;
