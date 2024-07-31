// app/samples/audio-suite/page.tsx

'use client';

import AdvancedAudioPlayer from '@/components/Audio/AdvancedAudioPlayer';
import AudioEffectsProcessor from '@/components/Audio/AudioEffectsProcessor';
import AudioLibraryManager from '@/components/Audio/AudioLibraryManager';
import AudioRecorder from '@/components/Audio/AudioRecorderV2';
import AudioStreaming from '@/components/Audio/AudioStreaming';
import AudioWaveform from '@/components/Audio/AudioWaveformV2';
import BasicAudioPlayer from '@/components/Audio/BasicAudioPlayer';
import AudioMixer from '@/components/Audio/SpeechRecognition';
import SpeechToText from '@/components/Audio/SpeechToText';
import TextToSpeech from '@/components/Audio/TextToSpeech';
import { Center, Container, Paper, Stack, Title } from '@mantine/core';

export default function AudioSuitePage() {
    return (
        <Container size="lg">
            <Center>
                <Title order={1} my="xl">Audio Suite</Title>
            </Center>
            <Stack gap="xl">
                <Paper shadow="sm" p="md">
                    <Title order={2}>Basic Audio Player</Title>
                    <BasicAudioPlayer src="/path/to/audio/file.mp3" />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Advanced Audio Player</Title>
                    <AdvancedAudioPlayer src="/path/to/audio/file.mp3" />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Audio Recorder</Title>
                    <AudioRecorder />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Audio Waveform</Title>
                    <AudioWaveform audioUrl="/path/to/audio/file.mp3" width={500} height={100} />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Audio Effects Processor</Title>
                    <AudioEffectsProcessor src="/path/to/audio/file.mp3" />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Text to Speech</Title>
                    <TextToSpeech />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Speech to Text</Title>
                    <SpeechToText />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Audio Mixer</Title>
                    <AudioMixer />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Audio Library Manager</Title>
                    <AudioLibraryManager />
                </Paper>

                <Paper shadow="sm" p="md">
                    <Title order={2}>Audio Streaming</Title>
                    <AudioStreaming />
                </Paper>
            </Stack>
        </Container>
    );
}
