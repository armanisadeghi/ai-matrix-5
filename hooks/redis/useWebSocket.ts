// hooks43/redis/useWebSocket.ts
'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { activeUserAtom } from '@/state/userAtoms';
import { RequestPayload, WebSocketResponse } from '@/types/requests.types';

export const useWebSocket = (request: RequestPayload): [WebSocketResponse | null, (request: RequestPayload) => void] => {
    const activeUser = useRecoilValue(activeUserAtom);
    const [response, setResponse] = useState<WebSocketResponse | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        if (!request.channel?.startsWith('webSocket')) {
            setResponse({ data: null, error: 'Invalid channel type' });
            return;
        }

        const ws = new WebSocket(`ws://localhost:3000/api/redis/${request.channel === 'webSocketText' ? 'text' : 'data'}?channel=${request.metadata.requestId}`);
        setSocket(ws);

        ws.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            setResponse({ data });
        };

        ws.onerror = (error: Event) => {
            const errorEvent = error as ErrorEvent;
            setResponse({ data: null, error: errorEvent.message });
        };

        ws.onclose = () => {
            setSocket(null);
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [request.channel, request.metadata.requestId]);

    const sendRequest = (request: RequestPayload) => {
        if (socket) {
            const payload = {
                ...request,
                metadata: {
                    ...request.metadata,
                    user: activeUser
                }
            };
            socket.send(JSON.stringify(payload));
        }
    };

    return [response, sendRequest];
};
