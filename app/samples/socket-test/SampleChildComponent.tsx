'use client';

import addMessage from '@/app/samples/socket-test/addMessageUtil';
import { useSocket } from '@/app/samples/socket-test/SocketManager';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatMessagesAtomFamily } from '@/state/aiAtoms/aiChatAtoms';

interface SampleChildComponentProps {
    chatId: string;
}

const SampleChildComponent: React.FC<SampleChildComponentProps> = ({ chatId }) => {
    const { startSocketStream, stopSocketStream, taskStatus } = useSocket();
    const [messages, setMessages] = useRecoilState(chatMessagesAtomFamily(chatId));
    const [inputValue, setInputValue] = useState('');
    const [taskName, setTaskName] = useState('default_task');
    const [taskIndex, setTaskIndex] = useState(0);

    useEffect(() => {
        const cleanup = startSocketStream(chatId, taskName, taskIndex, messages);
        return cleanup;
    }, [chatId, taskName, taskIndex, messages, startSocketStream]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessages = addMessage(messages, chatId, inputValue, 'user');
        setMessages(newMessages);

        // Reset input value
        setInputValue('');
    };

    return (
        <div>
            <h2>Chat with AI</h2>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.role}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <div>
                <p>Task Status: {taskStatus}</p>
            </div>
        </div>
    );
};

export default SampleChildComponent;
