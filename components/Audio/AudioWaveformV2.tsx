// components/audio/AudioWaveform.tsx

'use client';

import React, { useRef, useEffect } from 'react';
import { Box } from '@mantine/core';

interface AudioWaveformProps {
    audioUrl: string;
    width: number;
    height: number;
}

export default function AudioWaveform({ audioUrl, width, height }: AudioWaveformProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const drawWaveform = async () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const response = await fetch(audioUrl);
            const arrayBuffer = await response.arrayBuffer();
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const data = audioBuffer.getChannelData(0);
            const step = Math.ceil(data.length / width);
            const amp = height / 2;

            ctx.fillStyle = '#3498db';
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < width; i++) {
                let min = 1.0;
                let max = -1.0;
                for (let j = 0; j < step; j++) {
                    const datum = data[(i * step) + j];
                    if (datum < min) min = datum;
                    if (datum > max) max = datum;
                }
                ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
            }
        };

        drawWaveform();
    }, [audioUrl, width, height]);

    return (
        <Box>
            <canvas ref={canvasRef} width={width} height={height} />
        </Box>
    );
}
