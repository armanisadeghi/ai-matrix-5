/*
// /types/chat.ts
import { MessageType } from '@/types/chat.types';
import { Json } from '@/types/database.types';
import { string } from '@recoiljs/refine';
import { ReactNode } from 'react';
import { AIModelSettings, BrokerData, ControlSettings, RequestSettings, ResponseData, VariablesData, ChatSettings } from "types/settings.types";

export type ChatId = string;
export type CreatedAt= string;
export type UserId= string;
export type ChatTitle= string;
export type LastEdited= string;
type Metadata = Record<string, any>;

export type MessageIndex= number;
export type Role = string;
export type MessageText= string;





// Existing Chat type, unchanged, since it's already defined with optional properties
export interface Chat {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: Json;
}

export interface ChatWithJsons {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: Json;
    messages: Json
}

export interface ChatWithMessages {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: Json;
    messages: Message[];
}


// Updating Message type to fit the new requirements and existing usage patterns
export interface Message {
    chatId?: string | null;
    createdAt?: string;
    id?: string;
    index: number | null;
    text: string | null;
    role: string | null;
}

export type MessagesArray = Message[];

// New type extending Chat to include messages property
export interface ChatWithJsonMessages extends Chat {
    chatId: string;
    messages: Json;
}

// Keeping the FullChatWithMessages interface
export interface FullChatWithMessages {
    chatId: string;
    messages: MessagesArray;
}

// Creating a new simplified message type specifically for the streamlined data you described
export interface SimpleMessage {
    index: number;
    text: string;
    role: string;
}


export interface NewChatEntry {
    userId: string,
    systemMessage: string,
    userMessage: string
}


export interface ChatMessagesResponse {
    chatId: string;
    messages: Message[];
}




// TypeScript type for chat_messages_response_type
export type ChatMessagesResponseType = {
    chatId: string;
    messages: MessageType[];
};





export interface MatrixMessage {
    index: MessageIndex;
    role: Role;
    text: MessageText;
}

export type ChatMessagesArray = MatrixMessage[];

/!*

export interface Chat {
    chatId: ChatId;
    createdAt: CreatedAt;
    userId: UserId;
    chatTitle: ChatTitle;
    messagesArray: MatrixMessage[];
    lastEdited: LastEdited;
    metadata: Metadata;
}
*!/

export type ChatSummary = {
    chatId: string;
    chatTitle: string;
};




export type ChatMessages = MatrixMessage[];


export interface OaiMessage {
    role: Role;
    content: MessageText;
    tool_call_id?: string
    name?: string;
}

export type OaiMessagesArray = OaiMessage[];



export interface MessageEntry {
    role: string;
    text: string;
}

export interface ChatData {
    chatId: string;
    chatTitle: string;
}




export interface OpenaiMessageEntry {
    role: Role;
    content: string;
}

export interface ChatMessage {
    chatId: string | null;
    user: string;
    role: string;
    message: string;
    timestamp: Date;
}






export interface ChatRequest {
    eventName: string;
    userToken: string;
    task: string;
    requestMetadata: RequestMetadata;
    recipeId: string;
    promptData: PromptData[];
    formResponses: FormResponse[];
    customInputs: CustomInput[];
    settings: RequestSettings;
    variablesData: VariablesData;
    responseData: ResponseData;
    brokerData: BrokerData;
    modelData: AIModelSettings;
    controls: ControlSettings;
    activeChatId: string | null;
}

// Metadata Metadata Context
export interface RequestMetadata {
    requestId: string;
    requestIndex: number;
    uid: string;
    requestTimestamp: string;
    requestType: string;
    requestSource: string;
    requestChannel: string;
}

export interface RequestMetadataProviderProps {
    children: React.ReactNode;
}

export interface RequestMetadataContextProps {
    requestMetadata: RequestMetadata;
    updateRequestMetadata: (metadata: Partial<RequestMetadata>) => void;
}

export interface PromptData {
    role: string;
    message: string;
    formResponses: FormResponse[];
    customInputs: CustomInput[];
}

// Custom Input
export interface CustomInput {
    name: string;
    value: string;
}

export interface FormResponse {
    question: string;
    response: string;
}

// Form
export interface FormData {
    promptData: PromptData[];
    formResponses: FormResponse[];
    customInputs: CustomInput[];
}

export interface FormContextProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export interface FormProviderProps {
    children: ReactNode;
}

// Chat Context Type
export interface ChatContextProps {
    chatData: ChatRequest;
    updateChatData: (newData: Partial<ChatRequest>) => void;
}

export interface ChatProviderProps {
    children: ReactNode;
}



// Chat History --------------------------------------------------------------
export interface HistoryContextProps {
    chatHistory: { [index: string]: ChatHistoryChat[] };
    updateChatHistory: (newHistory: ChatHistoryChat[], chatId: string) => void;
    activeChat: string | null;
    setActiveChat: (chatId: string | null) => void;
    isLoading: boolean;
}

export interface HistoryProviderProps {
    children: ReactNode;
}

export interface ChatHistoryChat {
    role: string;
    content: string; // Ensure this matches the actual data structure
}

// End Chat History --------------------------------------------------------------




// Chat Context Type
export interface ChatContextType {
    messages: ChatMessage[];
    responses: string[];
    settings: ChatSettings;
    history: ChatHistoryChat[];
    sendMessage: (message: string) => void;
    updateSettings: (key: string, value: any) => void;
}

// Global Chat
export interface GlobalChatData {
    eventName: string;
    userToken: string;
    task: string;
    recipeId: string;
}

export interface GlobalChatContextProps {
    globalChatData: GlobalChatData;
    updateGlobalChatData: (data: Partial<GlobalChatData>) => void;
}

export interface GlobalChatProviderProps {
    children: ReactNode;
}

export interface ChatProviderProps {
    children: React.ReactNode;
}

// Question and Response Data
export type Question = {
    question: string;
    type: string;
    answer: string | number | string[];
    options?: string[];
    range?: {
        min?: number;
        max?: number;
        value?: number;
        label?: string;
    };
    step?: number;
};

export type RespondData = {
    questions: Question[];
};




*/
