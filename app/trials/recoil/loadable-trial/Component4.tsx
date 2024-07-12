'use client';

import React, { useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { activeChatIdAtom } from '@/state/aiAtoms/old/chatAtoms';
import { chatSummariesSelector } from '@/app/trials/core-chat-trial/hooks/old/useChatAtomsDb';
import { SimpleGrid, Button, Modal } from '@mantine/core';

const ID_INDEX = 0;
const NAME_INDEX = 1;

const ChatModal: React.FC<{ showPopup: boolean, onClose: () => void, chat: any }> = ({ showPopup, onClose, chat }) => (
    <Modal opened={showPopup} onClose={onClose} title="Details">
        {Object.keys(chat).map((key, index) => (
            <p key={index}><strong>{key}:</strong> {chat[key]}</p>
        ))}
    </Modal>
);

// ChatItem Component
const ChatItem: React.FC<{ chat: any, handleButtonClick: (chat: any) => void }> = ({ chat, handleButtonClick }) => (
    <>
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
            <div>
                <h2>{chat[Object.keys(chat)[NAME_INDEX]]}</h2>
                <ul>
                    {Object.keys(chat).map((key, index) => {
                        if (index !== NAME_INDEX && index !== ID_INDEX) {
                            return <li key={index}>{`${key}: ${chat[key]}`}</li>;
                        }
                        return null;
                    })}
                </ul>
            </div>
            <Button onClick={() => handleButtonClick(chat)}>{chat[Object.keys(chat)[NAME_INDEX]]}</Button>
        </SimpleGrid>
    </>
);

function ChatSummaries() {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedChat, setSelectedChat] = useState<any | null>(null);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);

    const handleButtonClick = (chat: any) => {
        const chatId = chat[Object.keys(chat)[ID_INDEX]];
        if (chatId) {
            setSelectedChat(chat);
            setActiveChatId(chatId);
            setShowPopup(true);
        } else {
            console.error('Error: id is undefined');
        }
    };

    switch (chatSummariesLoadable.state) {
        case 'hasValue':
            return (
                <>
                    {chatSummariesLoadable.contents.map((chat: any, index: number) => (
                        <ChatItem key={index} chat={chat} handleButtonClick={handleButtonClick} />
                    ))}
                    {showPopup && selectedChat && (
                        <ChatModal showPopup={showPopup} onClose={() => setShowPopup(false)} chat={selectedChat} />
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
