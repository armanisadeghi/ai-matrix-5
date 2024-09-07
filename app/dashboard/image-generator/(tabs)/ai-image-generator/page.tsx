"use client";

import { Divider, Grid, rem, SimpleGrid, Stack, Tabs } from "@mantine/core";
import { IconHistory, IconSparkles, IconWand } from "@tabler/icons-react";

import AmeButton from "@/ui/buttons/AmeButton";
import AmeText from "@/ui/typography/AmeText";
import AmeTitle from "@/ui/typography/AmeTitle";
import { ImageCardButton, ImageCardButtonProps } from "../../components";
import PromptTextArea from "../../components/PromptTextArea/PromptTextArea";

const IMAGE_CARD_BUTTONS: ImageCardButtonProps[] = [
    {
        title: "Cozy room",
        bgImageUrl: "https://pikaso.cdnpk.net/public/media/tti-examples/01.jpg",
        buttonProps: {
            btnTitle: "Use this prompt",
        },
    },
    {
        title: "Re:imagine",
        bgImageUrl: "https://pikaso.cdnpk.net/public/media/tti-examples/17.jpg",
        buttonProps: {
            btnTitle: "Use this prompt",
        },
    },
    {
        title: "Pink cave",
        bgImageUrl: "https://pikaso.cdnpk.net/public/media/tti-examples/11.jpg",
        buttonProps: {
            btnTitle: "Use this prompt",
        },
    },
    {
        title: "Foggy cyberpunk",
        bgImageUrl: "https://pikaso.cdnpk.net/public/media/tti-examples/03.jpg",
        buttonProps: {
            btnTitle: "Use this prompt",
        },
    },
    {
        title: "Dreamy bloom",
        bgImageUrl: "https://pikaso.cdnpk.net/public/media/tti-examples/14.jpg",
        buttonProps: {
            btnTitle: "Use this prompt",
        },
    },
    {
        title: "Fashion editorial",
        bgImageUrl: "https://pikaso.cdnpk.net/public/media/tti-examples/42.jpg",
        buttonProps: {
            btnTitle: "Use this prompt",
        },
    },
];

const iconStyle = { width: rem(16), height: rem(16) };

export default function ImageGeneratorChat() {
    const sampleCreations = IMAGE_CARD_BUTTONS.map((item) => <ImageCardButton key={item.title} {...item} />);

    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 7 }}>
                    <Stack justify="space-between" style={{ height: "90dvh" }}>
                        <Stack gap="xs">
                            <AmeTitle as="page-header">Unlock your AI Art creation with AI Matrix</AmeTitle>
                            <AmeText>Create imaginative and visually stunning images.</AmeText>
                        </Stack>
                        <Stack>
                            <PromptTextArea />
                            <Divider />
                            <AmeButton
                                title="generate ai image"
                                leftSection={<IconWand size={18} />}
                                primary
                                w="fit-content"
                            >
                                Generate
                            </AmeButton>
                        </Stack>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
                    <Tabs defaultValue="creations">
                        <Tabs.List justify="center" mb="md">
                            <Tabs.Tab value="creations" leftSection={<IconSparkles style={iconStyle} />}>
                                Creations
                            </Tabs.Tab>
                            <Tabs.Tab value="history" leftSection={<IconHistory style={iconStyle} />}>
                                History
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="creations">
                            <SimpleGrid cols={{ base: 1, lg: 2 }}>{sampleCreations}</SimpleGrid>
                        </Tabs.Panel>
                        <Tabs.Panel value="history">
                            <Stack>
                                <IconHistory />
                                <AmeTitle>History</AmeTitle>
                                <AmeText>All your generated images will be here</AmeText>
                            </Stack>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </>
    );
}
