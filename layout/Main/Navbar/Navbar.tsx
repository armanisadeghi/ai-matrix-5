"use client";
import { ActionIconProps, AppShell, Flex, Group, Menu, NavLink, ScrollArea, useMantineTheme } from "@mantine/core";
import {
    IconChevronLeft,
    IconChevronRight,
    IconDots,
    IconFile,
    IconHelp,
    IconMessage,
    IconSettings,
    IconShield,
} from "@tabler/icons-react";
import { navItems } from "./navItems";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { useNavbar } from "@/context/NavbarContext";
import { generateKey } from "@/utils/keys";

const actionProps: ActionIconProps = {
    variant: "light",
};

interface NavbarProps {
    state: "full" | "compact" | "icons" | "hidden";
}

export const Navbar = ({ state }: NavbarProps) => {
    const { handleNavbarExpand, handleNavbarCollapse } = useNavbar();
    const theme = useMantineTheme();
    const pathname = usePathname();

    return (
        <>
            <AppShell.Section pt="xs">
                {state === "compact" && (
                    <Group justify="flex-end" gap="xs">
                        <AmeActionIcon title="shrink navbar" onClick={handleNavbarCollapse} {...actionProps}>
                            <IconChevronLeft size={18} />
                        </AmeActionIcon>
                        <AmeActionIcon title="expand navbar" onClick={handleNavbarExpand} {...actionProps}>
                            <IconChevronRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-end" gap="xs">
                        <AmeActionIcon title="shrink navbar" onClick={handleNavbarCollapse} {...actionProps}>
                            <IconChevronLeft size={18} />
                        </AmeActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <AmeActionIcon title="shrink navbar" onClick={handleNavbarExpand} {...actionProps}>
                            <IconChevronRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}
            </AppShell.Section>

            <AppShell.Section grow component={ScrollArea} my="md">
                {navItems.map((item) => (
                    <NavLink
                        key={generateKey(item.label)}
                        label={
                            <Group
                                style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                gap="xs"
                                key={generateKey(item.label + "group")}
                            >
                                <item.icon size={20} key={generateKey(item.label + "icon")} />
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
                        mb="xs"
                        style={{ borderRadius: theme.radius.sm }}
                    >
                        {state !== "icons" &&
                            item.links.map((link, linkIndex) => (
                                <NavLink
                                    label={link.label}
                                    component={Link}
                                    href={link.link}
                                    mt={linkIndex === 0 ? 4 : 0}
                                    style={{
                                        borderRadius: theme.radius.sm,
                                        backgroundColor: link.link === pathname ? theme.colors.gray[3] : "inherit",
                                        color: link.link === pathname ? theme.colors.dark[8] : "inherit",
                                        fontWeight: link.link === pathname ? 600 : "normal",
                                    }}
                                />
                            ))}
                    </NavLink>
                ))}
            </AppShell.Section>

            <AppShell.Section pb="xs">
                <Flex justify="center" gap="xs">
                    {state !== "icons" ? (
                        <>
                            <AmeActionIcon title="settings" variant="transparent">
                                <IconSettings />
                            </AmeActionIcon>
                            <AmeActionIcon title="messages" variant="transparent">
                                <IconMessage />
                            </AmeActionIcon>
                            <AmeActionIcon title="help" variant="transparent">
                                <IconHelp />
                            </AmeActionIcon>
                            <AmeActionIcon title="files" variant="transparent">
                                <IconFile />
                            </AmeActionIcon>
                            <AmeActionIcon title="locks" variant="transparent">
                                <IconShield />
                            </AmeActionIcon>
                        </>
                    ) : (
                        <Menu>
                            <Menu.Target>
                                <AmeActionIcon title="menu" variant="transparent">
                                    <IconDots />
                                </AmeActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>
                                    <IconSettings />
                                </Menu.Item>
                                <Menu.Item>
                                    <IconMessage />
                                </Menu.Item>
                                <Menu.Item>
                                    <IconHelp />
                                </Menu.Item>
                                <Menu.Item>
                                    <IconFile />
                                </Menu.Item>
                                <Menu.Item>
                                    <IconShield />
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    )}
                </Flex>
            </AppShell.Section>
        </>
    );
};
