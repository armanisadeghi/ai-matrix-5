// ai-chat/page.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from '@mantine/core';
import ResponseArea from './components/response/ResponseArea';
import { useMediaQuery } from '@mantine/hooks';

const ChatPage = () => {
    const [bottomPadding, setBottomPadding] = useState(0);
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
    );
};

export default ChatPage;
