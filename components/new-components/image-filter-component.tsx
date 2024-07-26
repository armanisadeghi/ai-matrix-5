import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Group, Select, Slider, Stack } from '@mantine/core';

interface ImageFilterProps {
  src: string;
  onSave: (filteredImage: string) => void;
}

const filters = [
  { value: 'none', label: 'None' },
  { value: 'grayscale', label: 'Grayscale' },
  { value: 'sepia', label: 'Sepia' },
  { value: 'invert', label: 'Invert' },
  { value: 'brightness', label: 'Brightness' },
  { value: 'contrast', label: 'Contrast' },
  { value: 'saturate', label: 'Saturate' },
];

const ImageFilter: React.FC<ImageFilterProps> = ({ src, onSave }) => {
  const [filter, setFilter] = useState('none');
  const [intensity, setIntensity] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (image && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        applyFilter(ctx);
      }
    }
  }, [filter, intensity]);

  const applyFilter = (ctx: CanvasRenderingContext2D) => {
    const image = imageRef.current;
    if (!image) return;

    ctx.filter = 'none';
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);

    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;

    switch (filter) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        break;
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        }
        break;
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        break;
      case 'brightness':
      case 'contrast':
      case 'saturate':
        ctx.filter = `${filter}(${intensity}%)`;
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
        return;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleSave = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL('image/jpeg'));
    }
  };

  return (
    <Stack gap="md">
      <Box style={{ maxWidth: '100%', maxHeight: '400px', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '400px' }} />
        <img ref={imageRef} src={src} alt="Original" style={{ display: 'none' }} />
      </Box>
      <Group grow>
        <Select
          data={filters}
          value={filter}
          onChange={(value) => setFilter(value || 'none')}
          label="Filter"
        />
        {['brightness', 'contrast', 'saturate'].includes(filter) && (
          <Slider
            label="Intensity"
            value={intensity}
            onChange={setIntensity}
            min={0}
            max={200}
            step={1}
          />
        )}
      </Group>
      <Button onClick={handleSave}>Apply Filter</Button>
    </Stack>
  );
};

export default ImageFilter;
