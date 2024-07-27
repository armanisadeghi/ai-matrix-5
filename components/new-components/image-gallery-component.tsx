import React, { useState } from 'react';
import { SimpleGrid, Image, Modal, Group, ActionIcon } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconX } from '@tabler/icons-react';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [opened, setOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpened(true);
  };

  const closeLightbox = () => {
    setOpened(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 3 },
          { maxWidth: 'sm', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            fit="cover"
            height={200}
            radius="md"
            onClick={() => openLightbox(index)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={closeLightbox}
        size="xl"
        padding={0}
        withCloseButton={false}
        centered
      >
        <Group position="center" spacing="xl" sx={{ position: 'relative' }}>
          <ActionIcon
            onClick={goToPrevious}
            size="lg"
            variant="filled"
            sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fit="contain"
            height="80vh"
          />
          <ActionIcon
            onClick={goToNext}
            size="lg"
            variant="filled"
            sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
          >
            <IconArrowRight size={20} />
          </ActionIcon>
          <ActionIcon
            onClick={closeLightbox}
            size="lg"
            variant="filled"
            sx={{ position: 'absolute', right: 10, top: 10 }}
          >
            <IconX size={20} />
          </ActionIcon>
        </Group>
      </Modal>
    </>
  );
};

export default ImageGallery;
