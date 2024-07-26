import React, { useEffect, useRef, useState } from 'react';

const WebsocketTest: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const connect = () => {
            ws.current = new WebSocket('ws://localhost:8000');

            ws.current.onopen = () => {
                console.log('Connected to WebSocket');
                setIsConnected(true);
                setMessages(prev => [...prev, 'Connected to server']);
            };

            ws.current.onmessage = (event) => {
                console.log('Received:', event.data);
                setMessages(prev => [...prev, `Received: ${event.data}`]);
            };

            ws.current.onclose = () => {
                console.log('Disconnected from WebSocket');
                setIsConnected(false);
                setMessages(prev => [...prev, 'Disconnected from server']);
                setTimeout(connect, 5000);
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(inputMessage);
            setMessages(prev => [...prev, `Sent: ${inputMessage}`]);
            setInputMessage('');
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return (
        <div>
            <h1>WebSocket Test</h1>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Enter message"
                />
                <button onClick={sendMessage} disabled={!isConnected}>Send Message</button>
            </div>
            <div>
                <h2>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</h2>
                <h2>Messages:</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default WebsocketTest;
