"use client";
import { ActionIcon, ActionIconProps, AppShell, Box, Group, Stack, Title } from "@mantine/core";
import { IconArrowBarRight, IconArrowBarToLeft, IconArrowBarToRight } from "@tabler/icons-react";
import { useSidebar } from "@/context/SidebarContext";

const actionProps: ActionIconProps = {
    variant: "light",
};

interface SidebarProps {
    state: "full" | "compact" | "icons" | "hidden";
}

export const Sidebar = ({ state }: SidebarProps) => {
    const { handleExpand, handleCollapse } = useSidebar();

    return (
        <Box component="aside">
            <AppShell.Section>
                {state === "compact" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleExpand} {...actionProps}>
                            <IconArrowBarToLeft size={18} />
                        </ActionIcon>
                        <ActionIcon onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarToRight size={18} />
                        </ActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarRight size={18} />
                        </ActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <ActionIcon onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarRight size={18} />
                        </ActionIcon>
                    </Group>
                )}

                <Stack mt="md" gap="xs" align="stretch">
                    <Title>Aside</Title>
                </Stack>
            </AppShell.Section>
        </Box>
    );
};
