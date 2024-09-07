"use client";

import { MOSAIC_IMAGES } from "@/constants";
import AmeButton from "@/ui/buttons/AmeButton";
import AmeSearchInput from "@/ui/input/AmeSearchInput";
import { AmeMosiacGrid } from "@/ui/mosiac-grid/AmeMosiacGrid";
import AmeSelect from "@/ui/select/AmeSelect/AmeSelect";
import AmeText from "@/ui/typography/AmeText";
import { Box, Chip, Flex, Group } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { useState } from "react";

export default function ImageGeneratorExplore() {
    const [popular, setPopular] = useState<string | null>("");
    const [category, setCategory] = useState<string | null>("");

    return (
        <>
            <Flex align="center" justify="space-between" gap="sm" mb="md">
                <AmeSearchInput height="100%" size="sm" />
                <Flex align="center" gap="sm">
                    <AmeSelect
                        label=""
                        placeholder="popular"
                        value={popular}
                        data={["popular", "following"]}
                        onChange={setPopular}
                    />
                    <AmeSelect
                        label=""
                        placeholder="all categories"
                        value={category}
                        data={["all categories", "travel"]}
                        onChange={setCategory}
                    />
                    <AmeButton title="Filters button" leftSection={<IconFilter />}>
                        Filter
                    </AmeButton>
                </Flex>
            </Flex>
            <Flex gap="sm" align="center" my="md">
                <AmeText>Suggested search:</AmeText>
                <Flex gap="xs">
                    <Chip>Cartoon</Chip>
                    <Chip>Pixed Art</Chip>
                    <Chip>Wallpaper</Chip>
                    <Chip>Anime</Chip>
                </Flex>
            </Flex>
            <Box>
                <AmeMosiacGrid images={MOSAIC_IMAGES} />
            </Box>
        </>
    );
}