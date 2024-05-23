// matrix-apps/page.tsx
'use client';

import {Box, Button, Container, Paper, rem, ScrollArea, Textarea} from "@mantine/core";
import {ChatItem} from "@/components";
import {IconSend} from "@tabler/icons-react";

export default function ChatbotPage() {
    return (
        <>
            <Container>
                <Paper>
                    <ScrollArea h={400}>
                        <ChatItem message="messsage"/>
                        <ChatItem message="messsage1" isMe/>
                        <ChatItem message="messsage2" isMe/>
                        <ChatItem message="messsage3" isMe/>
                    </ScrollArea>
                </Paper>
                <Box>
                    <Textarea placeholder="Ask me anything" mb="sm"/>
                    <Button leftSection={<IconSend style={{height: rem(18), width: rem(18)}}/>}>Send</Button>
                </Box>
            </Container>
        </>
    );
};