// components/TableSelectionForm/TableSelectionFormClient.tsx

"use client";

import AmeRadioCard from "@/ui/radio/AmeRadioCard";
import AmeText from "@/ui/typography/AmeText";
import AmeTitle from "@/ui/typography/AmeTitle";
import { Flex, Grid, Radio } from "@mantine/core";
import { IconTable, IconTableMinus, IconTablePlus } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";

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
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <AmeTitle as="card-header" mb="md">
                    Table view
                </AmeTitle>
                <AmeText size="sm" c="dimmed">
                    Choose how tables are displayed in the app.
                </AmeText>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 9 }}>
                <Radio.Group value={tableMode} onChange={setTableMode}>
                    <Flex gap="xs">{cards}</Flex>
                </Radio.Group>
            </Grid.Col>
        </Grid>
    );
});
