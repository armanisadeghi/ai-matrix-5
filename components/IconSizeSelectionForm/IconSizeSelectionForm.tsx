"use client";

import React from "react";
import AmePaper from "@/ui/surfaces/AmePaper";
import { Flex, Grid, PaperProps, Radio } from "@mantine/core";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeText from "@/ui/typography/AmeText";
import { IconTable, IconTableMinus, IconTablePlus } from "@tabler/icons-react";
import AmeRadioCard from "@/ui/radio/AmeRadioCard";
import { useRecoilState } from "recoil";
import { iconSizesAtom } from "@/state/IconAtoms";
import useToggleIconSizes from "@/hooks/layout/useToggleIconSizes";

const data = [
    {
        name: "Large",
        icon: IconTable,
        actualSize: 24,
    },
    {
        name: "Medium",
        icon: IconTableMinus,
        actualSize: 20,
    },
    {
        name: "Small",
        icon: IconTablePlus,
        actualSize: 16,
    },
];

interface IconSizeSelectionForm extends PaperProps {}

export function IconSizeSelectionForm({ ...others }: IconSizeSelectionForm) {
    const [iconSize] = useRecoilState(iconSizesAtom);
    const { toggleIconSize } = useToggleIconSizes();

    const cards = data.map((item) => (
        <AmeRadioCard
            value={item.name}
            key={item.name}
            onClick={() => toggleIconSize(item.actualSize)}
            checked={item.actualSize === iconSize}
            {...item}
        />
    ));

    return (
        <AmePaper component="form" py="md" {...others}>
            <Grid align="flex-start" mb="md">
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <AmeTitle as="card-header" mb="md">
                        Icon sizes
                    </AmeTitle>
                    <AmeText size="sm" c="dimmed">
                        Choose how icons are displayed in the app.
                    </AmeText>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 9 }}>
                    <Radio.Group>
                        <Flex gap="xs">{cards}</Flex>
                    </Radio.Group>
                </Grid.Col>
            </Grid>
        </AmePaper>
    );
}
