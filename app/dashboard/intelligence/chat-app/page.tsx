// chat-app/page.tsx

'use client';

import React from 'react';
import ChatInput from './components/ChatInput';
import ChatSettings from './components/settings/ChatSettings';
import ChatResponse from './components/ChatResponse';
import ChatHistory from './components/sidebar/ChatHistory';
import AiResponseForm from './components/dynamic-inputs/ChatForm';
import { useAiResponse } from './context/AiResponseContext';
import { ChatLayout } from './chat-layout';

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
        <ChatLayout>
            <PageContent />
        </ChatLayout>
    );
};

export default Page;
