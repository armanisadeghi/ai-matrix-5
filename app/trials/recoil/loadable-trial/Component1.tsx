import { chatSummariesSelector } from '@/app/trials/core-chat-trial/hooks/old/useChatAtomsDb';
import { isNewChatAtom, useActiveChat } from '@/state/aiAtoms/aiChatAtoms';
import { activeChatIdAtom } from '@/state/aiAtoms/old/chatAtoms';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Chat } from '@/types/chat.types'; // Make sure the correct path to Chat type

// A simple ChatItem component to render individual chat summaries
const ChatItem: React.FC<{ chat: Chat }> = ({ chat }) => (
    <div>
        <h2>{chat.chatTitle}</h2>
        <p>{chat.createdAt}</p>
        <p>{chat.lastEdited}</p>
    </div>
);

function ChatSummaries() {
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const { setActiveChat } = useActiveChat();
    const isNewChat= useRecoilValue(isNewChatAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
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
                    {chatSummariesLoadable.contents.map((chat: Chat) => (
                        <ChatItem key={chat.chatId} chat={chat} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatSummaries;
