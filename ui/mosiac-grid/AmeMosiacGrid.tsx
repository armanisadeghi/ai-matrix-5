"use client";

import { IMosaicImage, PHOTOS } from "@/constants";
import { Center, Image } from "@mantine/core";
import { useCallback, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Modal, rem } from "@mantine/core";
import Gallery from "react-photo-gallery";

import { CustomImage, ICustomImage } from "./CustomImage";

export type AmeMosiacGridProps = {
    images: IMosaicImage[];
};

export function AmeMosiacGrid({ images }: AmeMosiacGridProps) {
    const [currentImage, setCurrentImage] = useState<ICustomImage>();
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((_event, { photo }) => {
        setCurrentImage(photo);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setViewerIsOpen(false);
        setCurrentImage(undefined);
    };

    const imageRenderer = useCallback(
        ({ index, left, top, photo }: { index: any; left?: any; top?: any; photo: any }) => {
            return (
                <CustomImage
                    selected={false}
                    margin="2px"
                    index={index}
                    photo={photo}
                    left={left}
                    top={top}
                    direction="column"
                    onClick={() => {
                        openLightbox({}, { photo });
                    }}
                />
            );
        },
        [],
    );

    return (
        <>
            <Gallery photos={images} direction={"column"} onClick={openLightbox} renderImage={imageRenderer} />

            <Modal
                opened={viewerIsOpen}
                padding={0}
                transitionProps={{ transition: "fade", duration: 200 }}
                withCloseButton={false}
                onClose={() => setViewerIsOpen(false)}
                size="lg"
                centered
            >
                <Carousel loop>
                    <Carousel.Slide>
                        <Center>
                            <Image
                                src={currentImage?.src}
                                alt={currentImage?.src}
                                style={{ height: rem(600), width: rem(600), objectFit: "cover" }}
                            />
                        </Center>
                    </Carousel.Slide>
                    {images
                        .filter((item) => item.src !== currentImage?.src)
                        .map((item) => (
                            <Carousel.Slide>
                                <Center>
                                    <img
                                        src={item.src}
                                        alt="Cat"
                                        style={{ height: rem(600), width: rem(600), objectFit: "cover" }}
                                    />
                                </Center>
                            </Carousel.Slide>
                        ))}
                </Carousel>
            </Modal>
        </>
    );
}
