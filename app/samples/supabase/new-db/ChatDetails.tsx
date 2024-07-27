import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ChatMessage from './ChatMessage';

const ChatDetails = () => {
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const setChatMessages = useSetRecoilState(chatMessagesAtomFamily(activeChatId ?? ''));
    const chatMessages = useRecoilValue(selectedChatMessagesSelector(activeChatId ?? '')) ?? [];
    const [chatDetails, setChatDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (activeChatId) {
            fetchChatDetails(activeChatId);
        }
    }, [activeChatId]);

    const fetchChatDetails = async (chatId: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/db?chatId=${chatId}`);
            const data = await response.json();
            setChatDetails(data);
            setChatMessages(data.messagesArray);
        } catch (err) {
            setError('Failed to fetch chat details');
        }
        setLoading(false);
    };

    if (loading) {
        return <p>Loading chat details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!chatDetails) {
        return <p>Select a chat to view details</p>;
    }

    return (
        <div>
            <h2>{chatDetails.chatTitle}</h2>
            <p><strong>Chat ID:</strong> {chatDetails.chatId}</p>
            <p><strong>User ID:</strong> {chatDetails.userId}</p>
            <p><strong>Created At:</strong> {chatDetails.createdAt}</p>
            <p><strong>Last Edited:</strong> {chatDetails.lastEdited}</p>
            <p><strong>Metadata:</strong> {JSON.stringify(chatDetails.metadata)}</p>
            <div>
                {chatMessages.map((message, index) => (
                    <ChatMessage key={index} index={index} role={message.role} text={message.text} />
                ))}
            </div>
        </div>
    );
};

export default ChatDetails;
