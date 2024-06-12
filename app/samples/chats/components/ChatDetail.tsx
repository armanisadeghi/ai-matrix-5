import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { activeChatMessagesArrayAtom } from "@/state/aiAtoms/chatAtoms";
import { MatrixMessage } from "@/types";


interface ChatDetailProps {
    user_id: string;
    chat_id: string;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ user_id, chat_id }) => {
    const [messages, setMessages] = useRecoilState<MatrixMessage[]>(activeChatMessagesArrayAtom);
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
            const newMessage: MatrixMessage = {
                index: messages.length, // Calculate the next available index
                role: 'user',
                text: messageText,
                // Add other necessary fields here, if any
            };
            setMessages([...messages, newMessage]);
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
