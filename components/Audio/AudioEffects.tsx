'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Slider, Button, Group, Text, Stack, Select } from '@mantine/core';

interface AudioEffectsProps {
    src?: string;
    onProcessed?: (processedAudio: AudioBuffer) => void;
}

const AudioEffects: React.FC<AudioEffectsProps> = ({ src, onProcessed }) => {
    const [effect, setEffect] = useState('none');
    const [intensity, setIntensity] = useState(50);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const applyEffect = async () => {
        if (!audioContextRef.current) return;

        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

        sourceNodeRef.current = audioContextRef.current.createBufferSource();
        sourceNodeRef.current.buffer = audioBuffer;

        gainNodeRef.current = audioContextRef.current.createGain();
        sourceNodeRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);

        switch (effect) {
            case 'volume':
                gainNodeRef.current.gain.setValueAtTime(intensity / 50, audioContextRef.current.currentTime);
                break;
            // Add more effects here
            default:
                break;
        }

        sourceNodeRef.current.start();
        onProcessed(audioBuffer);
    };

    return (
        <Stack h="md">
            <Select
                label="Effect"
                data={[
                    { value: 'none', label: 'None' },
                    { value: 'volume', label: 'Volume' },
                    // Add more effects here
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

export default AudioEffects;
