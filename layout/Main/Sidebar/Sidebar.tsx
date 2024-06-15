"use client";
import { ActionIcon, ActionIconProps, AppShell, Box, Group, Stack } from "@mantine/core";
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
    title?: string | null;
}

export const Sidebar = ({ state, title }: SidebarProps) => {
    const { handleExpand, handleCollapse, sidebarContent } = useSidebar();
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
        <Box component="aside" p="0">
            <AppShell.Section>
                {state === "compact" && (
                    <Group justify="flex-start" gap="xs" style={{padding: '4px'}}>
                        <AmeActionIcon tooltip="expand sidebar" onClick={handleExpand} {...actionProps}>
                            <IconArrowBarToLeft size={18}/>
                        </AmeActionIcon>
                        <AmeActionIcon tooltip="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarToRight size={18}/>
                        </AmeActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-start" gap="xs" style={{padding: '4px'}}>
                        <AmeActionIcon tooltip="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarRight size={18}/>
                        </AmeActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs" style={{padding: '4px'}}>
                        <AmeActionIcon tooltip="shrink sidebar" onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarRight size={18}/>
                        </AmeActionIcon>
                    </Group>
                )}
                <div style={{marginLeft: '24px'}}>
                    {title && <h3>{title}</h3>}
                </div>
                <Stack mt="0" gap="xs" align="stretch">
                    {sidebarContent}
                </Stack>
            </AppShell.Section>
        </Box>
    );
};
