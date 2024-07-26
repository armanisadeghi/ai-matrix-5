// components/slides/ImageGallery.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { SimpleGrid, Image, Text, Button } from '@mantine/core';

interface ImageItem {
    id: string;
    url: string;
    title: string;
}

export default function ImageGallery() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            // Replace this with actual API call to fetch free images
            const response = await fetch('https://api.unsplash.com/photos/random?count=9', {
                headers: {
                    Authorization: 'Client-ID YOUR_UNSPLASH_ACCESS_KEY'
                }
            });
            const data = await response.json();
            setImages(data.map((item: any) => ({
                id: item.id,
                url: item.urls.small,
                title: item.alt_description || 'Untitled'
            })));
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={fetchImages} mb="md" loading={loading}>
                Refresh Images
            </Button>
            <SimpleGrid cols={3} spacing="md">
                {images.map((image) => (
                    <div key={image.id}>
                        <Image src={image.url} alt={image.title} />
                        <Text size="sm" mt="xs">{image.title}</Text>
                    </div>
                ))}
            </SimpleGrid>
        </div>
    );
}
