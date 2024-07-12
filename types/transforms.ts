// types/transform.ts

import { Database } from '@/types/database.types';
import { Chat, Message, ChatWithMessages } from './chat.types';


export const transformChatToFrontend = (dbChat: Database['public']['Tables']['chats']['Row']): Chat => {
    return {
        chatId: dbChat.chat_id,
        chatTitle: dbChat.chat_title,
        createdAt: dbChat.created_at,
        lastEdited: dbChat.last_edited,
        matrixId: dbChat.matrix_id,
        metadata: dbChat.metadata,
    };
};

export const transformMessageToFrontend = (dbMessage: Database['public']['Tables']['messages']['Row']): Message => {
    return {
        chatId: dbMessage.chat_id,
        createdAt: dbMessage.created_at,
        id: dbMessage.id,
        index: dbMessage.index,
        text: dbMessage.text,
        role: dbMessage.role,
    };
};

export const transformChatMessageViewToFrontend = (viewData: any[]): ChatWithMessages => {
  if (viewData.length === 0) throw new Error("Empty view data");

    const chat = {
        chatId: viewData[0].chat_id,
        chatTitle: viewData[0].chat_title,
        createdAt: viewData[0].chat_created_at,
        lastEdited: viewData[0].last_edited,
        matrixId: viewData[0].matrix_id,
        metadata: viewData[0].metadata,
    };

    const messages = viewData.map((message: any) => ({
        chatId: message.chat_id,
        createdAt: message.message_created_at,
        id: message.message_id,
        index: message.index,
        text: message.text,
        role: message.role,
    }));

    return {...chat, messages};
};

export const transformChatToDb = (frontendChat: Chat): Database['public']['Tables']['chats']['Row'] => {
    return {
        chat_id: frontendChat.chatId ?? '',
        chat_title: frontendChat.chatTitle ?? '',
        created_at: frontendChat.createdAt ?? '',
        last_edited: frontendChat.lastEdited ?? '',
        matrix_id: frontendChat.matrixId ?? '',
        metadata: frontendChat.metadata ?? {},
    };
};

