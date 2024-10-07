// utils/supabase/chatDb.ts

import { ChatDetailsType, ChatId, ChatType, Json, MessageType } from "@/types";
import supabase from "@/utils/supabase/client";

async function fetchUserChats(userId: string): Promise<ChatType[]> {
    if (!userId) return console.error("Missing userId"), [];
    const { data, error } = await supabase.rpc("fetch_user_chats", { user_matrix_id: userId });
    if (error) {
        console.error("Error fetching user chats:", error);
        return [];
    } else {
        console.log("fetchUserChats User chats:", data);
        return data;
    }
}

async function fetchChatMessages(chatId: string): Promise<MessageType[]> {
    if (!chatId || chatId === "") {
        return [];
    }

    const { data, error } = await supabase.rpc("fetch_messages", { matrix_chat_id: chatId });
    console.log("fetchChatMessages fetched Message data: ", data);
    if (error) {
        console.error("Error fetching chat messages:", error);
        throw error;
    } else {
        console.log("fetchChatMessages Chat messages:", data);
        return data;
    }
}

async function createChatStartEntry(startChatObject: ChatDetailsType) {
    if (!startChatObject || Object.keys(startChatObject).length === 0)
        return console.error("Missing or empty startChatObject");
    const { data, error } = await supabase.rpc("create_chat_and_messages", {
        start_chat: startChatObject as unknown as Json,
    });

    if (error) {
        console.error("Error adding assistant message:", error);
    } else {
        console.log("createChatStartEntry Chat Created:", data);
    }
}

async function updateLastAssistantText(messages: { id: string; text: string }[]) {
    const lastMessage = messages[messages.length - 1];
    return updateMessageText(lastMessage.id, lastMessage.text);
}

async function addSystemMessage(chatId: string, message: string) {
    if (!chatId) return console.error("Missing chatId");
    const { data, error } = await supabase.rpc("add_system_message", { chat_id: chatId, message });
    if (error) {
        console.error("Error adding system message:", error);
    } else {
        console.log("addSystemMessage System message added:", data);
    }
}

async function addUserMessage(chatId: string, message: string) {
    if (!chatId) return console.error("Missing chatId");
    const { data, error } = await supabase.rpc("add_user_message", { chat_id: chatId, message });
    if (error) {
        console.error("Error adding user message:", error);
    } else {
        console.log("addUserMessage User message added:", data);
    }
}

async function editMessage(updates: Partial<MessageType> & { id: string }) {
    if (!updates.id) {
        console.error("Missing required field: id");
        return { data: null, error: new Error("Missing required field: id") };
    }
    const { data, error } = await supabase.rpc("edit_message", {
        p_message_id: updates.id,
        p_updates: updates,
    });

    return { data, error };
}

async function updateMessageText(id: string, text: string) {
    if (!id) {
        console.error("Missing required field: id");
        return { data: null, error: new Error("Missing required field: id") };
    }
    const { data, error } = await supabase.rpc("edit_message", {
        p_message_id: id,
        p_updates: { text },
    });
    return { data, error };
}

async function addAssistantMessage(chatId: string, message: string) {
    if (!chatId) return console.error("Missing chatId");
    const { data, error } = await supabase.rpc("add_assistant_message", { chatid: chatId, message });
    if (error) {
        console.error("Error adding assistant message:", error);
    } else {
        console.log("addAssistantMessage Assistant message added:", data);
    }
}

async function addCustomMessage(chatId: ChatId, newEntry: MessageType) {
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
}

async function addMultipleCustomMessages(chatId: ChatId, newEntries: MessageType[]) {
    if (!chatId || !Array.isArray(newEntries) || newEntries.length === 0) {
        console.error("Invalid input: chatId must be provided and newEntries must be a non-empty array");
        return { data: null, error: new Error("Invalid input") };
    }

    const results = [];
    const errors = [];

    for (const entry of newEntries) {
        if (!entry.role || entry.text === undefined || entry.text === null) {
            console.warn("Skipping entry due to missing role or text:", entry);
            errors.push({ entry, error: new Error("Missing role or text") });
            continue;
        }

        try {
            const { data, error } = await supabase.rpc("add_custom_message", {
                chat_id: chatId,
                id: entry.id,
                role: entry.role,
                text: entry.text,
                index: entry.index,
                created_at: entry.createdAt,
            });

            if (error) {
                console.error("Error adding message:", error);
                errors.push({ entry, error });
            } else {
                results.push(data);
            }
        } catch (error) {
            console.error("Exception while adding message:", error);
            errors.push({ entry, error });
        }
    }

    return {
        data: results,
        errors: errors.length > 0 ? errors : null,
    };
}

