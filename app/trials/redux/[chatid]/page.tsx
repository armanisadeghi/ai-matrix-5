// app/chat/[chatId]/page.tsx
'use client';

import { uuidv4 } from 'lib0/random';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import {
    setActiveChatId,
    fetchChatMessages,
    selectChatWithMessages,
    addUserMessage,
    setUserTextInput,
    setHasSubmittedMessage,
    setIsNewChat,
} from '@/chatSlice';

export default function ChatPage({ params }: { params: { chatId: string } }) {
    const dispatch = useAppDispatch();
    const chat = useAppSelector(selectChatWithMessages(params.chatId));
    const userInput = useAppSelector(state => state.chat.userTextInput);

    useEffect(() => {
        dispatch(setActiveChatId(params.chatId));
        dispatch(fetchChatMessages(params.chatId));
    }, [dispatch, params.chatId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const newMessage = {
            id: uuidv4(),
            chatId: params.chatId,
            createdAt: new Date().toISOString(),
            role: 'user',
            text: userInput,
            index: chat?.messages.length || 0,
        };

        dispatch(addUserMessage({ chatId: params.chatId, message: newMessage }));
        dispatch(setUserTextInput(''));
        dispatch(setHasSubmittedMessage(true));
        dispatch(setIsNewChat(false));
    };

    if (!chat) return <div>Loading...</div>;

    return (
        <div>
            {/* Render chat messages */}
            <form onSubmit={handleSubmit}>
                <input
                    value={userInput}
                    onChange={(e) => dispatch(setUserTextInput(e.target.value))}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
