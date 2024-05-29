// chat-app/page.tsx

'use client';

import React from 'react';
import ChatInput from './components/ChatInput';
import ChatSettings from './components/settings/ChatSettings';
import ChatResponse from './components/ChatResponse';
import ChatHistory from '../ai-chatbot/components/sidebar/ChatHistory';
import AiResponseForm from './components/dynamic-inputs/ChatForm';
import { useAiResponse, AiResponseProvider } from '@/context/AiContext/AiResponseContext';

const Page: React.FC = () => {
    const { respondData, setRespondData } = useAiResponse();

    const handleFormAnswers = (answers: any) => {
        // Process form answers, e.g., send them to your API
        console.log('Form answers:', answers);
        setRespondData(null); // Clear form after submission
    };

    return (
        <div>
            <ChatResponse />
            <ChatInput />
            <ChatHistory />
            <ChatSettings />
            {respondData && (
                <AiResponseForm
                    index={0}
                    respondData={respondData}
                    setFormAnswers={handleFormAnswers}
                />
            )}
            <div>Your content here</div>
        </div>
    );
};

export default Page;


