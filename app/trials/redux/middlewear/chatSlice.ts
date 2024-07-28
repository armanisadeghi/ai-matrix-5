import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* 
const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [] as ChatType[],
        messages: {} as Record<string, MessageType[]>,
    },
    reducers: {
        addChat: (state, action: PayloadAction<ChatType>) => {
            state.chats.push(action.payload);
        },
        updateChat: (state, action: PayloadAction<ChatType>) => {
            const index = state.chats.findIndex(chat => chat.chatId === action.payload.chatId);
            if (index !== -1) {
                state.chats[index] = action.payload;
            }
        },
        addMessage: (state, action: PayloadAction<MessageType>) => {
            if (!state.messages[action.payload.chatId]) {
                state.messages[action.payload.chatId] = [];
            }
            state.messages[action.payload.chatId].push(action.payload);
        },
        // ... other reducers
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserChats.fulfilled, (state, action) => {
            state.chats = action.payload;
        })
        .addCase(fetchChatMessages.fulfilled, (state, action) => {
            state.messages[action.payload.chatId] = action.payload.messages;
        });
    },
}); */
