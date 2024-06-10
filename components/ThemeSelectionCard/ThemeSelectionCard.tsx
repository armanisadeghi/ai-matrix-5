import React, { useState } from "react";
import { Flex, Grid, PaperProps, Radio, rem } from "@mantine/core";
import { IconDeviceDesktop, IconDeviceFloppy, IconMoon, IconSun } from "@tabler/icons-react";
import AmeRadioCard from "@/ui/radio/AmeRadioCard";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeButton from "@/ui/buttons/AmeButton";
import AmeText from "@/ui/typography/AmeText";
import AmePaper from "@/ui/surfaces/AmePaper";

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

interface ThemeSelectionCardProps extends PaperProps {
    showSaveButton?: boolean;
}

export function ThemeSelectionCard({ showSaveButton, ...others }: ThemeSelectionCardProps) {
    const [colorMode, setColorMode] = useState<string | null>(null);

    const cards = data.map((item) => <AmeRadioCard value={item.name} key={item.name} {...item} />);

    return (
        <AmePaper component="form" p="md" mb="md" {...others}>
            <Grid align="flex-start" mb="md">
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <AmeTitle as="card-header" mb="md">
                        Color Mode
                    </AmeTitle>
                    <AmeText size="sm" c="dimmed">
                        Choose if app's appearance should be light or dark, or follow your computer's settings.
                    </AmeText>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 9 }}>
                    <Radio.Group value={colorMode} onChange={setColorMode}>
                        <Flex gap="xs">{cards}</Flex>
                    </Radio.Group>
                    {showSaveButton && (
                        <AmeButton
                            type="submit"
                            mt="md"
                            leftSection={<IconDeviceFloppy style={{ height: rem(18), width: rem(18) }} />}
                            title="Save changes"
                        >
                            Save changes
                        </AmeButton>
                    )}
                </Grid.Col>
            </Grid>
        </AmePaper>
    );
}
