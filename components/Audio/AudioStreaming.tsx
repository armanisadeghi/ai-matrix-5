// components/audio/AudioStreaming.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Text, Progress, Group, Stack } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconPlayerStop } from '@tabler/icons-react';

export default function AudioStreaming() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Replace this URL with your actual streaming URL
    const streamUrl = 'https://example.com/audio-stream';

    useEffect(() => {
        audioRef.current = new Audio(streamUrl);

        audioRef.current.addEventListener('canplay', () => setIsLoading(false));
        audioRef.current.addEventListener('waiting', () => setIsLoading(true));
        audioRef.current.addEventListener('timeupdate', updateProgress);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('canplay', () => setIsLoading(false));
                audioRef.current.removeEventListener('waiting', () => setIsLoading(true));
                audioRef.current.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    const updateProgress = () => {
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            const currentTime = audioRef.current.currentTime;
            setProgress((currentTime / duration) * 100);
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const stopStream = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <Stack>
            <Group>
                <Button onClick={togglePlayPause} disabled={isLoading}>
                    {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                </Button>
                <Button onClick={stopStream} disabled={!isPlaying}>
                    <IconPlayerStop size={16} />
                </Button>
            </Group>
            <Text>{isLoading ? 'Buffering...' : (isPlaying ? 'Playing' : 'Stopped')}</Text>
            <Progress value={progress} animated={isPlaying} />
        </Stack>
    );
}
