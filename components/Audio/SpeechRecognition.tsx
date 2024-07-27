// components/audio/AudioMixer.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Group, Slider, Text, Button, Stack } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';

interface Track {
    id: number;
    name: string;
    url: string;
    volume: number;
}

export default function AudioMixer() {
    const [tracks, setTracks] = useState<Track[]>([
        { id: 1, name: 'Drums', url: '/audio/drums.mp3', volume: 0.5 },
        { id: 2, name: 'Bass', url: '/audio/bass.mp3', volume: 0.5 },
        { id: 3, name: 'Guitar', url: '/audio/guitar.mp3', volume: 0.5 },
        { id: 4, name: 'Vocals', url: '/audio/vocals.mp3', volume: 0.5 },
    ]);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodesRef = useRef<Map<number, AudioBufferSourceNode>>(new Map());
    const gainNodesRef = useRef<Map<number, GainNode>>(new Map());

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const loadTrack = async (track: Track) => {
        if (!audioContextRef.current) return;

        const response = await fetch(track.url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

        const sourceNode = audioContextRef.current.createBufferSource();
        sourceNode.buffer = audioBuffer;

        const gainNode = audioContextRef.current.createGain();
        gainNode.gain.setValueAtTime(track.volume, audioContextRef.current.currentTime);

        sourceNode.connect(gainNode).connect(audioContextRef.current.destination);

        sourceNodesRef.current.set(track.id, sourceNode);
        gainNodesRef.current.set(track.id, gainNode);
    };

    const togglePlayPause = async () => {
        if (!audioContextRef.current) return;

        if (isPlaying) {
            sourceNodesRef.current.forEach((sourceNode) => sourceNode.stop());
            setIsPlaying(false);
        } else {
            await Promise.all(tracks.map(loadTrack));
            sourceNodesRef.current.forEach((sourceNode) => sourceNode.start());
            setIsPlaying(true);
        }
    };

    const handleVolumeChange = (trackId: number, volume: number) => {
        setTracks(tracks.map(track =>
            track.id === trackId ? { ...track, volume } : track
        ));

        const gainNode = gainNodesRef.current.get(trackId);
        if (gainNode && audioContextRef.current) {
            gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
        }
    };

    return (
        <Stack>
            <Button onClick={togglePlayPause}>
                {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
            </Button>
            {tracks.map(track => (
                <Group key={track.id}>
                    <Text style={{ width: '80px' }}>{track.name}</Text>
                    <Slider
                        value={track.volume}
                        onChange={(value) => handleVolumeChange(track.id, value)}
                        min={0}
                        max={1}
                        step={0.01}
                        w={200}
                        label={(value) => `${Math.round(value * 100)}%`}
                    />
                </Group>
            ))}
        </Stack>
    );
}
