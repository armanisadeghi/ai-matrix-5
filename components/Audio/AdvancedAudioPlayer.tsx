// components/audio/AdvancedAudioPlayer.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Group, Button, Slider, Text, Stack, Modal } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconVolume, IconSettings } from '@tabler/icons-react';

interface AdvancedAudioPlayerProps {
    src: string;
}

export default function AdvancedAudioPlayer({ src }: AdvancedAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const updateTime = () => setCurrentTime(audio.currentTime);
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
            return () => {
                audio.removeEventListener('timeupdate', updateTime);
            };
        }
    }, []);

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

    const handleSeek = (value: number) => {
        setCurrentTime(value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }
    };

    const handlePlaybackRateChange = (value: number) => {
        setPlaybackRate(value);
        if (audioRef.current) {
            audioRef.current.playbackRate = value;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Stack>
            <audio ref={audioRef} src={src} />
            <Group>
                <Button onClick={togglePlayPause}>
                    {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                </Button>
                <Text size="sm">{formatTime(currentTime)} / {formatTime(duration)}</Text>
                <Button onClick={() => setShowSettings(true)}>
                    <IconSettings size={16} />
                </Button>
            </Group>
            <Slider
                value={currentTime}
                onChange={handleSeek}
                min={0}
                max={duration}
                label={formatTime}
                w="100%"
            />
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

            <Modal opened={showSettings} onClose={() => setShowSettings(false)} title="Audio Settings">
                <Stack>
                    <Text>Playback Speed</Text>
                    <Slider
                        value={playbackRate}
                        onChange={handlePlaybackRateChange}
                        min={0.5}
                        max={2}
                        step={0.1}
                        w={200}
                        label={(value) => `${value}x`}
                    />
                </Stack>
            </Modal>
        </Stack>
    );
}
