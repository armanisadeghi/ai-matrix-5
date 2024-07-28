'use client';

import React, { useState } from 'react';
import { Select, Button, Group, Text, Stack, Progress } from '@mantine/core';
import { IconFileExport } from '@tabler/icons-react';


interface VideoConverterProps {
    file?: File;
    onConvert?: (convertedFile: File) => void;
}

const VideoConverter: React.FC<VideoConverterProps> = ({file, onConvert}) => {
    const [targetFormat, setTargetFormat] = useState('mp4');
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleConvert = async () => {
        setIsConverting(true);
        setProgress(0);
        // In a real application, you would send the file to a server for conversion
        // Here, we're simulating the conversion process
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 500));
            setProgress(i);
        }

        // Simulate a converted file
        const convertedFile = new File([file], `converted.${targetFormat}`, {type: `video/${targetFormat}`});
        onConvert(convertedFile);
        setIsConverting(false);
    };

    return (
        <Stack gap="md">
            <Text>Convert: {file.name}</Text>
            <Group grow>
                <Select
                    data={[
                        {value: 'mp4', label: 'MP4'},
                        {value: 'webm', label: 'WebM'},
                        {value: 'avi', label: 'AVI'},
                        {value: 'mov', label: 'MOV'},
                    ]}
                    value={targetFormat}
                    onChange={(value) => setTargetFormat(value as string)}
                    label="Target Format"
                />
                <Button
                    leftSection={<IconFileExport size={16}/>}
                    onClick={handleConvert}
                    loading={isConverting}
                >
                    Convert
                </Button>
            </Group>
            {isConverting && (

                <Progress.Section value={progress} color="purple">
                    <Progress.Label>{`${progress}%`}</Progress.Label>
                </Progress.Section>

            )}
        </Stack>
    );
};

export default VideoConverter;
