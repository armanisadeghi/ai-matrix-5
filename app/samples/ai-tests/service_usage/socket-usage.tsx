import React, { useState } from 'react'
import { useDynamicSocketHandler } from '@/hooks/ai/dynamicSocketHandler'

const ChatComponent = () => {
    const [streamedData, setStreamedData] = useState<string>('')

    const handleRealTime = (data: string) => {
        setStreamedData((prevData) => prevData + data)
    }

    const handleStreamEnd = (streamBuffer: string) => {
        console.log('Stream ended with buffer:', streamBuffer)
    }

    const { handleDynamicElements } = useDynamicSocketHandler(handleRealTime, handleStreamEnd)

    const handleClick = async () => {
        await handleDynamicElements()
    }

    return (
        <div>
            <button onClick={handleClick}>Start Chat</button>
            <div>
                <h3>Streamed Data:</h3>
                <pre>{streamedData}</pre>
            </div>
        </div>
    )
}

export default ChatComponent
