import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { ActionIcon, Avatar, Burger, Group, Menu, TextInput, Tooltip } from "@mantine/core";
import { IconBell, IconSearch, IconSettings2 } from "@tabler/icons-react";
import { ColorSchemeToggle, Logo } from "@/components";
import Link from "next/link";
import { PATH_USER } from "@/routes";
import { useLayout } from "@/context/LayoutContext";
import { useSidebar } from "@/context/SidebarContext";
import { FaRegUser } from "react-icons/fa";

type Props = {
    tabletMatch?: boolean;
};

export function Header({ tabletMatch }: Props) {
    const { toggleOpened, opened } = useLayout();
    const { asideOpen, toggleAside, sidebarContent } = useSidebar();

    // Wrapper function to handle the button click event
    const handleToggleAside = () => {
        toggleAside("full"); // Change "full" to the appropriate NavState you want to toggle to
    };

    return (
        <Group h="100%" px="md" align="center" justify="space-between" style={{ flexWrap: "nowrap" }}>
            <Group>
                <Burger opened={opened} onClick={toggleOpened} hiddenFrom="sm" size="sm" />
                <Burger opened={asideOpen} onClick={handleToggleAside} visibleFrom="lg" size="sm" />
                <Logo />
            </Group>
            <Group style={{ flexGrow: 1, justifyContent: "center" }}>
                <TextInput
                    size="xs"
                    radius="md"
                    placeholder="Search anything..."
                    leftSection={<IconSearch size={14} />}
                    style={{ flex: "1 1 auto", minWidth: "60px", maxWidth: tabletMatch ? "350px" : "500px" }}
                    visibleFrom="sm"
                />
            </Group>
            <Group>
                <Tooltip label="Search">
                    <ActionIcon hiddenFrom="md" title="search" variant="transparent">
                        <IconSearch size={18} />
                    </ActionIcon>
                </Tooltip>
                <ColorSchemeToggle />
                <Tooltip label="Notifications">
                    <ActionIcon title="notifications" variant="transparent">
                        <IconBell size={18} />
                    </ActionIcon>
                </Tooltip>
                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <ActionIcon title="user menu" variant="transparent">
                            <FaRegUser />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item component={Link} href={PATH_USER.settings} leftSection={<IconSettings2 size={16} />}>
                            Settings
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}