import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeUserAtom } from "@/context/atoms/userAtoms";
import { chatMessagesAtomFamily, selectedChatIdAtom, selectedChatMessagesSelector} from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import ChatMessage from './ChatMessage';

const ChatDetails = () => {
    const selectedChatId = useRecoilValue(selectedChatIdAtom);
    const setChatMessages = useSetRecoilState(chatMessagesAtomFamily(selectedChatId ?? ''));
    const chatMessages = useRecoilValue(selectedChatMessagesSelector(selectedChatId ?? '')) ?? [];
    const [chatDetails, setChatDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedChatId) {
            fetchChatDetails(selectedChatId);
        }
    }, [selectedChatId]);

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
