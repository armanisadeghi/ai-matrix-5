// /types/chat.ts
import { ReactNode } from 'react';
import {
    AIModelSettings,
    BrokerData,
    ControlSettings,
    RequestSettings,
    ResponseData,
    VariablesData,
    ChatSettings
} from "./settings";


export type ChatId = string;
export type CreatedAt= string;
export type UserId= string;
export type ChatTitle= string;
export type LastEdited= string;
export type Metadata = Record<string, any>;

export type Role = string;
export type MessageIndex= number;
export type MessageText= string;

export interface MatrixMessage {
    index: MessageIndex;
    role: Role;
    text: MessageText;
}

export interface Chat {
    chatId: ChatId;
    createdAt: CreatedAt;
    userId: UserId;
    chatTitle: ChatTitle;
    messagesArray: MatrixMessage[];
    lastEdited: LastEdited;
    metadata: Metadata;
}

export type ChatSummary = {
    chatId: string;
    chatTitle: string;
};

export type ChatMessages = MatrixMessage[];


export interface OaiMessage {
    role: Role;
    content: MessageText;
}




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




