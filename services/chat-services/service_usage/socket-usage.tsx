// app/samples/ai-tests/shared/services/service_usage/socket-usage.tsx

import React, { useState, useEffect } from 'react';
import { useDynamicSocketContext } from "@/context/AiContext/socketContext";
import { useDynamicSocketHandler } from "@/services/chat-services/dynamicSocketHandler";


const ChatComponent = () => {
    const [streamedData, setStreamedData] = useState<string>('');
    const { handleRealTimeData, onStreamEnd } = useDynamicSocketContext();

    const handleRealTime = (data: string) => {
        handleRealTimeData(data);
        setStreamedData(prevData => prevData + data);
    };

    const { handleDynamicElements } = useDynamicSocketHandler(handleRealTime, onStreamEnd);

    const handleClick = async () => {
        await handleDynamicElements();
    };

    return (
        <div>
            <button onClick={handleClick}>Start Chat</button>
            <div>
                <h3>Streamed Data:</h3>
                <pre>{streamedData}</pre>
            </div>
        </div>
    );
};

export default ChatComponent;
