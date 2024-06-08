// ai-chatbot/ChatsPage.tsx
'use client';
import React from 'react';
import { Burger } from '@mantine/core';
import DynamicTextarea from '@/components/AiChat/input/DynamicTextarea';
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

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

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
            {isSmallScreen && (
                <div style={{ position: 'fixed', top: '0px', left: '10px', zIndex: 1000}}>
                    <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
                </div>
            )}
        </>
    );
};

export default ChatsPage;
