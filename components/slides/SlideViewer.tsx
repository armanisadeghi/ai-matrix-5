// components/slides/SlideViewer.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Button, Group, Stack, Select } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useFileManager } from '@/hooks/useFileManager';

interface Slide {
    id: string;
    content: string;
    imageUrl?: string;
}

export default function SlideViewer() {
    const [presentations, setPresentations] = useState<string[]>([]);
    const [selectedPresentation, setSelectedPresentation] = useState<string | null>(null);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { listFiles, getFile } = useFileManager();

    useEffect(() => {
        loadPresentations();
    }, []);

    useEffect(() => {
        if (selectedPresentation) {
            loadPresentation(selectedPresentation);
        }
    }, [selectedPresentation]);

    const loadPresentations = async () => {
        const files = await listFiles('presentations');
        setPresentations(files.map(file => file.name));
    };

    const loadPresentation = async (presentationName: string) => {
        try {
            const presentationData = await getFile(presentationName, 'presentations');
            if (presentationData) {
                const parsedData = JSON.parse(presentationData);
                setSlides(parsedData.slides);
                setCurrentSlide(0);
            }
        } catch (error) {
            console.error('Error loading presentation:', error);
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (slides.length === 0) {
        return (
            <Stack>
                <Select
                    label="Select Presentation"
                    placeholder="Choose a presentation"
                    data={presentations}
                    value={selectedPresentation}
                    onChange={setSelectedPresentation}
                />
                <Text>No slides available. Please select a presentation.</Text>
            </Stack>
        );
    }

    return (
        <Stack>
            <Select
                label="Select Presentation"
                placeholder="Choose a presentation"
                data={presentations}
                value={selectedPresentation}
                onChange={setSelectedPresentation}
            />
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                {slides[currentSlide].imageUrl && (
                    <Card.Section>
                        <Image
                            src={slides[currentSlide].imageUrl}
                            height={200}
                            alt={`Slide ${currentSlide + 1}`}
                        />
                    </Card.Section>
                )}
                <Text mt="md" mb="xs" size="lg">
                    {slides[currentSlide].content}
                </Text>
            </Card>
            <Group justify="space-between">
                <Button onClick={prevSlide} leftSection={<IconChevronLeft size={14} />}>
                    Previous
                </Button>
                <Text>Slide {currentSlide + 1} of {slides.length}</Text>
                <Button onClick={nextSlide} rightSection={<IconChevronRight size={14} />}>
                    Next
                </Button>
            </Group>
        </Stack>
    );
}
