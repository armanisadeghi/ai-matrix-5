import { ChatType, MessageType } from "@/types";
import supabase from "@/utils/supabase/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ChatState {
    isNewChat: boolean | null;
    activeChatId: string | undefined;
    hasSubmittedMessage: boolean;
    systemMessage: string;
    userTextInput: string;
    focusInput: boolean;
    submitChatId: string | undefined;
    activeChatMessagesArray: MessageType[];
    hookId: string;
    hookIndex: number;
    fetchStatus: "idle" | "fetching" | "success" | "error" | "dbError";
    fullAssistantText: string;
    remainingCount: number;
    chatTransition: "idle" | "new" | "transition";
    streamStatus: "idle" | "waiting" | "streaming" | "success" | "error";
    assistantTextStream: string;
    chatSummaries: ChatType[];
    chatMessages: { [chatId: string]: MessageType[] };
}

const initialState: ChatState | any = {
    isNewChat: null,
    activeChatId: undefined,
    hasSubmittedMessage: false,
    systemMessage: "You are a helpful assistant",
    userTextInput: "",
    focusInput: false,
    submitChatId: undefined,
    activeChatMessagesArray: [],
    hookId: "OpenAiStream",
    hookIndex: 0,
    fetchStatus: "idle",
    fullAssistantText: "",
    remainingCount: 1,
    chatTransition: "idle",
    streamStatus: "idle",
    assistantTextStream: "",
    chatSummaries: [],
    chatMessages: {},
};

export const fetchChatSummaries = createAsyncThunk("chat/fetchChatSummaries", async (matrixId: string) => {
    const { data, error } = await supabase.rpc("fetch_user_chats", { user_matrix_id: matrixId });
    if (error) {
        throw error;
    }
    return data;
});

export const fetchChatMessages = createAsyncThunk("chat/fetchChatMessages", async (chatId: string) => {
    const { data, error } = await supabase.rpc("fetch_messages", { matrix_chat_id: chatId });
    if (error) {
        throw error;
    }
    return { chatId, messages: data as MessageType[] };
});

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setIsNewChat: (state, action: PayloadAction<boolean | null>) => {
            state.isNewChat = action.payload;
        },
        setActiveChatId: (state, action: PayloadAction<string | undefined>) => {
            state.activeChatId = action.payload;
        },
        setHasSubmittedMessage: (state, action: PayloadAction<boolean>) => {
            state.hasSubmittedMessage = action.payload;
        },
        setSystemMessage: (state, action: PayloadAction<string>) => {
            state.systemMessage = action.payload;
        },
        setUserTextInput: (state, action: PayloadAction<string>) => {
            state.userTextInput = action.payload;
        },
        setFocusInput: (state, action: PayloadAction<boolean>) => {
            state.focusInput = action.payload;
        },
        setSubmitChatId: (state, action: PayloadAction<string | undefined>) => {
            state.submitChatId = action.payload;
        },
        setActiveChatMessagesArray: (state, action: PayloadAction<MessageType[]>) => {
            state.activeChatMessagesArray = action.payload;
        },
        setHookId: (state, action: PayloadAction<string>) => {
            state.hookId = action.payload;
        },
        setHookIndex: (state, action: PayloadAction<number>) => {
            state.hookIndex = action.payload;
        },
        setFetchStatus: (state, action: PayloadAction<"idle" | "fetching" | "success" | "error" | "dbError">) => {
            state.fetchStatus = action.payload;
        },
        setFullAssistantText: (state, action: PayloadAction<string>) => {
            state.fullAssistantText = action.payload;
        },
        setRemainingCount: (state, action: PayloadAction<number>) => {
            state.remainingCount = action.payload;
        },
        setChatTransition: (state, action: PayloadAction<"idle" | "new" | "transition">) => {
            state.chatTransition = action.payload;
        },
        setStreamStatus: (state, action: PayloadAction<"idle" | "waiting" | "streaming" | "success" | "error">) => {
            state.streamStatus = action.payload;
        },
        setAssistantTextStream: (state, action: PayloadAction<string>) => {
            state.assistantTextStream = action.payload;
        },
        addUserMessage: (state, action: PayloadAction<{ chatId: string; message: MessageType }>) => {
            const { chatId, message } = action.payload;
            if (!state.chatMessages[chatId]) {
                state.chatMessages[chatId] = [];
            }
            state.chatMessages[chatId].push(message);
        },
        addAssistantMessage: (state, action: PayloadAction<{ chatId: string; message: MessageType }>) => {
            const { chatId, message } = action.payload;
            if (!state.chatMessages[chatId]) {
                state.chatMessages[chatId] = [];
            }
            state.chatMessages[chatId].push(message);
        },
        updateAssistantMessage: (state, action: PayloadAction<{ chatId: string; messageId: string; text: string }>) => {
            const { chatId, messageId, text } = action.payload;
            const message = state.chatMessages[chatId]?.find((m) => m.id === messageId);
            if (message) {
                message.text = text;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatSummaries.fulfilled, (state, action) => {
                state.chatSummaries = action.payload;
            })
            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                state.chatMessages[action.payload.chatId] = action.payload.messages;
            });
    },
});

