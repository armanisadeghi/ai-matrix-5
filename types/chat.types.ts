// Importing Json type from the database types as previously defined
import { Json } from '@/types/database.types';


export type ChatId = string;
export type CreatedAt = string;
export type UserId = string;
export type ChatTitle = string;
export type LastEdited = string;
type Metadata = Record<string, any>;
export type MessageIndex = number;
export type Role = string;
export type MessageText = string;

// Array of messages in a chat
export type MessageType = {
    id: string;
    chatId: string;
    createdAt: string;
    index: number;
    text: string;
    role: string;
};

// The individual chat objects, which may or may not have their messages
export interface ChatType {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: Json;
    messages?: MessageType[];
    fetchedMessages?: boolean;
}

export interface ChatDetailsType extends ChatType {
    messages: MessageType[];
}



export type ChatSummaryType = {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: Json;
};

export type ActiveChatMessagesType = {
    chatId?: string;
    createdAt?: string;
    id?: string;
    index: number;
    text: string;
    role: string;
};

// The temporary messages we have for the system message and the user message, prior to our first call and prior to sending it to the database.
export type SimpleMessageType = {
    index: number;
    text: string;
    role: string;
};




export interface SimpleMessageEntry {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export type AiParamsType = {
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    stop?: string | string[];
}


export function isJson(obj: any): boolean {
    try {
        JSON.parse(JSON.stringify(obj));
        return true;
    } catch (e) {
        return false;
    }
}

export function isMessageType(obj: any): obj is MessageType {
    return obj &&
        typeof obj === 'object' &&
        typeof obj.chatId === 'string' &&
        typeof obj.createdAt === 'string' &&
        typeof obj.id === 'string' &&
        typeof obj.index === 'number' &&
        typeof obj.text === 'string' &&
        typeof obj.role === 'string';
}

// Extended type guard for ChatType
export function isChatType(obj: any): obj is ChatType {
    return obj &&
        typeof obj === 'object' &&
        typeof obj.chatId === 'string' &&
        typeof obj.chatTitle === 'string' &&
        typeof obj.createdAt === 'string' &&
        typeof obj.lastEdited === 'string' &&
        typeof obj.matrixId === 'string' &&
        (obj.metadata === undefined || isJson(obj.metadata)) &&
        (obj.messages === undefined || Array.isArray(obj.messages) && obj.messages.every(isMessageType)) &&
        (obj.fetchedMessages === undefined || typeof obj.fetchedMessages === 'boolean');
}

// Type guard for ChatDetailsType
export function isChatDetailsType(obj: any): obj is ChatDetailsType {
    return isChatType(obj) &&
        Array.isArray(obj.messages) &&
        obj.messages.every(isMessageType);
}

export function mapToChatType(data: any): ChatType {
    if (isChatType(data)) {
        return data;
    }
    throw new Error('Invalid chat data structure');
}
