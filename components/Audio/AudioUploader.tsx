'use client';

import React, { useState, useRef } from 'react';
import { Button, Text, Stack } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

const AudioUploader: React.FC = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAudioFile(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Stack align="center" gap="md">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="audio/*"
                style={{ display: 'none' }}
            />
            <Button
                onClick={triggerFileInput}
                leftSection={<IconUpload size={18} />}
                size="sm"
            >
                Upload Audio
            </Button>
            {audioFile && (
                <Stack gap="xs">
                    <Text>File: {audioFile.name}</Text>
                    <audio controls src={URL.createObjectURL(audioFile)} />
                </Stack>
            )}
        </Stack>
    );
};

export default AudioUploader;
