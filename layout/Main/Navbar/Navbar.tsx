"use client";

import {
    ActionIcon,
    AppShell,
    Avatar, Box,
    Group,
    NavLink,
    ScrollArea,
    UnstyledButton,
    useMantineTheme
} from "@mantine/core";
import { IconSettings, IconMessage, IconHelp, IconFile, IconShield } from "@tabler/icons-react";
import { navItems } from "./navItems";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { leftSidebarAtom } from "@/state/layoutAtoms";


// Kevin, I wrote these comments and then fixed most of it, but there are some minor tweaks remaining,
// I still don't like that we don't see more of the manu words in compact mode. I think I had it where we could see the full name, but I can't remember.

// Kevin, please look at my previous implementation that created more space so even when the menu was compact, it looked good.
// Most importantly, I want the icons on the bottom lined up vertically when it's the small setting. At the medium setting,
// I had them still showing, but you have increased some margin or something so they're not acting right.
// Please go back and look at my code from a few weeks ago to see what I had done so you can replicate it or improve upon it.

export const Navbar = () => {
    const theme = useMantineTheme();
    const pathname = usePathname();
    const leftSideBarWidth = useRecoilValue(leftSidebarAtom);

    return (
        <>
            <AppShell.Section grow component={ScrollArea} my="xs">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        label={
                            <Group
                                style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                gap="xs"
                                justify="center"
                            >
                                <item.icon size={20} />
                                {leftSideBarWidth >= 100 && (
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
                        {leftSideBarWidth >= 100 &&
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

            <AppShell.Section
                style={{
                    display: 'flex',
                    flexDirection: leftSideBarWidth < 100 ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                }}
            >
                <Group
                    gap="4px"
                    style={{
                        flexDirection: leftSideBarWidth < 100 ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
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
                <Box mt="xl"></Box>
            </AppShell.Section>
        </>
    );
};
