// components/TableSelectionForm/TableSelectionFormClient.tsx

'use client';

import React, { useState, useMemo } from "react";
import { Flex, Grid, Radio } from "@mantine/core";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeText from "@/ui/typography/AmeText";
import { IconTable, IconTableMinus, IconTablePlus } from "@tabler/icons-react";
import AmeRadioCard from "@/ui/radio/AmeRadioCard";

const data = [
    { name: "Default", icon: IconTable },
    { name: "Compact", icon: IconTableMinus },
    { name: "Comfy", icon: IconTablePlus },
];

export const TableSelectionFormClient = React.memo(function TableSelectionFormClient() {
    const [tableMode, setTableMode] = useState<string | null>(null);

    const cards = useMemo(() => {
        return data.map((item) => <AmeRadioCard value={item.name} key={item.name} {...item} />);
    }, []);

    return (
        <Grid align="flex-start" mb="md">
            <Grid.Col span={{ base: 12, md: 6, lg: 4,xl: 3 }}>
                <AmeTitle as="card-header" mb="md">
                    Table view
                </AmeTitle>
                <AmeText size="sm" c="dimmed">
                    Choose how tables are displayed in the app.
                </AmeText>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 8,xl: 3 }}>
                <Radio.Group value={tableMode} onChange={setTableMode}>
                    <Flex gap="xs">{cards}</Flex>
                </Radio.Group>
            </Grid.Col>
        </Grid>
    );
});
