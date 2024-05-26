'use client';

import React from 'react';
import ChatInput from './components/ChatInput';
import ChatSettings from './components/settings/ChatSettings';
import ChatResponse from './components/ChatResponse';
import ChatHistory from './components/ChatHistory';
import AiResponseForm from './components/dynamic-inputs/ChatForm';
import { AiResponseProvider, useAiResponse } from './context/AiResponseContext';
import { ChatProvider } from './context/ChatContext';

const PageContent: React.FC = () => {
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
        </div>
    );
};

const Page: React.FC = () => {
    return (
        <AiResponseProvider>
            <ChatProvider>
                <PageContent />
            </ChatProvider>
        </AiResponseProvider>
    );
};

export default Page;
