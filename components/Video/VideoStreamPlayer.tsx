'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button, Text, Stack, Progress, Group } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconPlayerStop } from '@tabler/icons-react';


interface VideoStreamPlayerProps {
    streamUrl: string;
}

const VideoStreamPlayer: React.FC<VideoStreamPlayerProps> = ({streamUrl}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [buffer, setBuffer] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleProgress = () => {
            if (video.buffered.length > 0) {
                setBuffer((video.buffered.end(0) / video.duration) * 100);
            }
        };

        video.addEventListener('progress', handleProgress);
        return () => video.removeEventListener('progress', handleProgress);
    }, []);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const stopPlayback = () => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <Stack gap="md">
            <video
                ref={videoRef}
                src={streamUrl}
                style={{width: '100%', maxHeight: '300px'}}
            />
            <Text>Streaming: {streamUrl}</Text>
            <Progress.Section value={buffer} color="orange">
                <Progress.Label>{`Buffer: ${buffer.toFixed(0)}%`}</Progress.Label>
            </Progress.Section>
            <Group>
                <Button onClick={togglePlayPause}>
                    {isPlaying ? <IconPlayerPause size={16}/> : <IconPlayerPlay size={16}/>}
                </Button>
                <Button onClick={stopPlayback}>
                    <IconPlayerStop size={16}/>
                </Button>
            </Group>
        </Stack>
    );
};

export default VideoStreamPlayer;
