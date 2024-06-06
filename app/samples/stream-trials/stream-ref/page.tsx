// app/samples/stream-trials/stream-ref/page.tsx

'use client';

import Loading from '@/app/dashboard/loading';
import React, { Suspense, useState, useRef } from 'react';
import { Button, Grid, Slider, Space, Textarea } from "@mantine/core";
import { MessageEntry } from "@/types/chat";
import { submitChatRequest } from "../../ai-tests/shared/services/SteamOpenAi";

export function ChatInterface() {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState<string[]>([]);
    const responseRef = useRef<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userMessage: MessageEntry = {
            role: 'user',
            text: message,
        };

        responseRef.current = '';
        setMessage('');

        await submitChatRequest(
            [userMessage],
            (chunk) => {
                responseRef.current += chunk;
                setResponses((prevResponses) => [...prevResponses.slice(0, -1), responseRef.current]);
            },
            (finalMessage) => {
                // Ensure the final message only updates the response once
                setResponses((prevResponses) => [...prevResponses.slice(0, -1), finalMessage.text]);
            }
        );
    };

    return (
        <div>
            <div>
                {responses.map((res, index) => (
                    <p key={index}>{res}</p>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <Space h={8} />
                <Grid>
                    <Grid.Col span={2}></Grid.Col>
                    <Grid.Col span={7}>
                        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Button type="submit">Send</Button>
                    </Grid.Col>
                    <Grid.Col span={2}></Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={2}></Grid.Col>
                    <Grid.Col span={7}>
                        <Slider color="gray" size="xs" min={0} max={10} />
                    </Grid.Col>
                    <Grid.Col span={4}></Grid.Col>
                </Grid>
                <Space h={8} />
            </form>
        </div>
    );
}


export default function Dashboard() {

    return (
        <section>
            <Suspense fallback={<Loading />}>
                <ChatInterface  />
            </Suspense>
        </section>
    );
}
