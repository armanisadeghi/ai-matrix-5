import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { activeChatMessagesArrayAtom } from "@/app/samples/ai-tests/shared/servicees/chatAtoms";

const ChatDetail = ({ user_id, chat_id }: { user_id: string; chat_id: string }) => {
    const [messages, setMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const [messageText, setMessageText] = useState<string>('');

    useEffect(() => {
        fetch(`/api/chats?user_id=${user_id}&chat_id=${chat_id}`)
            .then(res => res.json())
            .then(data => setMessages(data));
    }, [user_id, chat_id, setMessages]);

    const handleAddMessage = async () => {
        const response = await fetch(`/api/chats?user_id=${user_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, chat_id, role: 'user', text: messageText })
        });

        if (response.ok) {
            setMessages([...messages, { role: 'user', text: messageText }]);
            setMessageText('');
        } else {
            console.error('Failed to send message', await response.json());
        }
    };

    return (
        <div>
            <h1>Chat Details</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.role}:</strong> {msg.text}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
            />
            <button onClick={handleAddMessage}>Send</button>
        </div>
    );
};

export default ChatDetail;
