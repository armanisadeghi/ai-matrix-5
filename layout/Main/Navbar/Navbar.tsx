"use client";

import { AppShell, Group, ScrollArea, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconFile, IconHelp, IconMessage, IconSettings, IconShield } from "@tabler/icons-react";
import { navItems } from "./navItems";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { leftSidebarAtom } from "@/state/layoutAtoms";
import { AmeIconWrapper } from "@/ui/icons";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { AmeNavLink } from "@/ui/buttons";

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
    const { colorScheme } = useMantineColorScheme();

    const iconSize = leftSideBarWidth <= 100 ? 24 : 16;
    const iconColor = colorScheme === "dark" ? theme.white : theme.primaryColor;

    return (
        <>
            <AppShell.Section grow component={ScrollArea} my="xs">
                {navItems.map((item) => (
                    <AmeNavLink
                        key={item.label}
                        label={
                            <Group
                                style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                gap={0}
                                justify="center"
                            >
                                <AmeIconWrapper c={iconColor}>
                                    <item.icon size={iconSize} />
                                </AmeIconWrapper>
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
                        childrenOffset={24}
                        defaultOpened={item.initiallyOpened}
                        style={{ borderRadius: theme.radius.sm }}
                    >
                        {leftSideBarWidth >= 100 &&
                            item.links.map((link, linkIndex) => (
                                <AmeNavLink
                                    key={linkIndex}
                                    label={link.label}
                                    component={Link}
                                    href={link.link}
                                    style={{
                                        borderRadius: theme.radius.sm,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                    }}
                                />
                            ))}
                    </AmeNavLink>
                ))}
            </AppShell.Section>

            <AppShell.Section
                style={{
                    display: "flex",
                    flexDirection: leftSideBarWidth < 100 ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: leftSideBarWidth < 80 ? 12 : leftSideBarWidth > 50 && leftSideBarWidth <= 150 ? 4 : 8,
                }}
            >
                <AmeActionIcon variant="transparent" size="sm" tooltip="Settings" c={iconColor}>
                    <IconSettings size={iconSize} />
                </AmeActionIcon>
                <AmeActionIcon variant="transparent" size="sm" tooltip="Message" c={iconColor}>
                    <IconMessage size={iconSize} />
                </AmeActionIcon>
                <AmeActionIcon variant="transparent" size="sm" tooltip="Help" c={iconColor}>
                    <IconHelp size={iconSize} />
                </AmeActionIcon>
                <AmeActionIcon variant="transparent" size="sm" tooltip="Files" c={iconColor}>
                    <IconFile size={iconSize} />
                </AmeActionIcon>
                <AmeActionIcon variant="transparent" size="sm" tooltip="Privacy" c={iconColor}>
                    <IconShield size={iconSize} />
                </AmeActionIcon>
            </AppShell.Section>
        </>
    );
};
