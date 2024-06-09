// ai-chatbot/ChatsPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Burger } from '@mantine/core';
import DynamicTextarea from '@/components/AiChat/UserInput/DynamicTextarea';
import ResponseArea from '@/components/AiChat/Response/ResponseArea';
import useChatLogic from './hooks/useChatLogic';

const ChatsPage = () => {
    const {
        bottomPadding,
        opened,
        setOpened,
        userInput,
        handleInputChange,
        handleSendMessage,
        textareaContainerRef,
        isSmallScreen,
    } = useChatLogic();

    const [containerHeight, setContainerHeight] = useState('96%');

    useEffect(() => {
        const handleResize = () => {
            const height = window.innerHeight;
            if (height > 1500) {
                setContainerHeight('95.5%');
            } else if (height > 1300) {
                setContainerHeight('96%');
            } else if (height > 1100) {
                setContainerHeight('96.5%');
            } else if (height > 800) {
                setContainerHeight('97%');
            } else if (height > 600) {
                setContainerHeight('97.5%');
            } else {
                setContainerHeight('98%');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: containerHeight }}>

                <ResponseArea bottomPadding={bottomPadding} />

                <DynamicTextarea
                    systemText="Let's get started..."
                    placeholderText="Enter system message..."
                    ref={textareaContainerRef}
                    userInput={userInput}
                    handleInputChange={handleInputChange}
                    //handleSendMessage={handleSendMessage} // Removed to test Atoms
                />
            </div>
        </>
    );
};

export default ChatsPage;
