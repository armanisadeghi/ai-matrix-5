// hooks/useOpenAiStream.js
import { useEffect, useState } from 'react';

export default function useOpenAiStream(initMessages: any[]) {
    const [responses, setResponses] = useState<any[]>([]);

    useEffect(() => {
        const eventSource = new EventSource('/api/openai-stream');

        eventSource.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setResponses((prev: any[]) => [...prev, data.message]);
        };

        eventSource.onerror = function() {
            eventSource.close();
        };

        // Send initial messages after establishing the connection
        fetch('/api/openai-stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: initMessages }),
        });

        return () => {
            eventSource.close();
        };
    }, [initMessages]);

    return responses;
}

