"use client";

import React, { useState } from "react";
import AmePaper from "@/ui/surfaces/AmePaper";
import { Flex, Grid, PaperProps, Radio } from "@mantine/core";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeText from "@/ui/typography/AmeText";
import { IconTable, IconTableMinus, IconTablePlus } from "@tabler/icons-react";
import AmeRadioCard from "@/ui/radio/AmeRadioCard";

const data = [
    {
        name: "Default",
        icon: IconTable,
    },
    {
        name: "Compact",
        icon: IconTableMinus,
    },
    {
        name: "Comfy",
        icon: IconTablePlus,
    },
];

interface TableSelectionFormProps extends PaperProps {}

export function TableSelectionForm({ ...others }: TableSelectionFormProps) {
    const [tableMode, setTableMode] = useState<string | null>(null);

    const cards = data.map((item) => <AmeRadioCard value={item.name} key={item.name} {...item} />);

    return (
        <AmePaper component="form" py="md" {...others}>
            <Grid align="flex-start" mb="md">
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <AmeTitle as="card-header" mb="md">
                        Table view
                    </AmeTitle>
                    <AmeText size="sm" c="dimmed">
                        Choose how tables are displayed in the app.
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
