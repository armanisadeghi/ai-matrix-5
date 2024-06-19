// hooks/redis/useWebSocketText.ts
'use client'

import { RequestPayload, WebSocketResponse } from '@/types/requests'
import { useWebSocket } from './useWebSocket'

export const useWebSocketText = (
    initialRequest: RequestPayload
): [WebSocketResponse | null, (message: string) => void] => {
    const [response, sendRequest] = useWebSocket(initialRequest)

    const sendTextRequest = (message: string) => {
        const request: RequestPayload = {
            ...initialRequest,
            data: { message }
        }
        sendRequest(request)
    }

    return [response, sendTextRequest]
}
