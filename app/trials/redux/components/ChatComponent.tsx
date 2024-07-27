/*
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { addMessage, fetchChatMessages } from '../store/chatSlice';

function ChatComponent({ chatId }) {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages[chatId] || []);

    useEffect(() => {
        dispatch(fetchChatMessages(chatId));
    }, [chatId, dispatch]);

    const handleSendMessage = (text) => {
        const newMessage = {
            id: v4(),
            chatId,
            createdAt: new Date().toISOString(),
            index: messages.length,
            text,
            role: 'user',
        };
        dispatch(addMessage(newMessage));
        // The middleware will automatically sync this with Supabase
    };

    // ... render messages
}
*/
