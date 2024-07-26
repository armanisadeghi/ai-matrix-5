import React, { useState, useEffect, useCallback } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    const connectWebSocket = useCallback(() => {
        const ws = new WebSocket('ws://localhost:8000/ws');
        setSocket(ws);

        ws.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        connectWebSocket();
    }, [connectWebSocket]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">WebSocket Messages</h2>
            <ul className="list-disc pl-5">
                {messages.map((message, index) => (
                    <li key={index} className="mb-1">{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;
