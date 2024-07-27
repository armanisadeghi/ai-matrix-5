'use client';

import React, { useRef } from 'react';
import { Container, Box, ScrollArea } from '@mantine/core';
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";

interface ClientComponentProps {
    accessToken: string;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ accessToken }) => {
    const timeout = useRef<number | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <Box style={{ position: 'relative', flexGrow: 1, maxWidth: '100vw', height: '100vh', overflow: 'hidden' }}>
            <VoiceProvider
                auth={{ type: "accessToken", value: accessToken }}
                onMessage={() => {
                    if (timeout.current) {
                        clearTimeout(timeout.current);
                    }
                    timeout.current = window.setTimeout(() => {
                        if (ref.current) {
                            ref.current.scrollTo({
                                top: ref.current.scrollHeight,
                                behavior: "smooth",
                            });
                        }
                    }, 200);
                }}
            >
                <ScrollArea style={{ flexGrow: 1 }}>
                    <Container size="md" style={{ paddingBottom: '96px' }}>
                        <Messages ref={ref} />
                        <Controls />
                        <StartCall />
                    </Container>
                </ScrollArea>
            </VoiceProvider>
        </Box>
    );
};

export default ClientComponent;
