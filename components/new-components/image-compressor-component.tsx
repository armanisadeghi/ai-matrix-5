import React, { useState, useRef } from 'react';
import { Button, Group, Slider, Text, Stack } from '@mantine/core';

interface ImageCompressorProps {
  file: File;
  onCompress: (compressedFile: File) => void;
}

const ImageCompressor: React.FC<ImageCompressorProps> = ({ file, onCompress }) => {
  const [quality, setQuality] = useState(0.8);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const compressImage = () => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Maintain aspect ratio
        const scaleFactor = Math.min(1, 1200 / Math.max(img.width, img.height));
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              setCompressedSize(compressedFile.size);
              onCompress(compressedFile);
            }
          },
          'image/jpeg',
          quality
        );
      };
    };
  };

  return (
    <Stack gap="md">
      <Text>Original Size: {(file.size / 1024 / 1024).toFixed(2)} MB</Text>
      {compressedSize && (
        <Text>Compressed Size: {(compressedSize / 1024 / 1024).toFixed(2)} MB</Text>
      )}
      <Slider
        label={(value) => `Quality: ${value}`}
        value={quality}
        onChange={setQuality}
        min={0.1}
        max={1}
        step={0.1}
      />
      <Button onClick={compressImage}>Compress Image</Button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Stack>
  );
};

export default ImageCompressor;
