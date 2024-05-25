// app/chat/ChatPage.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, Burger, Space, Textarea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Sidebar from './sidebar/Sidebar';
import ResponseArea from './response-display/ResponseArea';

function ChatPage() {
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
        <Container fluid style={{ height: '100vh', display: 'flex', padding: '0' }}>
            <Grid grow style={{ flex: 1 }} columns={12} gutter={0}>

                {!isSmallScreen && (
                    <>
                        <Grid.Col span={2} style={{ flexGrow: 0, flexShrink: 0, maxWidth: '200px', padding: '0' }}>
                            <Sidebar />
                        </Grid.Col>

                        <Grid.Col span={1} style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', padding: '0' }}></Grid.Col>
                    </>
                )}

                <Grid.Col span={8} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    maxWidth: '800px',
                    padding: '0',
                    margin: '0 auto'
                }}>
                    <div style={{
                        flexGrow: 1,
                        overflow: 'auto'
                    }}>
                        <ResponseArea bottomPadding={bottomPadding}/>
                    </div>
                    <div style={{
                        position: 'sticky',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: 'var(--mantine-color-body)'
                    }}>
                        <div style={{height: '2px'}}></div>
                        <Textarea placeholder="Type your message..." style={{width: '100%'}}/>
                        <div style={{height: '10px'}}></div>
                    </div>
                </Grid.Col>

                {!isSmallScreen && (
                    <Grid.Col span={1} style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        flexBasis: '0%',
                        padding: '0'
                    }}></Grid.Col>
                )}

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

            </Grid>
        </Container>
    );
}

export default ChatPage;
