'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Slider, Button, Group, Text, Stack } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconVolume, IconVolume3 } from '@tabler/icons-react';

interface AudioPlayerProps {
    src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        }

        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        }
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

    const handleTimeChange = (value: number) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = value;
            setCurrentTime(value);
        }
    };

    const handleVolumeChange = (value: number) => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = value;
            setVolume(value);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Stack gap="xs">
            <audio ref={audioRef} src={src} />
            <Group justify="space-between">
                <Button onClick={togglePlayPause}>
                    {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                </Button>
                <Text size="sm">{formatTime(currentTime)} / {formatTime(duration)}</Text>
            </Group>
            <Slider
                value={currentTime}
                onChange={handleTimeChange}
                max={duration}
                label={formatTime}
                labelAlwaysOn
            />
            <Group gap="xs">
                {volume > 0 ? <IconVolume size={16} /> : <IconVolume3 size={16} />}
                <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    max={1}
                    step={0.01}
                    style={{ flexGrow: 1 }}
                />
            </Group>
        </Stack>
    );
};

export default AudioPlayer;
