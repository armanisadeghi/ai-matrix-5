import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { activeUserAtom } from '@/state/userAtoms';
import { Button, TextInput } from "@mantine/core";

interface Message {
    message: string;
}

const WebSocketComponent: React.FC = () => {
    const [requests, setRequests] = useState<Message[]>([]);
    const [responses, setResponses] = useState<Message[]>([]);
    const [userResponse, setUserResponse] = useState<string>('');
    const [backendRequest, setBackendRequest] = useState<string>('');

    const user = useRecoilValue(activeUserAtom);

    const socket = new WebSocket('ws://localhost:8000/ws/app_name:operation/');

    useEffect(() => {
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event: MessageEvent<string>) => {
            const message: Message = JSON.parse(event.data);
            setResponses((prevResponses) => [...prevResponses, message]);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error: Event) => {
            console.error('WebSocket error observed:', error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendRequest = () => {
        const request = {
            channel: 'webSocket',
            metadata: {
                event: 'backendRequest',
                task: 'processRequest',
                index: requests.length.toString(),
                taskSpecs: {
                    class: 'RequestClass',
                    module: 'example_app',
                    function: 'example_task'
                },
                requestId: `${Date.now()}-${requests.length}`,
                timestamp: new Date().toISOString(),
                source: 'frontend',
                user: {
                    id: user?.id,
                    token: user?.token
                }
            },
            data: { message: backendRequest },
            settings: {}
        };
        socket.send(JSON.stringify(request));
        setRequests((prevRequests) => [...prevRequests, { message: backendRequest }]);
        setBackendRequest('');
    };

    const sendUserResponse = () => {
        const response = {
            channel: 'webSocket',
            metadata: {
                event: 'userResponse',
                task: 'processResponse',
                index: responses.length.toString(),
                taskSpecs: {
                    class: 'ResponseClass',
                    module: 'example_app',
                    function: 'example_task'
                },
                requestId: `${Date.now()}-${responses.length}`,
                timestamp: new Date().toISOString(),
                source: 'frontend',
                user: {
                    id: user.id,
                    token: user.token
                }
            },
            data: { message: userResponse },
            settings: {}
        };
        socket.send(JSON.stringify(response));
        setUserResponse('');
    };

    return (
        <div>
            <h1>WebSocket Communication</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: '10px' }}>
                    <h2>Send Requests</h2>
                    <TextInput
                        type="text"
                        value={backendRequest}
                        onChange={(e) => setBackendRequest(e.target.value)}
                    />
                    <Button onClick={sendRequest}>Send Backend Request</Button>
                    <ul>
                        {requests.map((req, index) => (
                            <li key={index}>{req.message}</li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1, padding: '10px' }}>
                    <h2>Send User Response</h2>
                    <TextInput
                        type="text"
                        value={userResponse}
                        onChange={(e) => setUserResponse(e.target.value)}
                    />
                    <Button onClick={sendUserResponse}>Send User Response</Button>
                    <ul>
                        {responses.map((res, index) => (
                            <li key={index}>{res.message}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WebSocketComponent;
