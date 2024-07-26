'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button, Text, Stack, Progress, Group } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconPlayerStop } from '@tabler/icons-react';

interface AudioStreamPlayerProps {
    streamUrl: string;
}

const AudioStreamPlayer: React.FC<AudioStreamPlayerProps> = ({ streamUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [buffer, setBuffer] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleProgress = () => {
            if (audio.buffered.length > 0) {
                setBuffer((audio.buffered.end(0) / audio.duration) * 100);
            }
        };

        audio.addEventListener('progress', handleProgress);
        return () => audio.removeEventListener('progress', handleProgress);
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const stopPlayback = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <Stack gap="md">
            <audio ref={audioRef} src={streamUrl} />
            <Text>Streaming: {streamUrl}</Text>
            <Progress value={buffer} size="sm" />
            <Group>
                <Button onClick={togglePlayPause}>
                    {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                </Button>
                <Button onClick={stopPlayback}>
                    <IconPlayerStop size={16} />
                </Button>
            </Group>
        </Stack>
    );
};

export default AudioStreamPlayer;
