"use client";

import AmeTitle from "@/ui/typography/AmeTitle";
import { SimpleGrid } from "@mantine/core";

import { ImageCardButton, type ImageCardButtonProps } from "../../components";

import { MOSAIC_IMAGES } from "@/constants";
import { AmeMosiacGrid } from "@/ui/mosiac-grid/AmeMosiacGrid";
import AmePaper from "@/ui/surfaces/AmePaper";
import AmeText from "@/ui/typography/AmeText";
import AiImg from "public/image-generator/ai-img-generator.jpeg";
import ReimagineImg from "public/image-generator/re-imagine.jpeg";
import RetouchImg from "public/image-generator/retouch.jpeg";
import SketchImg from "public/image-generator/sketch-to-image.webp";

const IMAGE_CARD_BUTTONS: ImageCardButtonProps[] = [
    {
        title: "AI image generator",
        description: "Turn your words into incredible images",
        bgImageUrl: AiImg,
        buttonProps: {
            btnTitle: "Run",
            showBtnIcon: true,
        },
    },
    {
        title: "Re:imagine",
        description: "Discover multiple versions of an image",
        bgImageUrl: ReimagineImg,
        buttonProps: {
            btnTitle: "Run",
            showBtnIcon: true,
        },
    },
    {
        title: "Sketch to image",
        description: "From doodle to whateve you imagine",
        bgImageUrl: SketchImg,
        buttonProps: {
            btnTitle: "Run",
            showBtnIcon: true,
        },
    },
    {
        title: "Retouch",
        description: "Replace details quickly and easily",
        bgImageUrl: RetouchImg,
        buttonProps: {
            btnTitle: "Run",
            showBtnIcon: true,
        },
    },
];

function ImageGeneratorHome() {
    const actionItems = IMAGE_CARD_BUTTONS.map((item) => <ImageCardButton key={item.title} {...item} />);

    return (
        <>
            <AmeTitle as="card-header" mb="md">
                Start creating images
            </AmeTitle>
            <SimpleGrid mb="md" cols={{ base: 1, sm: 1, md: 2, lg: 4 }}>
                {actionItems}
            </SimpleGrid>
            <AmePaper>
                <AmeTitle as="page-header">Get inspired</AmeTitle>
                <AmeText mb="md">Discover thousands of amazing images curated by our community</AmeText>
                <AmeMosiacGrid images={MOSAIC_IMAGES} />
            </AmePaper>
        </>
    );
}

export default ImageGeneratorHome;
