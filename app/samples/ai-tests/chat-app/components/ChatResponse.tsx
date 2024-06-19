// chat-app/nice-working/ChatResponse.tsx
'use client'

import React, { useEffect } from 'react'
import { useAiResponse } from '@/context/AiContext/AiResponseContext'
import { useDynamicSocketHandler } from '@/hooks/ai/dynamicSocketHandler'

const ChatResponse: React.FC = () => {
    const { triggerResponse, setRespondData } = useAiResponse()

    useEffect(() => {
        if (!triggerResponse) return

        const { handleDynamicElements } = useDynamicSocketHandler(
            (data) => {
                console.log('Received data:', data)
            },
            (streamBuffer) => {
                const response = JSON.parse(streamBuffer)
                if (response.form) {
                    setRespondData(response.form)
                }
            }
        )

        const initialize = async () => {
            const { close } = await handleDynamicElements()
            return close
        }

        const closeSocket = initialize()

        return () => {
            closeSocket.then((close) => close())
        }
    }, [triggerResponse, setRespondData]) // Depend on triggerResponse

    return (
        <div>
            <p>Listening for AI responses... (ChatResponse)</p>
        </div>
    )
}

export default ChatResponse
