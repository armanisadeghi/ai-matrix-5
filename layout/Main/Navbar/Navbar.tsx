"use client";
import {
    ActionIcon,
    ActionIconProps,
    AppShell,
    Group,
    Menu,
    NavLink,
    ScrollArea,
    useMantineTheme,
} from "@mantine/core";
import {
    IconArrowBarLeft,
    IconArrowBarToLeft,
    IconArrowBarToRight,
    IconDots,
    IconFile,
    IconHelp,
    IconMessage,
    IconSettings,
    IconShield,
} from "@tabler/icons-react";
import { navItems } from "./navItems";
import { useLayout } from "@/context/LayoutContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

const actionProps: ActionIconProps = {
    variant: "light",
};

interface NavbarProps {
    state: "full" | "compact" | "icons" | "hidden";
}

export const Navbar = ({ state }: NavbarProps) => {
    const { handleNavbarExpand, handleNavbarCollapse } = useLayout();
    const theme = useMantineTheme();
    const pathname = usePathname();

    return (
        <>
            <AppShell.Section>
                {state === "compact" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleNavbarCollapse} {...actionProps}>
                            <IconArrowBarToLeft size={18} />
                        </ActionIcon>
                        <ActionIcon onClick={handleNavbarExpand} {...actionProps}>
                            <IconArrowBarToRight size={18} />
                        </ActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleNavbarCollapse} {...actionProps}>
                            <IconArrowBarLeft size={18} />
                        </ActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <ActionIcon onClick={handleNavbarExpand} {...actionProps}>
                            <IconArrowBarToRight size={18} />
                        </ActionIcon>
                    </Group>
                )}
            </AppShell.Section>

            <AppShell.Section grow component={ScrollArea} my="md">
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
                            mb="xs"
                            style={{ borderRadius: theme.radius.sm }}
                        >
                            {state !== "icons" &&
                                item.links.map((link, linkIndex) => (
                                    <NavLink
                                        key={linkIndex}
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
                    </div>
                ))}
            </AppShell.Section>

            <AppShell.Section>
                <Group justify="center" gap="md">
                    {state !== "icons" ? (
                        <>
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
                        </>
                    ) : (
                        <Menu>
                            <Menu.Target>
                                <ActionIcon>
                                    <IconDots />
                                </ActionIcon>
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
                </Group>
            </AppShell.Section>
        </>
    );
};
