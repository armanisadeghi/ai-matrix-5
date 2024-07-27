// components/audio/BasicAudioPlayer.tsx

'use client';

import React, { useState, useRef } from 'react';
import { Group, Button, Slider, Text } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconVolume } from '@tabler/icons-react';

interface BasicAudioPlayerProps {
    src: string;
}

export default function BasicAudioPlayer({ src }: BasicAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

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

    const handleVolumeChange = (value: number) => {
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };

    return (
        <Group>
            <audio ref={audioRef} src={src} />
            <Button onClick={togglePlayPause}>
                {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
            </Button>
            <Group>
                <IconVolume size={16} />
                <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    min={0}
                    max={1}
                    step={0.01}
                    w={100}
                    label={(value) => `${Math.round(value * 100)}%`}
                />
            </Group>
        </Group>
    );
}
