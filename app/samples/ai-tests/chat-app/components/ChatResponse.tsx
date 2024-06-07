// chat-app/nice-working/ChatResponse.tsx
'use client';

import React, { useEffect } from 'react';
import { useAiResponse } from '@/context/AiContext/AiResponseContext';
import { handleDynamicElements } from '@/app/samples/ai-tests/shared/services/dynamicSocketHandler';

const ChatResponse: React.FC = () => {
    const { triggerResponse, setRespondData } = useAiResponse();

    useEffect(() => {
        if (!triggerResponse) return;

        const userToken = 'your-user-token'; // Replace with actual user token
        const message = 'your-message'; // Replace with the actual message to be sent

        const { close } = handleDynamicElements(userToken, message, (streamBuffer) => {
            const response = JSON.parse(streamBuffer);
            if (response.form) {
                setRespondData(response.form);
            }
            // Handle the end of the stream here
        });

        return () => {
            close();
        };
    }, [triggerResponse, setRespondData]); // Depend on triggerResponse

    return (
        <div>
            <p>Listening for AI responses... (ChatResponse)</p>
        </div>
    );
};

export default ChatResponse;
