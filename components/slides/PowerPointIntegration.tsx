// components/slides/PowerPointIntegration.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button, Group, Text, Progress, Select } from '@mantine/core';
import { IconUpload, IconDownload } from '@tabler/icons-react';
import { useFileManager } from '@/hooks/useFileManager';
import * as PPTX from 'pptxgenjs';

export default function PowerPointIntegration() {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [presentations, setPresentations] = useState<string[]>([]);
    const [selectedPresentation, setSelectedPresentation] = useState<string | null>(null);
    const { uploadFile, getFile, listFiles } = useFileManager();

    useEffect(() => {
        loadPresentations();
    }, []);

    const loadPresentations = async () => {
        const files = await listFiles('presentations');
        setPresentations(files.map(file => file.name));
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadProgress(0);
            const totalSize = file.size;
            const chunkSize = 1024 * 1024; // 1MB chunks
            let uploadedSize = 0;

            for (let start = 0; start < totalSize; start += chunkSize) {
                const chunk = file.slice(start, start + chunkSize);
                await uploadFile(new File([chunk], file.name), 'powerpoint');
                uploadedSize += chunk.size;
                setUploadProgress(Math.round((uploadedSize / totalSize) * 100));
            }

            console.log('Uploaded:', file.name);
            setUploadProgress(0);
            await loadPresentations();
        }
    };

    const handleDownload = async () => {
        if (!selectedPresentation) return;

        setDownloadProgress(0);
        try {
            const presentationData = await getFile(selectedPresentation, 'presentations');
            if (presentationData) {
                const parsedData = JSON.parse(presentationData);
                const pptx = new PPTX.default();

                parsedData.slides.forEach((slide: any) => {
                    const pptxSlide = pptx.addSlide();
                    pptxSlide.addText(slide.content, { x: 1, y: 1, w: '80%', h: 1 });
                    if (slide.imageUrl) {
                        pptxSlide.addImage({ path: slide.imageUrl, x: 1, y: 2, w: 8, h: 3 });
                    }
                });

                const blob = await pptx.writeFile();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = selectedPresentation.replace('.json', '.pptx');
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                setDownloadProgress(100);
            }
        } catch (error) {
            console.error('Error downloading PowerPoint file:', error);
        }
        setDownloadProgress(0);
    };

    return (
        <Group align="flex-end">
            <Button component="label" leftSection={<IconUpload size={14} />}>
                Upload PowerPoint
                <input type="file" accept=".pptx" onChange={handleUpload} style={{ display: 'none' }} />
            </Button>
            {uploadProgress > 0 && <Progress value={uploadProgress} size="sm" w={100} />}

            <Select
                label="Select Presentation"
                placeholder="Choose a presentation"
                data={presentations}
                value={selectedPresentation}
                onChange={setSelectedPresentation}
            />

            <Button onClick={handleDownload} leftSection={<IconDownload size={14} />} disabled={!selectedPresentation}>
                Download as PowerPoint
            </Button>
            {downloadProgress > 0 && <Progress value={downloadProgress} size="sm" w={100} />}
        </Group>
    );
}
