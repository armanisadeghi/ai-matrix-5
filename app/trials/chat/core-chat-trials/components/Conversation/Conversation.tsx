/*
import { activeChatMessagesArrayAtom, chatMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';
import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import AssistantMessage from './AssistantMessage';
import UserMessage from './UserMessage';

type ChatMessage = {
    index: number;
    text: string;
    role: 'user' | 'assistant' | 'system' | string;
};



const Conversation: React.FC<{}> = () => {
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);

    switch (chatMessagesLoadable.state) {
        case 'hasValue':
            const chatMessages = chatMessagesLoadable.text;
            return (
                <div>
                    {chatMessages.map((message) => {
                        switch (message.role) {
                            case 'user':
                                return <UserMessage key={message.index} text={message.text} />;
                            case 'assistant':
                                return <AssistantMessage key={message.index} text={message.text} />;
                            default:
                                return null; // Do not display messages with other roles
                        }
                    })}
                </div>
            );
        case 'loading':
            return <div>Loading...</div>;
        case 'hasError':
            throw chatMessagesLoadable.contents;
        default:
            return null;
    }
};

export default Conversation;
*/
