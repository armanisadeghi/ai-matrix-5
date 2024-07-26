// components/audio/AudioEffectsProcessor.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Group, Button, Slider, Stack, Text } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';

interface AudioEffectsProcessorProps {
    src: string;
}

export default function AudioEffectsProcessor({ src }: AudioEffectsProcessorProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [gain, setGain] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [reverb, setReverb] = useState(0);

    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const pitchNodeRef = useRef<any>(null); // Using 'any' as pitch-shift is not a standard Web Audio API node
    const reverbNodeRef = useRef<ConvolverNode | null>(null);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        // Note: Pitch shifting and reverb would require more complex implementations
        // or third-party libraries for accurate effects
        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const togglePlayPause = async () => {
        if (!audioContextRef.current) return;

        if (isPlaying) {
            sourceNodeRef.current?.stop();
            setIsPlaying(false);
        } else {
            const response = await fetch(src);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

            sourceNodeRef.current = audioContextRef.current.createBufferSource();
            sourceNodeRef.current.buffer = audioBuffer;

            sourceNodeRef.current
            .connect(gainNodeRef.current!)
            .connect(audioContextRef.current.destination);

            sourceNodeRef.current.start();
            setIsPlaying(true);
        }
    };

    const handleGainChange = (value: number) => {
        setGain(value);
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.setValueAtTime(value, audioContextRef.current!.currentTime);
        }
    };

    // Note: Pitch and reverb changes would require more complex implementations

    return (
        <Stack>
            <Button onClick={togglePlayPause}>
                {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
            </Button>
            <Group>
                <Text>Gain:</Text>
                <Slider
                    value={gain}
                    onChange={handleGainChange}
                    min={0}
                    max={2}
                    step={0.1}
                    w={200}
                    label={(value) => value.toFixed(1)}
                />
            </Group>
            <Group>
                <Text>Pitch:</Text>
                <Slider
                    value={pitch}
                    onChange={setPitch}
                    min={0.5}
                    max={2}
                    step={0.1}
                    w={200}
                    label={(value) => value.toFixed(1)}
                />
            </Group>
            <Group>
                <Text>Reverb:</Text>
                <Slider
                    value={reverb}
                    onChange={setReverb}
                    min={0}
                    max={1}
                    step={0.1}
                    w={200}
                    label={(value) => value.toFixed(1)}
                />
            </Group>
        </Stack>
    );
}
