// ai-chatbot/ChatsPage.tsx
'use client';
import React from 'react';
import DynamicTextarea from '@/components/AiChat/UserInput/DynamicTextarea';
import ResponseArea from '@/components/AiChat/Response/ResponseArea';
import useDynamicLayout from './hooks/useDynamicChatLayout';

const ChatsPage = () => {
    const { bottomPadding, containerHeight, textareaContainerRef } = useDynamicLayout();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: containerHeight }}>
            <ResponseArea bottomPadding={bottomPadding} />
            <DynamicTextarea
                systemText="Let's get started..."
                placeholderText="Enter system message..."
                ref={textareaContainerRef}
            />
        </div>
    );
};

export default ChatsPage;
