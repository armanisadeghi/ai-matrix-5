// WaveSurferComponent.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import WaveSurfer from 'wavesurfer.js';
import { WaveSurferOptions } from './WaveSurferOptions';


interface AudioWaveformProps extends Partial<WaveSurferOptions> {
    src: string;
    onReady?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onFinish?: () => void;
    onError?: (error: Error) => void;
}

const AudioWaveform: React.FC<AudioWaveformProps> = (
    {
        src,
        onReady,
        onPlay,
        onPause,
        onFinish,
        onError,
        waveColor = 'violet',
        progressColor = 'purple',
        cursorColor = 'navy',
        barWidth = 2,
        barRadius = 3,
        height = 100,
        ...restOptions
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
                ...restOptions,
            });

            ws.load(src);

            ws.on('ready', () => {
                setWavesurfer(ws);
                if (onReady) onReady();
            });

            ws.on('play', () => onPlay && onPlay());
            ws.on('pause', () => onPause && onPause());
            ws.on('finish', () => onFinish && onFinish());
            ws.on('error', (error) => onError && onError(error));

            return () => {
                ws.destroy();
            };
        }
    }, [src, onReady, onPlay, onPause, onFinish, onError, waveColor, progressColor, cursorColor, barWidth, barRadius, height, restOptions]);

    return <Box ref={waveformRef}/>;
};

export default AudioWaveform;
