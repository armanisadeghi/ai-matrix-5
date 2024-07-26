import React, { useEffect, useState } from 'react';
import { Container } from '@mantine/core';

export default function Page({ params }: { params: { module: string } }) {
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const chatId = decodeURIComponent(params.module);


    const handleNewChat = async () => {
/*
        await startNewChat();
*/
    };

    useEffect(() => {
        if (chatId === 'new-chat') {
            handleNewChat();
        } else if (!chatId) {
            throw new Error('No chat ID provided');
        } else {
            setActiveChatId(chatId);
        }
    }, [chatId, handleNewChat]);

    return (
        <Container>
            {/* Render messages or another child component here */}
        </Container>
    );
}
