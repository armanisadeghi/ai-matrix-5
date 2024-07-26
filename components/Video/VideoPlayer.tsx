'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Slider, Button, Group, Text, Stack, ActionIcon } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconVolume, IconVolume3, IconMaximize, IconMinimize } from '@tabler/icons-react';

interface VideoPlayerProps {
    src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const setVideoData = () => {
            setDuration(video.duration);
            setCurrentTime(video.currentTime);
        }

        const setVideoTime = () => setCurrentTime(video.currentTime);

        video.addEventListener('loadedmetadata', setVideoData);
        video.addEventListener('timeupdate', setVideoTime);

        return () => {
            video.removeEventListener('loadedmetadata', setVideoData);
            video.removeEventListener('timeupdate', setVideoTime);
        }
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

    const handleTimeChange = (value: number) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = value;
            setCurrentTime(value);
        }
    };

    const handleVolumeChange = (value: number) => {
        const video = videoRef.current;
        if (video) {
            video.volume = value;
            setVolume(value);
        }
    };

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (!isFullscreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if ((container as any).mozRequestFullScreen) {
                (container as any).mozRequestFullScreen();
            } else if ((container as any).webkitRequestFullscreen) {
                (container as any).webkitRequestFullscreen();
            } else if ((container as any).msRequestFullscreen) {
                (container as any).msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Box ref={containerRef} style={{ position: 'relative' }}>
            <video
                ref={videoRef}
                src={src}
                style={{ width: '100%', height: 'auto' }}
                onClick={togglePlayPause}
            />
            <Stack gap="xs" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', background: 'rgba(0,0,0,0.5)' }}>
                <Group justify="space-between">
                    <Button onClick={togglePlayPause} variant="subtle" color="gray">
                        {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                    </Button>
                    <Text size="sm" color="white">{formatTime(currentTime)} / {formatTime(duration)}</Text>
                    <ActionIcon variant="subtle" color="gray" onClick={toggleFullscreen}>
                        {isFullscreen ? <IconMinimize size={16} /> : <IconMaximize size={16} />}
                    </ActionIcon>
                </Group>
                <Slider
                    value={currentTime}
                    onChange={handleTimeChange}
                    max={duration}
                    label={formatTime}
                    labelAlwaysOn
                    styles={(theme) => ({
                        bar: {
                            backgroundColor: theme.colors.blue[6],
                        },
                        thumb: {
                            borderColor: theme.colors.blue[6],
                        },
                    })}
                />
                <Group gap="xs">
                    {volume > 0 ? <IconVolume size={16} color="white" /> : <IconVolume3 size={16} color="white" />}
                    <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        max={1}
                        step={0.01}
                        style={{ flexGrow: 1 }}
                        styles={(theme) => ({
                            bar: {
                                backgroundColor: theme.colors.gray[5],
                            },
                            thumb: {
                                borderColor: theme.colors.gray[5],
                            },
                        })}
                    />
                </Group>
            </Stack>
        </Box>
    );
};

export default VideoPlayer;
