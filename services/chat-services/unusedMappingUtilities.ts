// Don't really need these anymore, but save as examples:

import { ChatType, MessageType } from '@/types';


export function mapMessages(messages: any[]): MessageType[] {
    return Array.isArray(messages)
        ? messages.map((msg: any): MessageType => ({
            chatId: msg.chatId,
            createdAt: msg.createdAt,
            id: msg.id,
            index: msg.index,
            text: msg.text,
            role: msg.role
        }))
        : [];
}

export function createChat(newData: any): ChatType {
    return {
        chatId: newData.chatId,
        chatTitle: newData.chatTitle,
        createdAt: newData.createdAt,
        lastEdited: newData.lastEdited,
        matrixId: newData.matrixId,
        metadata: newData.metadata,
        messages: mapMessages(newData.messages)
    };
}

