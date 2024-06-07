"use client";
import React, { useRef, useEffect } from "react";
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
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { navbarWidthDirectAtom } from "@/context/atoms/layoutAtoms";

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
    const leftNavRef = useRef(null);
    const [navbarWidth, setNavbarWidth] = useRecoilState(navbarWidthDirectAtom);

    useEffect(() => {
        switch (state) {
            case "full":
                setNavbarWidth(250);
                break;
            case "compact":
                setNavbarWidth(200);
                break;
            case "icons":
                setNavbarWidth(70);
                break;
            default:
                setNavbarWidth(0);
                break;
        }
    }, [state, setNavbarWidth]);

    return (
        <div ref={leftNavRef}>
            <AppShell.Section>
                {state === "compact" && (
                    <Group justify="flex-end" gap="xs">
                        <AmeActionIcon title="shrink navbar" onClick={handleNavbarCollapse} {...actionProps}>
                            <IconArrowBarToLeft size={18} />
                        </AmeActionIcon>
                        <AmeActionIcon title="expand navbar" onClick={handleNavbarExpand} {...actionProps}>
                            <IconArrowBarToRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-end" gap="xs">
                        <AmeActionIcon title="shrink navbar" onClick={handleNavbarCollapse} {...actionProps}>
                            <IconArrowBarLeft size={18} />
                        </AmeActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <AmeActionIcon title="shrink navbar" onClick={handleNavbarExpand} {...actionProps}>
                            <IconArrowBarToRight size={18} />
                        </AmeActionIcon>
                    </Group>
                )}
            </AppShell.Section>

            <AppShell.Section grow component={ScrollArea} my="md">
                {navItems.map((item, index) => (
                    <NavLink
                        key={item.label}
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
                ))}
            </AppShell.Section>

            <AppShell.Section>
                <Group justify="center" gap="xs" mb="sm">
                    {state === "icons" ? (
                        <Menu>
                            <Menu.Target>
                                <ActionIcon>
                                    <IconDots/>
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>
                                    <IconSettings/>
                                </Menu.Item>
                                <Menu.Item>
                                    <IconMessage/>
                                </Menu.Item>
                                <Menu.Item>
                                    <IconHelp/>
                                </Menu.Item>
                                <Menu.Item>
                                    <IconFile/>
                                </Menu.Item>
                                <Menu.Item>
                                    <IconShield/>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    ) : (
                        <>
                            <ActionIcon variant="transparent" size="sm">
                                <IconSettings/>
                            </ActionIcon>
                            <ActionIcon variant="transparent" size="sm">
                                <IconMessage/>
                            </ActionIcon>
                            <ActionIcon variant="transparent" size="sm">
                                <IconHelp/>
                            </ActionIcon>
                            <ActionIcon variant="transparent" size="sm">
                                <IconFile/>
                            </ActionIcon>
                            <ActionIcon variant="transparent" size="sm">
                                <IconShield/>
                            </ActionIcon>
                        </>
                    )}
                </Group>
            </AppShell.Section>
        </div>
    );
};
