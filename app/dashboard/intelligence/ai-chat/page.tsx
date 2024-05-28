// ai-chat/page.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Textarea, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ResponseArea from './components/response/ResponseArea';
import { ChatLayout } from './chat-layout';

const ChatPage = () => {
    const [bottomPadding, setBottomPadding] = useState(0);
    const [opened, setOpened] = useState(false);
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
    }, [textareaContainerRef.current]);

    return (
        <ChatLayout>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flexGrow: 1, overflow: 'auto' }}>
                    <ResponseArea bottomPadding={bottomPadding} />
                </div>
                <div ref={textareaContainerRef} style={{ position: 'sticky', bottom: 0, width: '100%', backgroundColor: 'var(--mantine-color-body)' }}>
                    <div style={{ height: '2px' }}></div>
                    <Textarea placeholder="Type your message..." style={{ width: '100%' }} />
                    <div style={{ height: '10px' }}></div>
                </div>
            </div>

            {isSmallScreen && (
                <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
                    <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
                </div>
            )}
        </ChatLayout>
    );
};

export default ChatPage;
