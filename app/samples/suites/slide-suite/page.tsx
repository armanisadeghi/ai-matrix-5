// app/samples/slide-suite/page.tsx

'use client';

import React, { useState } from 'react';
import { Container, Title, Paper, Stack, Tabs } from '@mantine/core';
import SlideViewer from '@/components/slides/SlideViewer';
import SlideEditor from '@/components/slides/SlideEditor';
import PowerPointIntegration from '@/components/slides/PowerPointIntegration';
import GoogleSlidesIntegration from '@/components/slides/GoogleSlidesIntegration';
import ImageGallery from '@/components/slides/ImageGallery';
import TemplateLibrary from '@/components/slides/TemplateLibrary';
import FileUploader from '@/components/slides/FileUploader';
import SlideSync from '@/components/slides/SlideSync';
import PresentationMode from '@/components/slides/PresentationMode';
import CollaborationTool from '@/components/slides/CollaborationTool';

const initialSlides = [
    { id: '1', content: 'Welcome to our presentation', imageUrl: 'https://example.com/slide1.jpg' },
    { id: '2', content: 'Key points of discussion', imageUrl: 'https://example.com/slide2.jpg' },
    { id: '3', content: 'Conclusion and next steps', imageUrl: 'https://example.com/slide3.jpg' },
];

export default function SlideSuitePage() {
    const [slides, setSlides] = useState(initialSlides);

    const handleSaveSlide = (updatedSlide: any) => {
        setSlides(slides.map(slide =>
            slide.id === updatedSlide.id ? updatedSlide : slide
        ));
    };

    return (
        <Container size="xl">
            <Title order={1} my="xl">Slide Suite</Title>
            <Tabs defaultValue="viewer">
                <Tabs.List>
                    <Tabs.Tab value="viewer">Viewer</Tabs.Tab>
                    <Tabs.Tab value="editor">Editor</Tabs.Tab>
                    <Tabs.Tab value="integrations">Integrations</Tabs.Tab>
                    <Tabs.Tab value="resources">Resources</Tabs.Tab>
                    <Tabs.Tab value="tools">Tools</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="viewer">
                    <Paper shadow="sm" p="md" mt="md">
                        <SlideViewer slides={slides} />
                    </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="editor">
                    <Paper shadow="sm" p="md" mt="md">
                        <SlideEditor slide={slides[0]} onSave={handleSaveSlide} />
                    </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="integrations">
                    <Stack mt="md">
                        <Paper shadow="sm" p="md">
                            <Title order={3}>PowerPoint Integration</Title>
                            <PowerPointIntegration />
                        </Paper>
                        <Paper shadow="sm" p="md">
                            <Title order={3}>Google Slides Integration</Title>
                            <GoogleSlidesIntegration />
                        </Paper>
                    </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="resources">
                    <Stack mt="md">
                        <Paper shadow="sm" p="md">
                            <Title order={3}>Image Gallery</Title>
                            <ImageGallery />
                        </Paper>
                        <Paper shadow="sm" p="md">
                            <Title order={3}>Template Library</Title>
                            <TemplateLibrary />
                        </Paper>
                    </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="tools">
                    <Stack mt="md">
                        <Paper shadow="sm" p="md">
                            <Title order={3}>File Uploader</Title>
                            <FileUploader />
                        </Paper>
                        <Paper shadow="sm" p="md">
                            <Title order={3}>Slide Sync</Title>
                            <SlideSync />
                        </Paper>
                        <Paper shadow="sm" p="md">
                            <Title order={3}>Presentation Mode</Title>
                            <PresentationMode slides={slides} />
                        </Paper>
                        <Paper shadow="sm" p="md">
                            <Title order={3}>Collaboration Tool</Title>
                            <CollaborationTool />
                        </Paper>
                    </Stack>
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
}
