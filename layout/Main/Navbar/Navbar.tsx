"use client";
import { ActionIcon, ActionIconProps, Box, Group, NavLink, Stack, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import {
    IconFile,
    IconHelp,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarRightCollapse,
    IconLayoutSidebarRightExpand,
    IconMessage,
    IconSettings,
    IconShield,
} from "@tabler/icons-react";
import { navItems } from "./navItems";
import { useLayout } from "@/context/LayoutContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const actionProps: ActionIconProps = {
    variant: "light",
};

interface NavbarProps {
    state: "full" | "compact" | "icons" | "hidden";
}

export const Navbar = ({ state }: NavbarProps) => {
    const { handleNavbarExpand, handleNavbarCollapse, handleIconMouseover, handleEndIconMouseover } = useLayout();
    const [hovered, setHovered] = useState(false);
    const theme = useMantineTheme();
    const router = useRouter();
    const pathname = usePathname();

    const handleMouseEnter = () => {
        if (state === "icons") {
            setHovered(true);
            handleIconMouseover();
        }
    };

    const handleMouseLeave = () => {
        if (state === "compact") {
            setHovered(false);
            handleEndIconMouseover();
        }
    };

    return (
        <Box
            style={{ display: "flex", flexDirection: "column", height: "100vh" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                {state === "compact" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleNavbarCollapse} {...actionProps}>
                            <IconLayoutSidebarLeftCollapse size={18} />
                        </ActionIcon>
                        <ActionIcon onClick={handleNavbarExpand} {...actionProps}>
                            <IconLayoutSidebarRightCollapse size={18} />
                        </ActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleNavbarCollapse} {...actionProps}>
                            <IconLayoutSidebarLeftCollapse size={18} />
                        </ActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <ActionIcon onClick={handleNavbarExpand} {...actionProps}>
                            <IconLayoutSidebarRightExpand size={18} />
                        </ActionIcon>
                    </Group>
                )}

                <Stack mt="md" gap="xs" align="stretch">
                    {navItems.map((item, index) => (
                        <div key={index}>
                            <NavLink
                                label={
                                    <Group
                                        style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                        gap="xs"
                                    >
                                        <item.icon size={20} />
                                        {state !== "icons" && (
                                            <span
                                                style={{
                                                    marginLeft: "8px",
                                                    flex: "1",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {item.label}
                                            </span>
                                        )}
                                    </Group>
                                }
                                childrenOffset={28}
                                defaultOpened={item.initiallyOpened}
                                style={{ borderRadius: theme.radius.sm }}
                            >
                                {state !== "icons" &&
                                    item.links.map((link, linkIndex) => (
                                        <NavLink
                                            key={linkIndex}
                                            label={link.label}
                                            component={Link}
                                            href={link.link}
                                            py={6}
                                            mt={linkIndex === 0 ? 4 : 0}
                                            style={{
                                                borderRadius: theme.radius.sm,
                                                backgroundColor:
                                                    link.link === pathname ? theme.colors.gray[3] : "inherit",
                                                color: link.link === pathname ? theme.colors.dark[8] : "inherit",
                                                fontWeight: link.link === pathname ? 600 : "normal",
                                            }}
                                        />
                                    ))}
                            </NavLink>
                        </div>
                    ))}
                </Stack>
            </div>

            <Box mt="auto">
                <Group justify="center" gap="xs" mb="sm">
                    <ActionIcon variant="transparent" size="sm">
                        <IconSettings />
                    </ActionIcon>
                    <ActionIcon variant="transparent" size="sm">
                        <IconMessage />
                    </ActionIcon>
                    <ActionIcon variant="transparent" size="sm">
                        <IconHelp />
                    </ActionIcon>
                    <ActionIcon variant="transparent" size="sm">
                        <IconFile />
                    </ActionIcon>
                    <ActionIcon variant="transparent" size="sm">
                        <IconShield />
                    </ActionIcon>
                </Group>
            </Box>
        </Box>
    );
};
