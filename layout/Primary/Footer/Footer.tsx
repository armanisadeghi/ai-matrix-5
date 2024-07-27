// layout/Primary/Footer/Footer.tsx

import React, { memo } from 'react';
import { Box, AppShell, Group, Stack, Title, ActionIcon } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { FooterLogic } from './FooterLogic';

const ToggleButton = memo(({ footerHeight, handleToggle }: { footerHeight: number, handleToggle: () => void }) => (
    <ActionIcon onClick={handleToggle} variant="light">
        {footerHeight === 0 ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
    </ActionIcon>
));

const FooterContent = memo(() => (
    <Stack mt="md" gap="xs" align="stretch">
        <Title>Footer</Title>
    </Stack>
));

export const Footer = memo(function Footer() {
    return (
        <FooterLogic>
            {({ footerHeight, handleToggle }) => (
                <Box p="xs">
                    <AppShell.Section>
                        <Group justify="flex-end" gap="xs">
                            <ToggleButton footerHeight={footerHeight} handleToggle={handleToggle} />
                        </Group>
                    </AppShell.Section>

                    <AppShell.Section>
                        <FooterContent />
                    </AppShell.Section>
                </Box>
            )}
        </FooterLogic>
    );
});
