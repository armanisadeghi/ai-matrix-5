// ai-chatbot/page.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ResponseArea from '@/app/samples/ai-tests/ai-chatbot/components/response/ResponseArea';
import UserMessageArea from '@/app/samples/ai-tests/ai-chatbot/components/input/UserMessageArea';
import { useSidebar } from "@/context/SidebarContext";
import ChatSidebar from "@/app/samples/ai-tests/ai-chatbot/components/sidebar/ChatSidebar";
import { chatTitlesAndIdsAtom, detailsForAllChatsAtom } from "@/context/atoms/chatAtoms";
import { useRecoilValue } from "recoil";

const ChatPage = () => {
    const [bottomPadding, setBottomPadding] = useState(0);
    const [opened, setOpened] = useState(false);
    const [userInput, setUserInput] = useState('');
    const textareaContainerRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const { setSidebarContent } = useSidebar();
    const chatTitlesAndIds = useRecoilValue(chatTitlesAndIdsAtom);

    useEffect(() => {
        let isLoading = false;
        if (chatTitlesAndIds) {
            isLoading = true;
        }
        setSidebarContent(
            <ChatSidebar chatHistory={chatTitlesAndIds} isLoading={isLoading} />
        );

        return () => {
            setSidebarContent(null); // Clean up
        };
    }, [setSidebarContent, chatTitlesAndIds]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (textareaContainerRef.current) {
            const handleResize = () => {
                setBottomPadding(textareaContainerRef.current!.offsetHeight + 30);
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
            console.log("Message sent:", userInput);
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
                <UserMessageArea
                    ref={textareaContainerRef}
                    userInput={userInput}
                    handleInputChange={handleInputChange}
                    handleSendMessage={handleSendMessage}
                />
            </div>
            {isSmallScreen && (
                <div style={{
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    zIndex: 1000
                }}>
                    <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
                </div>
            )}
        </>
    );
};

export default ChatPage;