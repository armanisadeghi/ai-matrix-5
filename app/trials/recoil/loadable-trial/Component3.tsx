'use client';

import React, { useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { activeChatIdAtom } from '@/state/aiAtoms/old/chatAtoms';
import { chatSummariesSelector } from '@/app/trials/core-chat-trial/hooks/old/useChatAtomsDb';
import { Chat } from '@/types/chat.types';
import { SimpleGrid, Button, Modal } from '@mantine/core';

// Define ChatItem outside of ChatSummaries
const ChatItem: React.FC<{ chat: Chat, handleButtonClick: (chat: Chat) => void }> = ({ chat, handleButtonClick }) => (
    <>
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
            <div>
                <h2>{chat.chatTitle}</h2>
                <ul>
                    {Object.keys(chat).map((key) => {
                        if (key !== 'chatTitle' && key !== 'chatId') {
                            return <li key={key}>{`${key}: ${chat[key as keyof Chat]}`}</li>;
                        }
                        return null;
                    })}
                </ul>
            </div>
            <Button onClick={() => handleButtonClick(chat)}>{chat.chatTitle}</Button>
        </SimpleGrid>
    </>
);

function ChatSummaries() {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);

    const handleButtonClick = (chat: Chat) => {
        if (chat.chatId) {
            setSelectedChat(chat);
            setActiveChatId(chat.chatId);
            setShowPopup(true);
        } else {
            console.error('Error: chatId is undefined');
        }
    };

    switch (chatSummariesLoadable.state) {
        case 'hasValue':
            return (
                <>
                    {chatSummariesLoadable.contents.map((chat: Chat) => (
                        <ChatItem key={chat.chatId} chat={chat} handleButtonClick={handleButtonClick} />
                    ))}
                    {showPopup && selectedChat && (
                        <Modal opened={showPopup} onClose={() => setShowPopup(false)} title="Chat Details">
                            <p><strong>Title:</strong> {selectedChat.chatTitle}</p>
                            <p><strong>ID:</strong> {selectedChat.chatId}</p>
                        </Modal>
                    )}
                </>
            );
        case 'loading':
            return <div>Loading...</div>;
        case 'hasError':
            throw chatSummariesLoadable.contents;
        default:
            return null;
    }
}

export default ChatSummaries;
