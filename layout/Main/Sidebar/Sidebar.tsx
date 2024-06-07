"use client";
import { ActionIconProps, AppShell, Box, Group, Stack, Title } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useSidebar } from "@/context/SidebarContext";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";

const actionProps: ActionIconProps = {
    variant: "light",
};

interface SidebarProps {
    state: "full" | "compact" | "icons" | "hidden";
}

export const Sidebar = ({ state }: SidebarProps) => {
    const { handleExpand, handleCollapse } = useSidebar();

    return (
        <Box component="aside" p="sm">
            <AppShell.Section>
                {state === "compact" && (
                    <Group justify="flex-start" gap="xs">
                        <AmeActionIcon title="expand sidebar" onClick={handleExpand} {...actionProps}>
                            <IconChevronLeft size={18} />
                        </AmeActionIcon>
                        <AmeActionIcon title="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconChevronRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-start" gap="xs">
                        <AmeActionIcon title="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconChevronRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <AmeActionIcon title="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconChevronRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}

                <Stack mt="md" gap="xs" align="stretch">
                    <Title>Aside</Title>
                </Stack>
            </AppShell.Section>
        </Box>
    );
};
