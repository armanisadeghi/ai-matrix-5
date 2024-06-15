// hooks/redis/useWebSocketData.ts
'use client';

import { RequestPayload, WebSocketResponse } from '@/types/requests';
import { useWebSocket } from './useWebSocket';

export const useWebSocketData = (initialRequest: RequestPayload): [WebSocketResponse | null, (data: Record<string, any>) => void] => {
    const [response, sendRequest] = useWebSocket(initialRequest);

    const sendDataRequest = (data: Record<string, any>) => {
        const request: RequestPayload = {
            ...initialRequest,
            data
        };
        sendRequest(request);
    };

    return [response, sendDataRequest];
};
