'use client'

import { ActionIcon, ActionIconProps, AppShell, Box, Group, Stack } from '@mantine/core'
import { useRecoilValue } from 'recoil'
import { leftSidebarAtom } from '@/state/layoutAtoms'
import { useSidebar } from '@/context/SidebarContext'

const actionProps: ActionIconProps = {
    variant: 'light'
}

interface SidebarProps {
    title?: string | null
}

export const Sidebar = ({ title }: SidebarProps) => {
    const sidebarWidth = useRecoilValue(leftSidebarAtom)
    const { sidebarContent } = useSidebar()

    return (
        <Box component="aside" p="0">
            <AppShell.Section>
                {sidebarWidth >= 200 && (
                    <Group justify="flex-start" gap="xs" style={{ padding: '4px' }}>
                        <div style={{ marginLeft: '35px' }}>{title && <h3>{title}</h3>}</div>
                    </Group>
                )}
                {sidebarWidth < 200 && sidebarWidth >= 70 && (
                    <Group justify="center" gap="xs" style={{ padding: '4px' }}>
                        {/* Add any content needed for the "icons" state */}
                    </Group>
                )}
                <Stack mt="0" gap="xs" align="stretch">
                    {sidebarContent}
                </Stack>
            </AppShell.Section>
        </Box>
    )
}
