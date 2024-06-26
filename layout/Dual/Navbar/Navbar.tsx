'use client';
import { Group, Stack, NavLink, ActionIcon, Box } from "@mantine/core";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconSettings, IconMessage, IconHelp, IconFile, IconShield } from "@tabler/icons-react";
import { navItems } from "../../Main/Navbar/navItems";
import { useLayout } from '../../../context/LayoutContext';

interface NavbarProps {
    state: "full" | "compact" | "icons" | "hidden";
}

export const Navbar = ({state}: NavbarProps) => {
    const {
        handleNavbarExpand,
        handleNavbarCollapse,
        handleIconMouseover,
        handleEndIconMouseover
    } = useLayout();
    const [hovered, setHovered] = useState(false);

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
            style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                {state === "compact" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleNavbarCollapse}>
                            <IconChevronLeft size={14}/>
                        </ActionIcon>
                        <ActionIcon onClick={handleNavbarExpand}>
                            <IconChevronRight size={14}/>
                        </ActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleNavbarCollapse}>
                            <IconChevronLeft size={14}/>
                        </ActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <ActionIcon onClick={handleNavbarExpand}>
                            <IconChevronRight size={14}/>
                        </ActionIcon>
                    </Group>
                )}

                <Stack mt="md" gap="md" align="stretch">
                    {navItems.map((item, index) => (
                        <div key={index}>
                            <NavLink
                                label={
                                    <Group style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} gap="xs">
                                        <item.icon size={20} />
                                        {state !== "icons" && (
                                            <span style={{ marginLeft: '8px', flex: '1', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.label}
                            </span>
                                        )}
                                    </Group>
                                }
                                childrenOffset={28}
                                defaultOpened={item.initiallyOpened}
                            >
                                {state !== "icons" && item.links.map((link, linkIndex) => (
                                    <NavLink key={linkIndex} label={link.label} component="a" href={link.link} />
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
