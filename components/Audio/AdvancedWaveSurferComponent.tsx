// AdvancedWaveSurferComponent.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import WaveSurfer from 'wavesurfer.js';
import { WaveSurferOptions } from './WaveSurferOptions';


interface AdvancedAudioWaveformProps extends AudioWaveformProps {
    backend?: 'WebAudio' | 'MediaElement';
}

const AdvancedAudioWaveform: React.FC<AdvancedAudioWaveformProps> = (
    {
        backend = 'WebAudio',
        ...restProps
    }) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (waveformRef.current) {
            const ws = WaveSurfer.create({
                container: waveformRef.current,
                backend,
                ...restProps,
            });

            ws.load(restProps.src);

            ws.on('ready', () => {
                setWavesurfer(ws);
                if (restProps.onReady) restProps.onReady();
            });

            ws.on('play', () => restProps.onPlay && restProps.onPlay());
            ws.on('pause', () => restProps.onPause && restProps.onPause());
            ws.on('finish', () => restProps.onFinish && restProps.onFinish());
            ws.on('error', (error) => restProps.onError && restProps.onError(error));

            return () => {
                ws.destroy();
            };
        }
    }, [restProps, backend]);

    return <Box ref={waveformRef}/>;
};

export default AdvancedAudioWaveform;
