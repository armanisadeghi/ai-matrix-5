import React, { useState } from "react";
import { Flex, Paper, PaperProps, Radio, rem } from "@mantine/core";
import { IconDeviceDesktop, IconDeviceFloppy, IconMoon, IconSun } from "@tabler/icons-react";
import AmeRadioCard from "@/ui/radio/AmeRadioCard";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeButton from "@/ui/buttons/AmeButton";

const data = [
    {
        name: "Light mode",
        icon: IconSun,
    },
    {
        name: "Dark mode",
        icon: IconMoon,
    },
    {
        name: "System default",
        icon: IconDeviceDesktop,
    },
];

interface ThemeSelectionCardProps extends PaperProps {}

export function ThemeSelectionCard({ ...others }: ThemeSelectionCardProps) {
    const [colorMode, setColorMode] = useState<string | null>(null);

    const cards = data.map((item) => <AmeRadioCard value={item.name} key={item.name} {...item} />);

    return (
        <Paper component="form" p="md" withBorder mb="md" {...others}>
            <AmeTitle as="card-header" mb="md">
                Color Mode
            </AmeTitle>
            <Radio.Group
                value={colorMode}
                onChange={setColorMode}
                label="Choose if app's appearance should be light or dark, or follow your computer's settings."
            >
                <Flex gap="xs" mt="md">
                    {cards}
                </Flex>
            </Radio.Group>
            <AmeButton
                type="submit"
                mt="md"
                leftSection={<IconDeviceFloppy style={{ height: rem(18), width: rem(18) }} />}
                title="Save changes"
            >
                Save changes
            </AmeButton>
        </Paper>
    );
}
