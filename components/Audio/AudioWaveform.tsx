'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import WaveSurfer from 'wavesurfer.js';


interface AudioWaveformProps {
    src: string;
    onReady?: () => void;
    waveColor?: string;
    progressColor?: string;
    cursorColor?: string;
    barWidth?: number;
    barRadius?: number;
    height?: number;
}

const AudioWaveform: React.FC<AudioWaveformProps> = (
    {
        src,
        onReady,
        waveColor = 'violet',
        progressColor = 'purple',
        cursorColor = 'navy',
        barWidth = 2,
        barRadius = 3,
        height = 100,
    }) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (waveformRef.current) {
            const ws = WaveSurfer.create({
                container: waveformRef.current,
                waveColor,
                progressColor,
                cursorColor,
                barWidth,
                barRadius,
                height,
            });

            ws.load(src);

            ws.on('ready', () => {
                setWavesurfer(ws);
                if (onReady) onReady();
            });

            return () => {
                ws.destroy();
            };
        }
    }, [src, onReady, waveColor, progressColor, cursorColor, barWidth, barRadius, height]);

    return <Box ref={waveformRef} />;
};

export default AudioWaveform;
