// components/slides/SlideEditor.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Textarea, Button, Group, Stack, TextInput, Select, FileInput, rem } from '@mantine/core';
import { useFileManager } from '@/hooks/useFileManager';
import { IconUpload } from '@tabler/icons-react';

interface Slide {
    id: string;
    content: string;
    imageUrl?: string;
}

export default function SlideEditor() {
    const [presentations, setPresentations] = useState<string[]>([]);
    const [selectedPresentation, setSelectedPresentation] = useState<string | null>(null);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [newPresentationName, setNewPresentationName] = useState('');
    const { listFiles, getFile, uploadFile, updateFile } = useFileManager();
    const icon = <IconUpload style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

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
                setCurrentSlideIndex(0);
            }
        } catch (error) {
            console.error('Error loading presentation:', error);
        }
    };

    const handleSave = async () => {
        if (!selectedPresentation) return;
        try {
            const blob = new Blob([JSON.stringify({ slides })], { type: 'application/json' });
            const file = new File([blob], selectedPresentation, { type: 'application/json' });
            await updateFile(selectedPresentation, file, 'presentations');
        } catch (error) {
            console.error('Error saving presentation:', error);
        }
    };

    const handleSlideChange = (field: keyof Slide, value: string) => {
        setSlides(prevSlides => {
            const newSlides = [...prevSlides];
            newSlides[currentSlideIndex] = {...newSlides[currentSlideIndex], [field]: value};
            return newSlides;
        });
    };

    const addNewSlide = () => {
        setSlides(prevSlides => [...prevSlides, {id: Date.now().toString(), content: '', imageUrl: ''}]);
        setCurrentSlideIndex(slides.length);
    };

    const createNewPresentation = async () => {
        if (!newPresentationName) return;
        const newPresentation = {
            slides: [{id: '1', content: 'New Slide', imageUrl: ''}]
        };
        const blob = new Blob([JSON.stringify(newPresentation)], { type: 'application/json' });
        const file = new File([blob], `${newPresentationName}.json`, { type: 'application/json' });
        await uploadFile(file, 'presentations');
        await loadPresentations();
        setSelectedPresentation(`${newPresentationName}.json`);
        setNewPresentationName('');
    };

    const handleImageUpload = async (file: File | null) => {
        if (!file) return;
        try {
            await uploadFile(file, 'images');
            const imageUrl = `/api/images/${file.name}`; // Adjust this URL based on your API setup
            handleSlideChange('imageUrl', imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
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
                <Group>
                    <TextInput
                        placeholder="New Presentation Name"
                        value={newPresentationName}
                        onChange={(event) => setNewPresentationName(event.currentTarget.value)}
                    />
                    <Button onClick={createNewPresentation}>Create New Presentation</Button>
                </Group>
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
            <Select
                label="Select Slide"
                value={currentSlideIndex.toString()}
                onChange={(value) => setCurrentSlideIndex(Number(value))}
                data={slides.map((_, index) => ({value: index.toString(), label: `Slide ${index + 1}`}))}
            />
            <Textarea
                label="Slide Content"
                value={slides[currentSlideIndex].content}
                onChange={(event) => handleSlideChange('content', event.currentTarget.value)}
                minRows={4}
            />
            <FileInput
                label="Upload Image"
                placeholder="Choose image"
                accept="image/*"
                leftSection={icon}
                leftSectionPointerEvents="none"
                onChange={handleImageUpload}
            />
            <Group>
                <Button onClick={handleSave}>Save Presentation</Button>
                <Button onClick={addNewSlide}>Add New Slide</Button>
            </Group>
        </Stack>
    );
}
