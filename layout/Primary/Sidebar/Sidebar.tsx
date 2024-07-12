// layout/Primary/Sidebar/Sidebar.tsx

import React, { memo } from 'react';
import { Box, AppShell, Group, Stack } from '@mantine/core';
import { SidebarLogic } from './SidebarLogic';

interface SidebarProps {
    title?: string | null;
}

const TitleGroup = memo(({ title }: { title: string | null | undefined }) => (
    <Group justify="flex-start" gap="xs" style={{ padding: '4px' }}>
        <div style={{ marginLeft: '35px' }}>
            {title && <h3>{title}</h3>}
        </div>
    </Group>
));

const IconGroup = memo(() => (
    <Group justify="center" gap="xs" style={{ padding: '4px' }}>
        {/* Add any content needed for the "icons" state */}
    </Group>
));

export const Sidebar = memo(function Sidebar({ title }: SidebarProps) {
    return (
        <SidebarLogic>
            {({ sidebarWidth, sidebarContent }) => (
                <Box component="aside" p="0">
                    <AppShell.Section>
                        {sidebarWidth >= 200 ? (
                            <TitleGroup title={title} />
                        ) : sidebarWidth >= 70 ? (
                            <IconGroup />
                        ) : null}
                        <Stack mt="0" gap="xs" align="stretch">
                            {sidebarContent}
                        </Stack>
                    </AppShell.Section>
                </Box>
            )}
        </SidebarLogic>
    );
});
