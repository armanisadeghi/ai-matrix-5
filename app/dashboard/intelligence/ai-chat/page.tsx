// app/dashboard/intelligence/aiChat/page.tsx

'use client';
import React from 'react';
import DynamicTextarea from '@/components/AiChat/UserInput/DynamicTextarea';
import useDynamicLayout from '@/hooks/ai/useDynamicChatLayout';
import ResponseArea from "@/components/AiChat/Response/ResponseArea";
import responseStyles from '@/components/AiChat/Response/ResponseArea.module.css';
import textareaStyles from '@/components/AiChat/UserInput/DynamicTextarea.module.css';
import containerStyles from './AiChat.module.css';

const ChatsPage = () => {
    const { bottomPadding, containerHeight, textareaContainerRef } = useDynamicLayout();

    return (
        <div className={containerStyles.container} style={{ height: containerHeight }}>
            <ResponseArea className={responseStyles.container} bottomPadding={bottomPadding} />
            <DynamicTextarea
                className={textareaStyles.dynamicTextareaOuterContainer}
                systemText="Let's get started..."
                placeholderText="Enter your request or question here..."
                ref={textareaContainerRef}
            />
        </div>
    );
};

export default ChatsPage;
