'use client';
import React from 'react';
import { Container, Grid, Burger, Textarea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { UserProvider } from '@/context/AiContext/UserContext';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    return (
        <UserProvider>
            <Container fluid style={{ height: '100vh', display: 'flex', padding: '0' }}>

                <Grid grow style={{ flex: 1 }} columns={12} gutter={0}>
                    {!isSmallScreen && (
                        <>
                            <Grid.Col span={1} style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', padding: '0' }}></Grid.Col>
                        </>
                    )}
                    <Grid.Col span={8} style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '800px', padding: '0', margin: '0 auto' }}>
                        {children}
                    </Grid.Col>
                    {!isSmallScreen && (
                        <Grid.Col span={1} style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', padding: '0' }}></Grid.Col>
                    )}
                </Grid>

            </Container>
        </UserProvider>
    );
};

export default ChatLayout;
