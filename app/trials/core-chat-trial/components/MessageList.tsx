'use client';

import { chatMessagesSelector, activeChatMessagesArrayAtom } from '@/state/aiAtoms/aiChatAtoms';
import { SimpleMessageType } from '@/types';
import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

const MessageList: React.FC = () => {
    const chatMessagesLoadable = useRecoilValueLoadable(chatMessagesSelector);
    const [activeMessageArray, setActiveMessageArray] = useRecoilState(activeChatMessagesArrayAtom);


    let content;
    if (chatMessagesLoadable.state === 'loading') {
        content = <div>Loading messages...</div>;
    } else if (chatMessagesLoadable.state === 'hasError') {
        content = <div>Error: {chatMessagesLoadable.contents.message}</div>;
    } else if (activeMessageArray && 'messages' in activeMessageArray && Array.isArray(activeMessageArray.messages)) {
        const messages = activeMessageArray.messages.filter((message: SimpleMessageType) =>
            message.role === 'user' || message.role === 'assistant');
        content = (
            <div>
                {messages.map((message: SimpleMessageType) => (
                    <div key={message.index}>{message.text}</div>
                ))}
            </div>
        );
    } else {
        content = <div>No messages found.</div>;
    }

    return content;
};

export default MessageList;
