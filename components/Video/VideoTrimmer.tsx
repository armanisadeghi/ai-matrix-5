'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RangeSlider, Button, Group, Text, Stack } from '@mantine/core';

interface VideoTrimmerProps {
    src: string;
    onTrim: (start: number, end: number) => void;
}

const VideoTrimmer: React.FC<VideoTrimmerProps> = ({ src, onTrim }) => {
    const [duration, setDuration] = useState(0);
    const [trimRange, setTrimRange] = useState<[number, number]>([0, 0]);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const setVideoData = () => {
            setDuration(video.duration);
            setTrimRange([0, video.duration]);
        }

        video.addEventListener('loadedmetadata', setVideoData);

        return () => {
            video.removeEventListener('loadedmetadata', setVideoData);
        }
    }, []);

    const handleTrimRangeChange = (values: [number, number]) => {
        setTrimRange(values);
        if (videoRef.current) {
            videoRef.current.currentTime = values[0];
        }
    };

    const handleTrim = () => {
        onTrim(trimRange[0], trimRange[1]);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Stack gap="md">
            <video
                ref={videoRef}
                src={src}
                style={{ width: '100%', maxHeight: '300px' }}
                controls
            />
            <RangeSlider
                min={0}
                max={duration}
                step={0.1}
                value={trimRange}
                onChange={handleTrimRangeChange}
                label={formatTime}
                labelAlwaysOn
            />
            <Group justify="space-between">
                <Text>Start: {formatTime(trimRange[0])}</Text>
                <Text>End: {formatTime(trimRange[1])}</Text>
            </Group>
            <Button onClick={handleTrim}>Trim Video</Button>
        </Stack>
    );
};

export default VideoTrimmer;
