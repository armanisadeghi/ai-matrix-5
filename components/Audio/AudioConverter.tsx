'use client';

import React, { useState } from 'react';
import { Select, Button, Group, Text, Stack } from '@mantine/core';
import { IconFileExport } from '@tabler/icons-react';

interface AudioConverterProps {
    file: File;
    onConvert: (convertedFile: File) => void;
}

const AudioConverter: React.FC<AudioConverterProps> = ({ file, onConvert }) => {
    const [targetFormat, setTargetFormat] = useState('mp3');
    const [isConverting, setIsConverting] = useState(false);

    const handleConvert = async () => {
        setIsConverting(true);
        // In a real application, you would send the file to a server for conversion
        // Here, we're simulating the conversion process
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate a converted file
        const convertedFile = new File([file], `converted.${targetFormat}`, { type: `audio/${targetFormat}` });
        onConvert(convertedFile);
        setIsConverting(false);
    };

    return (
        <Stack gap="md">
            <Text>Convert: {file.name}</Text>
            <Group grow>
                <Select
                    data={[
                        { value: 'mp3', label: 'MP3' },
                        { value: 'wav', label: 'WAV' },
                        { value: 'ogg', label: 'OGG' },
                        { value: 'flac', label: 'FLAC' },
                    ]}
                    value={targetFormat}
                    onChange={(value) => setTargetFormat(value as string)}
                    label="Target Format"
                />
                <Button
                    leftSection={<IconFileExport size={16} />}
                    onClick={handleConvert}
                    loading={isConverting}
                >
                    Convert
                </Button>
            </Group>
        </Stack>
    );
};

export default AudioConverter;

