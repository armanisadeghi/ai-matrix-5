// components/audio/SpeechToText.tsx

'use client';

import React, { useState, useRef } from 'react';
import { Button, Textarea, Group } from '@mantine/core';
import { IconMicrophone, IconPlayerStop } from '@tabler/icons-react';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

type SpeechRecognition = any;

export default function SpeechToText() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event: any) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                setTranscript(finalTranscript + interimTranscript);
            };

            recognitionRef.current.start();
            setIsListening(true);
        } else {
            console.error('Speech recognition not supported in this browser');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return (
        <Group>
            <Button
                onClick={isListening ? stopListening : startListening}
                leftSection={isListening ? <IconPlayerStop size={14} /> : <IconMicrophone size={14} />}
            >
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </Button>
            <Textarea
                value={transcript}
                onChange={(event) => setTranscript(event.currentTarget.value)}
                placeholder="Transcript will appear here..."
                autosize
                minRows={3}
                style={{ width: '100%' }}
            />
        </Group>
    );
}
