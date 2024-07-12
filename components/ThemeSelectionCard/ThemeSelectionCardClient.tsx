// components/ThemeSelection/ThemeSelectionCardClient.tsx

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Flex, Grid, PaperProps, Radio, rem } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import AmeRadioCard from '@/ui/radio/AmeRadioCard';
import AmeTitle from '@/ui/typography/AmeTitle';
import AmeButton from '@/ui/buttons/AmeButton';
import AmeText from '@/ui/typography/AmeText';
import AmePaper from '@/ui/surfaces/AmePaper';

interface ThemeSelectionCardClientProps extends PaperProps {
    showSaveButton?: boolean;
    data: Array<{ name: string; icon: React.FC<any> }>;
}

export const ThemeSelectionCardClient = React.memo(function ThemeSelectionCardClient({
                                                                                         showSaveButton,
                                                                                         data,
                                                                                         ...others
                                                                                     }: ThemeSelectionCardClientProps) {
    const [colorMode, setColorMode] = useState<string | null>(null);

    const handleColorModeChange = useCallback((value: string) => {
        setColorMode(value);
    }, []);

    const cards = useMemo(() => data.map((item) => (
        <AmeRadioCard value={item.name} key={item.name} {...item} />
    )), [data]);

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
                    <Radio.Group value={colorMode} onChange={handleColorModeChange}>
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
});
