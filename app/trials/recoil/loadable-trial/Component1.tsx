'use client';

import { useSetActiveChat } from '@/app/trials/recoil/local/hooks/useSetActiveChat';
import { activeChatIdAtom, chatSummariesAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { ChatType } from '@/types';
import React, { useState } from 'react';
import {  useRecoilValue, useRecoilValueLoadable } from 'recoil';

// A simple ChatItem component to render individual chat summaries
const ChatItem: React.FC<{ chat: ChatType }> = ({ chat }) => (
    <div>
        <h2>{chat.chatTitle}</h2>
        <p>{chat.createdAt}</p>
        <p>{chat.lastEdited}</p>
    </div>
);

function ChatSummaries() {
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const { setActiveChat } = useSetActiveChat();
    const isNewChat= useRecoilValue(isNewChatAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesAtom);
    const [newChatId, setNewChatId] = useState('');

    const handleSetActiveChatId = () => {
        setActiveChat(newChatId);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={newChatId}
                    onChange={(e) => setNewChatId(e.target.value)}
                    placeholder="Enter chat ID"
                />
                <button onClick={handleSetActiveChatId}>Set Active Chat ID</button>
            </div>
            {chatSummariesLoadable.state === 'loading' && <div>Loading...</div>}
            {chatSummariesLoadable.state === 'hasError' && <div>Error loading chats</div>}
            {chatSummariesLoadable.state === 'hasValue' && (
                <div>
                    {chatSummariesLoadable.contents.map((chat: ChatType) => (
                        <ChatItem key={chat.chatId} chat={chat} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatSummaries;