export const {
    setIsNewChat,
    setActiveChatId,
    setHasSubmittedMessage,
    setSystemMessage,
    setUserTextInput,
    setFocusInput,
    setSubmitChatId,
    setActiveChatMessagesArray,
    setHookId,
    setHookIndex,
    setFetchStatus,
    setFullAssistantText,
    setRemainingCount,
    setChatTransition,
    setStreamStatus,
    setAssistantTextStream,
    addUserMessage,
    addAssistantMessage,
    updateAssistantMessage,
} = chatSlice.actions;

// Selectors v2:
export const selectActiveChatWithMessages = (state: RootState) => {
    const activeChatId = state.chat.activeChatId;
    if (!activeChatId) return null;

    const chat = state.chat.chatSummaries.find((chat) => chat.chatId === activeChatId);
    if (!chat) return null;

    return {
        ...chat,
        messages: state.chat.chatMessages[activeChatId] || [],
    };
};

export const selectChatWithMessages = (chatId: string) => (state: RootState) => {
    const chat = state.chat.chatSummaries.find((chat) => chat.chatId === chatId);
    if (!chat) return null;

    return {
        ...chat,
        messages: state.chat.chatMessages[chatId] || [],
    };
};

// Selectors
export const selectIsNewChat = (state: RootState) => state.chat.isNewChat;
export const selectActiveChatId = (state: RootState) => state.chat.activeChatId;
export const selectHasSubmittedMessage = (state: RootState) => state.chat.hasSubmittedMessage;
export const selectSystemMessage = (state: RootState) => state.chat.systemMessage;
export const selectUserTextInput = (state: RootState) => state.chat.userTextInput;
export const selectFocusInput = (state: RootState) => state.chat.focusInput;
export const selectSubmitChatId = (state: RootState) => state.chat.submitChatId;
export const selectActiveChatMessagesArray = (state: RootState) => state.chat.activeChatMessagesArray;
export const selectHookId = (state: RootState) => state.chat.hookId;
export const selectHookIndex = (state: RootState) => state.chat.hookIndex;
export const selectFetchStatus = (state: RootState) => state.chat.fetchStatus;
export const selectFullAssistantText = (state: RootState) => state.chat.fullAssistantText;
export const selectRemainingCount = (state: RootState) => state.chat.remainingCount;
export const selectChatTransition = (state: RootState) => state.chat.chatTransition;
export const selectStreamStatus = (state: RootState) => state.chat.streamStatus;
export const selectAssistantTextStream = (state: RootState) => state.chat.assistantTextStream;
export const selectChatSummaries = (state: RootState) => state.chat.chatSummaries;
export const selectChatMessages = (state: RootState, chatId: string) => state.chat.chatMessages[chatId] || [];

export default chatSlice.reducer;
