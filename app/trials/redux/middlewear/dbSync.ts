import { ChatType, MessageType } from "@/types";
import supabase from "@/utils/supabase/client";
import { Middleware } from "@reduxjs/toolkit";

export const supabaseMiddleware: Middleware = (store) => (next) => (action: any) => {
    // Call the next dispatch method in the middleware chain.
    const result = next(action);

    // Switch based on the action type
    switch (action.type) {
        case "chat/addChat":
        case "chat/updateChat":
        case "chat/deleteChat":
            // Sync chat data with Supabase
            syncChatWithSupabase(action.payload);
            break;
        case "chat/addMessage":
        case "chat/updateMessage":
        case "chat/deleteMessage":
            // Sync message data with Supabase
            syncMessageWithSupabase(action.payload);
            break;
        // ... other cases
    }

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return result;
};

async function syncChatWithSupabase(chat: any) {
    // Use your Supabase stored procedures to sync the chat
    await supabase.rpc("update_chat", chat);
}

async function syncMessageWithSupabase(message: any) {
    // Use your Supabase stored procedures to sync the message
    await supabase.rpc("edit_message", message);
}
