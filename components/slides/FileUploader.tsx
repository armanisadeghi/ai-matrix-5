// components/slides/FileUploader.tsx

'use client';

import React, { useState } from 'react';
import { Group, Text, useMantineTheme, rem, TextInput } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconX, IconFile } from '@tabler/icons-react';
import { useFileManager } from '@/hooks/useFileManager';
import { useMantineColorScheme } from '@mantine/core'; // Import the hook

export default function FileUploader() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme(); // Proper Usage of colorScheme
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [currentPath, setCurrentPath] = useState('');
    const { uploadFile } = useFileManager();

    const handleDrop = async (acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
        for (const file of acceptedFiles) {
            try {
                await uploadFile(file, currentPath);
                console.log('File uploaded:', file.name);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <>
            <TextInput
                label="Upload Path"
                value={currentPath}
                onChange={(event) => setCurrentPath(event.currentTarget.value)}
                placeholder="e.g., presentations/myproject"
            />
            <Dropzone
                onDrop={handleDrop}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={['image/*', 'application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']}
            >
                <Group justify="center" gap="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: theme.colors[theme.primaryColor][colorScheme === 'dark' ? 6 : 4] }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: theme.colors.red[colorScheme === 'dark' ? 6 : 4] }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconFile style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag files here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        </>
    );
}
