// components/audio/TextToSpeech.tsx

'use client';

import React, { useState } from 'react';
import { Button, Textarea, Select, Stack } from '@mantine/core';
import { IconVolume } from '@tabler/icons-react';

const voices = [
    { value: 'en-US-1', label: 'English (US) - Female' },
    { value: 'en-US-2', label: 'English (US) - Male' },
    { value: 'es-ES-1', label: 'Spanish (Spain) - Female' },
    { value: 'fr-FR-1', label: 'French (France) - Male' },
];

export default function TextToSpeech() {
    const [text, setText] = useState('');
    const [voice, setVoice] = useState('en-US-1');
    const [isLoading, setIsLoading] = useState(false);

    const handleSpeak = async () => {
        setIsLoading(true);
        try {
            // This is a placeholder for the actual API call
            // Replace with your text-to-speech API
            const response = await fetch('/api/text-to-speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voice }),
            });

            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            } else {
                console.error('Failed to generate speech');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack>
            <Textarea
                value={text}
                onChange={(event) => setText(event.currentTarget.value)}
                placeholder="Enter text to convert to speech"
                autosize
                minRows={3}
            />
            <Select
                data={voices}
                value={voice}
                onChange={(value) => setVoice(value as string)}
                label="Select Voice"
            />
            <Button
                onClick={handleSpeak}
                loading={isLoading}
                leftSection={<IconVolume size={14} />}
            >
                Speak
            </Button>
        </Stack>
    );
}
