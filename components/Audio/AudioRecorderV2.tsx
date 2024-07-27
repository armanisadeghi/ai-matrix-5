// components/audio/AudioRecorder.tsx

'use client';

import React, { useState, useRef } from 'react';
import { Button, Group, Text } from '@mantine/core';
import { IconMicrophone, IconPlayerStop } from '@tabler/icons-react';

export default function AudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                chunksRef.current = [];
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <Group>
            {!isRecording ? (
                <Button onClick={startRecording} leftSection={<IconMicrophone size={16} />}>
                    Start Recording
                </Button>
            ) : (
                <Button onClick={stopRecording} leftSection={<IconPlayerStop size={16} />}>
                    Stop Recording
                </Button>
            )}
            {audioBlob && (
                <Text>
                    Recording saved: {(audioBlob.size / 1024 / 1024).toFixed(2)} MB
                </Text>
            )}
        </Group>
    );
}
