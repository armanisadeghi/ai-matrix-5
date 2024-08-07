import React, { useState } from 'react';
import { Box, Button, TextInput, Textarea, Group, Stack } from '@mantine/core';
import { IconPlus, IconTrash, IconDeviceFloppy } from '@tabler/icons-react';

interface Slide {
  id: number;
  title: string;
  content: string;
}

interface PowerPointEditorProps {
  initialSlides?: Slide[];
  onSave: (slides: Slide[]) => void;
}

const PowerPointEditor: React.FC<PowerPointEditorProps> = ({ initialSlides = [], onSave }) => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now(),
      title: 'New Slide',
      content: '',
    };
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
  };

  const removeSlide = (id: number) => {
    setSlides(slides.filter(slide => slide.id !== id));
    if (currentSlide >= slides.length - 1) {
      setCurrentSlide(Math.max(0, slides.length - 2));
    }
  };

  const updateSlide = (id: number, field: 'title' | 'content', value: string) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    ));
  };

  const handleSave = () => {
    onSave(slides);
  };

  return (
    <Box>
      <Group position="apart" mb="md">
        <Button leftIcon={<IconPlus size={14} />} onClick={addSlide}>
          Add Slide
        </Button>
        <Button leftIcon={<IconDeviceFloppy size={14} />} onClick={handleSave}>
          Save Presentation
        </Button>
      </Group>
      <Group grow align="flex-start">
        <Stack spacing="xs" style={{ minWidth: '200px' }}>
          {slides.map((slide, index) => (
            <Button
              key={slide.id}
              variant={currentSlide === index ? 'filled' : 'light'}
              onClick={() => setCurrentSlide(index)}
              rightIcon={<IconTrash size={14} onClick={() => removeSlide(slide.id)} />}
            >
              Slide {index + 1}
            </Button>
          ))}
        </Stack>
        {slides[currentSlide] && (
          <Box>
            <TextInput
              label="Slide Title"
              value={slides[currentSlide].title}
              onChange={(e) => updateSlide(slides[currentSlide].id, 'title', e.currentTarget.value)}
              mb="md"
            />
            <Textarea
              label="Slide Content"
              value={slides[currentSlide].content}
              onChange={(e) => updateSlide(slides[currentSlide].id, 'content', e.currentTarget.value)}
              minRows={10}
            />
          </Box>
        )}
      </Group>
    </Box>
  );
};

export default PowerPointEditor;
