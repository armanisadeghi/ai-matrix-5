'use client';

import React, { useState } from 'react';
import { Button, TextInput, Group } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useFileManager } from '@/hooks/useFileManager';

export default function GoogleSlidesIntegration() {
    const [presentationId, setPresentationId] = useState('');
    const { uploadFile, getFile } = useFileManager();

    const handleImport = async () => {
        // This is a placeholder. In a real scenario, you'd need to implement
        // the Google Slides API integration to fetch the presentation data.
        console.log('Importing presentation:', presentationId);

        // Simulating fetching data from Google Slides, until I help you with the full setup
        const mockSlides = [
            { id: '1', content: 'Imported Slide 1', imageUrl: 'https://example.com/slide1.jpg' },
            { id: '2', content: 'Imported Slide 2', imageUrl: 'https://example.com/slide2.jpg' },
        ];

        // Convert Blob to File before uploading
        const blob = new Blob([JSON.stringify({ slides: mockSlides })], { type: 'application/json' });
        const file = new File([blob], `${presentationId}.json`, { type: 'application/json' });

        // Save the imported slides to our file system
        await uploadFile(file, `presentations/${presentationId}.json`);
    };

    const handleExport = async () => {
        // This is a placeholder. I will help you with this setup, after the basic setup is done.
        try {
            const presentationData = await getFile(`${presentationId}.json`, 'presentations');
            if (presentationData) {
                const parsedData = JSON.parse(presentationData);
                console.log('Exporting to Google Slides:', parsedData);
                // Here you would implement the actual export to Google Slides
            }
        } catch (error) {
            console.error('Error exporting to Google Slides:', error);
        }
    };

    return (
        <Group align="flex-end">
            <TextInput
                label="Google Slides Presentation ID"
                value={presentationId}
                onChange={(event) => setPresentationId(event.currentTarget.value)}
                placeholder="Enter Presentation ID"
            />
            <Button onClick={handleImport} leftSection={<IconBrandGoogle size={14} />}>
                Import from Google Slides
            </Button>
            <Button onClick={handleExport} leftSection={<IconBrandGoogle size={14} />}>
                Export to Google Slides
            </Button>
        </Group>
    );
}
