'use client';

import React, { useState, useRef } from 'react';
import { Button, Group, Text, Stack } from '@mantine/core';
import { IconMicrophone, IconSquare } from '@tabler/icons-react';
import { BsRecordCircle } from "react-icons/bs";

const AudioRecorder: React.FC = () => {
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
        <Stack align="center" gap="md">
            <Button
                onClick={isRecording ? stopRecording : startRecording}
                size="sm"
                radius="lg"
                variant={isRecording ? "filled" : "outline"}
            >
                {isRecording ? <BsRecordCircle size={18} /> : <IconMicrophone size={18} />}
            </Button>
            <Text>{isRecording ? 'Recording...' : 'Click to record'}</Text>
            {audioBlob && (
                <audio controls src={URL.createObjectURL(audioBlob)} />
            )}
        </Stack>
    );
};

export default AudioRecorder;
