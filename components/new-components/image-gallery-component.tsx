import { ActionIcon, Group, Image, Modal, SimpleGrid } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

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
                cols={{
                    base: 3,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                }}
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
                        style={{ cursor: "pointer" }}
                    />
                ))}
            </SimpleGrid>

            <Modal opened={opened} onClose={closeLightbox} size="xl" padding={0} withCloseButton={false} centered>
                <Group align="center" gap="xl" style={{ position: "relative" }}>
                    <ActionIcon
                        onClick={goToPrevious}
                        size="lg"
                        variant="filled"
                        style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
                    >
                        <IconArrowLeft size={20} />
                    </ActionIcon>
                    <Image src={images[currentIndex].src} alt={images[currentIndex].alt} fit="contain" height="80vh" />
                    <ActionIcon
                        onClick={goToNext}
                        size="lg"
                        variant="filled"
                        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}
                    >
                        <IconArrowRight size={20} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={closeLightbox}
                        size="lg"
                        variant="filled"
                        style={{ position: "absolute", right: 10, top: 10 }}
                    >
                        <IconX size={20} />
                    </ActionIcon>
                </Group>
            </Modal>
        </>
    );
};

export default ImageGallery;
