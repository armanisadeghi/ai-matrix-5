// ai-chat/layout.tsx
import React, { useState } from 'react';
import { Container, Grid, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Sidebar from './components/sidebar/Sidebar';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    const [opened, setOpened] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

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

                <Grid.Col span={8} style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '800px', padding: '0', margin: '0 auto' }}>
                    {children}
                </Grid.Col>

                {!isSmallScreen && (
                    <Grid.Col span={1} style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', padding: '0' }}></Grid.Col>
                )}

                {isSmallScreen && (
                    <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
                        <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
                    </div>
                )}
            </Grid>
        </Container>
    );
};

export default ChatLayout;
