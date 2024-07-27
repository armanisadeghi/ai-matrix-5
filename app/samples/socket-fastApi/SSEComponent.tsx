import React, { useState, useEffect } from 'react';

const SSEComponent = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8000/stream');

        eventSource.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">SSE Messages</h2>
            <ul className="list-disc pl-5">
                {messages.map((message, index) => (
                    <li key={index} className="mb-1">{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default SSEComponent;