async function cloneChat(originalChatId: string): Promise<ChatType> {
    if (!originalChatId) throw new Error("Missing originalChatId");
    const { data, error } = await supabase.rpc("clone_chat", { original_chat_id: originalChatId });

    if (error) {
        console.error("Error cloning chat:", error);
        throw error;
    } else {
        return data as unknown as ChatType;
    }
}

async function cloneAndEditChat(
    originalChatId: string,
    editedIndex: number,
    newMessage: string,
    newMessageRole: string,
): Promise<ChatType> {
    if (!originalChatId || !newMessage || !newMessageRole || typeof editedIndex !== "number")
        throw new Error("Missing or invalid required fields");
    const { data, error } = await supabase.rpc("clone_and_edit_chat", {
        original_chat_id: originalChatId,
        edited_index: editedIndex,
        new_message: newMessage,
        new_message_role: newMessageRole,
    });

    if (error) {
        console.error("Error cloning and editing chat:", error);
        throw error;
    } else {
        return data as unknown as ChatType;
    }
}

/*
 async function updateAllMessages(chatId: string, messages: MessageType[]): Promise<void> {
 if (!chatId) throw new Error('Missing ChatId');
 const { data, error } = await supabase.rpc('update_all_messages', { chat_id: chatId, messages: messages });
 if (error) {
 console.error('Error adding messages:', error);
 } else {
 console.log('Messages added:', data);
 return data as any;
 }
 }

 // New function to add new messages
 async function addNewMessages(chatId: string, newMessages: MessageType[]): Promise<void> {
 if (!chatId) throw new Error('Missing ChatId');
 const { data, error } = await supabase.rpc('add_new_messages', { chat_id: chatId, messages: newMessages });
 if (error) {
 console.error('Error adding new messages:', error);
 } else {
 console.log('Messages added:', data);
 return data as any;
 }
 }

 // New function to update changed messages
 async function updateChangedMessages(chatId: string, changedMessages: MessageType[]): Promise<void> {
 if (!chatId) throw new Error('Missing ChatId');
 const { data, error } = await supabase.rpc('update_changed_messages', { chat_id: chatId, messages: changedMessages });
 if (error) {
 console.error('Error updating changed messages:', error);
 } else {
 console.log('Changed messages updated:', data);
 }
 }

 // New function to delete messages
 async function deleteMessages(chatId: string, deletedMessageIds: string[]): Promise<void> {
 if (!chatId) throw new Error('Missing ChatId');
 const { data, error } = await supabase.rpc('delete_messages', { chat_id: chatId, message_ids: deletedMessageIds });
 if (error) {
 console.error('Error deleting messages:', error);
 } else {
 console.log('Messages deleted:', data);
 }
 }

 async function updateSomeMessages(chatId: string, updates: { newEntries: MessageType[], changedEntries: MessageType[], deletedEntries: string[] }): Promise<void> {
 const { newEntries, changedEntries, deletedEntries } = updates;

 if (newEntries.length > 0) {
 await addNewMessages(chatId, newEntries);
 }
 if (changedEntries.length > 0) {
 await updateChangedMessages(chatId, changedEntries);
 }
 if (deletedEntries.length > 0) {
 await deleteMessages(chatId, deletedEntries);
 }
 }
 */

export {
    fetchUserChats,
    fetchChatMessages,
    addSystemMessage,
    addUserMessage,
    addAssistantMessage,
    addCustomMessage,
    addMultipleCustomMessages,
    cloneChat,
    cloneAndEditChat,
    createChatStartEntry,
    editMessage,
    updateMessageText,
    updateLastAssistantText,
};
