"use client";
import { ActionIcon, ActionIconProps, AppShell, Box, Group, Stack, Title } from "@mantine/core";
import { IconArrowBarRight, IconArrowBarToLeft, IconArrowBarToRight } from "@tabler/icons-react";
import { useSidebar } from "@/context/SidebarContext";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { sidebarWidthDirectAtom } from "@/context/atoms/layoutAtoms";

const actionProps: ActionIconProps = {
    variant: "light",
};

interface SidebarProps {
    state: "full" | "compact" | "icons" | "hidden";
    title?: string;
}

export const Sidebar = ({ state, title }: SidebarProps) => {
    const { handleExpand, handleCollapse } = useSidebar();
    const [sidebarWidth, setSidebarWidth] = useRecoilState(sidebarWidthDirectAtom);

    useEffect(() => {
        switch (state) {
            case "full":
                setSidebarWidth(200);
                break;
            case "compact":
                setSidebarWidth(150);
                break;
            case "icons":
                setSidebarWidth(70);
                break;
            case "hidden":
                setSidebarWidth(0);
                break;
        }
    }, [state, setSidebarWidth]);

    return (
        <Box component="aside" p="xs">
            <AppShell.Section>
                {state === "compact" && (
                    <Group justify="flex-start" gap="xs">
                        <AmeActionIcon title="expand sidebar" onClick={handleExpand} {...actionProps}>
                            <IconArrowBarToLeft size={18} />
                        </AmeActionIcon>
                        <AmeActionIcon title="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarToRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-start" gap="xs">
                        <AmeActionIcon title="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <AmeActionIcon title="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}

                <Stack mt="md" gap="xs" align="stretch">
                    {title && <h3>{title}</h3>}
                </Stack>
            </AppShell.Section>
        </Box>
    );
};
