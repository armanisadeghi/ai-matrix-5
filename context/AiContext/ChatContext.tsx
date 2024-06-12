/*
// chat-app/AiContext/ChatContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { ChatSettings } from "@/types/settings";
import { ChatContextProps, ChatProviderProps, ChatRequest } from "@/types";

// put this crap here to get it to build!

// chat-app/utils/chatDefaults.ts


export const aiPreferencesMainDefault = "direct_chat"
export const aiPreferencesSecondDefault = "one_ai_chat"
export const makeSmallTalkDefault = false
export const quickAnswerDefault = false
export const improveQuestionsDefault = false
export const submitOnEnterDefault = true


export const defaultChatSettings: ChatSettings = {
    aiPreferencesMain: aiPreferencesMainDefault,
    aiPreferencesSecond: aiPreferencesSecondDefault,
    makeSmallTalk: makeSmallTalkDefault,
    quickAnswer: quickAnswerDefault,
    improveQuestions: improveQuestionsDefault,
    submitOnEnter: submitOnEnterDefault
};


export const defaultRequestSettings: RequestSettings = {
    chatSettings: defaultChatSettings,
    variablesData: {},
    responseData: {},
    brokerData: {},
    aiModelSettings: {},
    controlSettings: {},
    pageSettings: {},
    userSettings: {},
    matrixSettings: {},
    clientSettings: {},
    agencySettings: {}
};

export const defaultChatRequest: ChatRequest = {
    eventName: "",
    userToken: "",
    task: "",
    requestMetadata: {
        requestId: "",
        requestIndex: 1,
        uid: "",
        requestTimestamp: "",
        requestType: "chat",
        requestSource: "chat_app_main",
        requestChannel: "chat"
    },
    recipeId: "",
    promptData: [],
    formResponses: [],
    customInputs: [],
    settings: defaultRequestSettings,
    variablesData: {},
    responseData: {},
    brokerData: {},
    modelData: {},
    controls: {},
    activeChatId: null
};



export const ChatContext = createContext<ChatContextProps>({
    chatData: defaultChatRequest,
    updateChatData: () => {},
});

export const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
    const [chatData, setChatData] = useState<ChatRequest>(defaultChatRequest);

    const updateChatData = (newData: Partial<ChatRequest>) => {
        setChatData(prev => ({...prev, ...newData}));
    };

    return (
        <ChatContext.Provider value={{
            chatData,
            updateChatData
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextProps => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
*/
