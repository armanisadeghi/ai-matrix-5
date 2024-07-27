'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Select, Slider, Button, Group, Text, Stack } from '@mantine/core';

interface VideoEffectsProps {
    src: string;
    onProcessed: (processedVideo: Blob) => void;
}

const VideoEffects: React.FC<VideoEffectsProps> = ({ src, onProcessed }) => {
    const [effect, setEffect] = useState('none');
    const [intensity, setIntensity] = useState(50);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const drawFrame = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Apply selected effect
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            switch (effect) {
                case 'grayscale':
                    for (let i = 0; i < data.length; i += 4) {
                        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                        data[i] = data[i + 1] = data[i + 2] = avg;
                    }
                    break;
                case 'sepia':
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
                        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
                        data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
                    }
                    break;
                case 'invert':
                    for (let i = 0; i < data.length; i += 4) {
                        data[i] = 255 - data[i];
                        data[i + 1] = 255 - data[i + 1];
                        data[i + 2] = 255 - data[i + 2];
                    }
                    break;
            }

            context.putImageData(imageData, 0, 0);
            requestAnimationFrame(drawFrame);
        };

        video.addEventListener('play', drawFrame);

        return () => {
            video.removeEventListener('play', drawFrame);
        };
    }, [effect]);

    const applyEffect = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob((blob) => {
            if (blob) {
                onProcessed(blob);
            }
        }, 'video/webm');
    };

    return (
        <Stack gap="md">
            <video
                ref={videoRef}
                src={src}
                style={{ width: '100%', maxHeight: '300px' }}
                controls
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <Select
                label="Effect"
                data={[
                    { value: 'none', label: 'None' },
                    { value: 'grayscale', label: 'Grayscale' },
                    { value: 'sepia', label: 'Sepia' },
                    { value: 'invert', label: 'Invert' },
                ]}
                value={effect}
                onChange={(value) => setEffect(value as string)}
            />
            <Slider
                label="Intensity"
                value={intensity}
                onChange={setIntensity}
                min={0}
                max={100}
                step={1}
            />
            <Button onClick={applyEffect}>Apply Effect</Button>
        </Stack>
    );
};

export default VideoEffects;
