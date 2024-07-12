// app/dashboard/OptionalStarterPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import AmeSlider from "@/ui/slider/AmeSlider";
import { Space, Textarea, Button, TextInput } from "@mantine/core";

function Page() {
    const customLabels = ['Armani', 'Hello', 'Kevin', 'One More', 'Natalie'];
    const [data, setData] = useState('');
    const [inputData, setInputData] = useState('');

    useEffect(() => {
        const eventSource = new EventSource('/api/redis?channel=channel-chat');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setData(data.data);
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!inputData) return;

        try {
            const response = await fetch('/api/redis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ channel: 'channel-chat', data: inputData }),
            });

            if (response.ok) {
                setInputData('');
            } else {
                console.error('Failed to send data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div>
            <Space h="xl" />
            <Space h="xl" />
            <Textarea value={data} readOnly />
            <Space h="xl" />
            <Space h="xl" />
            <form onSubmit={handleSubmit}>
                <TextInput
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Enter your data"
                />
                <Space h="md" />
                <Button type="submit">Send Data</Button>
            </form>
            <Space h="xl" />
            <Space h="xl" />
            <AmeSlider
                name=""
                tooltip="Hint: my favorite is Natalie"
                size="xs"
                color='gray'
                min={0}
                max={1}
                step={.01}
                showNumber={true}
            />
        </div>
    );
}

export default Page;
