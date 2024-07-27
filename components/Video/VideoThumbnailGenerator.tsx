'use client';

import React, { useState, useRef } from 'react';
import { Button, Image, Slider, Text, Stack } from '@mantine/core';

interface VideoThumbnailGeneratorProps {
    videoSrc: string;
}

const VideoThumbnailGenerator: React.FC<VideoThumbnailGeneratorProps> = ({ videoSrc }) => {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const generateThumbnail = () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const thumbnailUrl = canvas.toDataURL();
        setThumbnail(thumbnailUrl);
    };

    const handleTimeChange = (value: number) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = value;
            setCurrentTime(value);
        }
    };

    return (
        <Stack gap="md">
            <video
                ref={videoRef}
                src={videoSrc}
                style={{ display: 'none' }}
                onLoadedMetadata={() => {
                    if (videoRef.current) {
                        setCurrentTime(0);
                    }
                }}
            />
            <Slider
                label={(value) => `${value.toFixed(2)}s`}
                value={currentTime}
                onChange={handleTimeChange}
                max={videoRef.current?.duration || 0}
                step={0.1}
            />
            <Button onClick={generateThumbnail}>Generate Thumbnail</Button>
            {thumbnail && (
                <Stack gap="xs">
                    <Text>Generated Thumbnail:</Text>
                    <Image src={thumbnail} alt="Video Thumbnail" />
                </Stack>
            )}
        </Stack>
    );
};

export default VideoThumbnailGenerator;
