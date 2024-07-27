// components/slides/PresentationMode.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button, Modal, Group, Text, Stack } from '@mantine/core';
import { IconPresentation, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useFileManager } from '@/hooks/useFileManager';

interface Slide {
    id: string;
    content: string;
    imageUrl?: string;
}

interface PresentationModeProps {
  presentationId: string;
}

export default function PresentationMode({ presentationId }: PresentationModeProps) {
    const [isPresenting, setIsPresenting] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
  const { getFile } = useFileManager();

  useEffect(() => {
    loadPresentation();
  }, [presentationId]);

  const loadPresentation = async () => {
    try {
      const presentationData = await getFile(`${presentationId}.json`, 'presentations');
      if (presentationData) {
        const parsedData = JSON.parse(presentationData);
        setSlides(parsedData.slides);
      }
    } catch (error) {
      console.error('Error loading presentation:', error);
    }
  };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (isPresenting) {
                if (event.key === 'ArrowRight') {
                    nextSlide();
                } else if (event.key === 'ArrowLeft') {
                    prevSlide();
                } else if (event.key === 'Escape') {
                    setIsPresenting(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isPresenting, currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <>
            <Button onClick={() => setIsPresenting(true)} leftSection={<IconPresentation size={14}/>}>
                Start Presentation
            </Button>

            <Modal
                opened={isPresenting}
                onClose={() => setIsPresenting(false)}
                size="xl"
                fullScreen
            >
                <Stack justify="center" align="center" style={{height: '100vh'}}>
                    {slides[currentSlide]?.imageUrl && (
                        <img src={slides[currentSlide].imageUrl} alt={`Slide ${currentSlide + 1}`} style={{maxWidth: '80%', maxHeight: '60%', objectFit: 'contain'}}/>
                    )}
                    <Text size="xl" mt="xl">{slides[currentSlide]?.content}</Text>
                    <Group justify="space-between" style={{width: '100%', padding: '0 20px'}}>
                        <Button onClick={prevSlide} leftSection={<IconChevronLeft size={14}/>}>Previous</Button>
                        <Text>Slide {currentSlide + 1} of {slides.length}</Text>
                        <Button onClick={nextSlide} leftSection={<IconChevronRight size={14}/>}>Next</Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}
