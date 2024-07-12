import React, { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { useChatMessages } from '@/app/trials/core-chat-trial/hooks/useChatMessages';
import useStartNewChat from '@/app/trials/core-chat-trial/hooks/useStartNewChat';

export default function Page({ params }: { params: { module: string } }) {
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const chatId = decodeURIComponent(params.module);

    //const activeChatMessages = useChatMessages();
    const startNewChat = useStartNewChat();

    const handleNewChat = async () => {
        await startNewChat();
    };

    useEffect(() => {
        if (chatId === 'new--------------------------------------------------------chat') {
            handleNewChat();
        } else if (!chatId) {
            throw new Error('No chat ID provided');
        } else {
            setActiveChatId(chatId);
        }
    }, [chatId, handleNewChat]);

    // Placeholder for children or specific component logic
    return (
        <Container>
            {/* Render messages or another child component here */}
        </Container>
    );
}
