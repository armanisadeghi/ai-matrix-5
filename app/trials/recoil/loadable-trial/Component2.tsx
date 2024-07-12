'use client';

import { chatSummariesSelector } from '@/app/trials/core-chat-trial/hooks/old/useChatAtomsDb';
import { activeChatIdAtom } from '@/state/aiAtoms/old/chatAtoms';
import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Chat } from '@/types/chat.types';



const ChatItem: React.FC<{ chat: Chat }> = ({ chat }) => {
    return (
        <div>
            <h2>{chat.chatTitle}</h2>
            <ul>
                {Object.keys(chat).map((key) => {
                    if (key !== 'chatTitle') {
                        const value = chat[key as keyof Chat];
                        return <li key={key}>{`${key}: ${value}`}</li>;
                    }
                    return null;
                })}
            </ul>
        </div>
    );
};

function ChatSummaries() {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
    switch (chatSummariesLoadable.state) {
        case 'hasValue':
            return (
                <div>
                    {chatSummariesLoadable.contents.map((chat: Chat) => (
                        <ChatItem key={chat.chatId} chat={chat} />
                    ))}
                </div>
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
