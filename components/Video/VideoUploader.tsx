'use client';

import React, { useState, useRef } from 'react';
import { Button, Text, Group, Stack, Progress } from '@mantine/core';
import { IconUpload, IconX } from '@tabler/icons-react';


interface VideoUploaderProps {
    onUpload: (file: File) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({onUpload}) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith('video/')) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = () => {
        if (file) {
            // Simulating upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    onUpload(file);
                }
            }, 500);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Stack gap="md">
            <Group justify="center" gap="xl" style={{minHeight: 220, pointerEvents: 'none'}}>
                {preview ? (
                    <video src={preview} style={{maxWidth: '100%', maxHeight: 200}} controls/>
                ) : (
                    <IconUpload size={80} stroke={1.5}/>
                )}
            </Group>
            <input
                type="file"
                onChange={handleFileChange}
                accept="video/*"
                style={{display: 'none'}}
                ref={fileInputRef}
            />
            {!file ? (
                <Button onClick={() => fileInputRef.current?.click()}>Select Video</Button>
            ) : (
                <Stack gap="xs">
                    <Text size="sm" ta="center" fw={500} mt="xl">
                        {file.name}
                    </Text>
                    <Group ta="center" mt="md">
                        <Button onClick={handleUpload} disabled={uploadProgress > 0}>
                            Upload
                        </Button>
                        <Button onClick={handleRemove} color="red">
                            <IconX size={18}/>
                        </Button>
                    </Group>
                </Stack>
            )}
            {uploadProgress > 0 && (
                <Progress.Section value={uploadProgress} color="purple">
                    <Progress.Label>{`${uploadProgress}%`}</Progress.Label>
                </Progress.Section>
            )}
        </Stack>
    );
};

export default VideoUploader;
