import React, { useEffect } from 'react';
import { Space, Stack, Text, Loader } from '@mantine/core';
import { useHistory } from '@/context/AiContext/HistoryContext';

const ChatSidebar: React.FC = () => {
    console.log('DEBUG: components/sidebar/ChatSidebar.tsx');
    const { chatHistory, setActiveChat, isLoading } = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Checking for updates...');
            console.log('Current chatHistory:', chatHistory);
            console.log('Current isLoading:', isLoading);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [chatHistory, isLoading]);

    useEffect(() => {
        console.log('ChatSidebar re-rendered with chatHistory:', chatHistory);
        console.log('Is loading:', isLoading);
    }, [chatHistory, isLoading]);

    const handleChatClick = (chatId: string) => {
        console.log(`Chat ${chatId} clicked`);
        setActiveChat(chatId);
    };

    if (isLoading) {
        return <div><Loader /> Checking for updates...</div>;
    }

    if (Object.keys(chatHistory).length === 0 && !isLoading) {
        return <div>No chat history available. Waiting for updates...</div>;
    }

    return (
        <>
            <Text size="xs">Recent Chats</Text>
            <Space h={10} />
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="flex-start"
                gap="xs"
            >
                {Object.keys(chatHistory).map(chatId => (
                    <div key={chatId} onClick={() => handleChatClick(chatId)}>
                        <div className="chat-history">
                            <h3>Chat History for {chatId}</h3>
                            {chatHistory[chatId].map((entry, index) => (
                                <div key={index} className="chat-message">
                                    <p><strong>Role:</strong> {entry.role}</p>
                                    <p><strong>Message:</strong> {entry.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Stack>
        </>
    );
};

export default ChatSidebar;
