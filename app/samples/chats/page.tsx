// ai-chatbot/page.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ResponseArea from '@/app/samples/ai-tests/shared/response/ResponseArea';
import AmeUserMessageArea from '@/app/samples/ai-tests/shared/input/AmeUserInput';
import saveMessageToDb from "@/app/samples/ai-tests/shared/servicees/saveMessageToDb";
import MessageEntry from "@/services/Chat";


const ChatsPage = () => {
    const [bottomPadding, setBottomPadding] = useState(0);
    const [opened, setOpened] = useState(false);
    const [userInput, setUserInput] = useState('');
    const textareaContainerRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (textareaContainerRef.current) {
            const handleResize = () => {
                setBottomPadding(textareaContainerRef.current!.offsetHeight + 0);
            };
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        console.log('UserMessageArea container ref:', textareaContainerRef.current);
    }, [textareaContainerRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (userInput.trim()) {
            console.log("DEBUG Received:", userInput);

            const MessageEntry = {
                role: 'user',
                text: userInput.trim()
            };

            try {
                const result = saveMessageToDb(MessageEntry);
                console.log('Message added successfully:', result);
            } catch (error) {
                console.error('There was a problem adding the message:', error);
            }

            setUserInput('');
        }
    };

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>

                <ResponseArea bottomPadding={bottomPadding} />

                <AmeUserMessageArea
                    systemText="Let's get started..."
                    placeholderText="Enter system message..."
                    ref={textareaContainerRef}
                    userInput={userInput}
                    handleInputChange={handleInputChange}
                    //handleSendMessage={handleSendMessage} // Removed to test Atoms
                />
            </div>
            {isSmallScreen && (
                <div style={{
                    position: 'fixed',
                    top: '0px',
                    left: '10px',
                    zIndex: 1000
                }}>
                    <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
                </div>
            )}
        </>
    );
};

export default ChatsPage;
