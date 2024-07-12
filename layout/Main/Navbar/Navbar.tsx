'use client';

import useToggleSizes from '@/hooks/layout/useToggleSizes';
import React, { useMemo } from 'react';
import { ActionIcon, AppShell, Box, Group, NavLink, ScrollArea, useMantineTheme, Menu, Stack } from '@mantine/core';
import { IconSettings, IconMessage, IconHelp, IconFile, IconShield } from '@tabler/icons-react';
import { navItems } from './navItems';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { leftSidebarAtom } from '@/state/layoutAtoms';
import { LiaToggleOnSolid } from "react-icons/lia";


type NavItemProps = {
    item: {
        label: string;
        icon: React.ElementType;
        initiallyOpened?: boolean;
        links: { label: string; link: string }[];
    };
    leftSideBarWidth: number;
    pathname: string;
    theme: any;
};

const NavItemExpanded = React.memo(
    ({item, leftSideBarWidth, pathname, theme}: NavItemProps) => (
        <NavLink
            key={item.label}
            label={
                <Group
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                    gap="xs"
                    justify="center"
                >
                    <item.icon size={20}/>
                    {leftSideBarWidth >= 100 && (
                        <span
                            style={{
                                marginLeft: '8px',
                                flex: '1',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {item.label}
                        </span>
                    )}
                </Group>
            }
            childrenOffset={28}
            defaultOpened={item.initiallyOpened ?? false}
            mb="xs"
            style={{borderRadius: theme.radius.sm}}
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
                            backgroundColor:
                                link.link === pathname
                                    ? theme.colors.gray[3]
                                    : 'inherit',
                            color:
                                link.link === pathname
                                    ? theme.colors.dark[8]
                                    : 'inherit',
                            fontWeight:
                                link.link === pathname ? 600 : 'normal'
                        }}
                    />
                ))}
        </NavLink>
    )
);

const NavItemCompact = React.memo(
    ({item, pathname, theme, toggleSize}: NavItemProps & { toggleSize: (element: 'leftSidebar', steps: number) => void }) => (
        <Menu trigger="hover" position="right-start" offset={17} withArrow shadow="md" width={200}>
            <Stack
                h={40}
                bg="var(--mantine-color-body)"
                align="center"
                justify="flex-start"
                gap="xl"
            >

                <Menu.Target>
                    <ActionIcon variant="transparent" size="sm">
                        <item.icon size={20}/>
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>{item.label}</Menu.Label>

                    {item.links.map((link, linkIndex) => (
                        <Menu.Item
                            key={linkIndex}
                            component={Link}
                            href={link.link}

                        >
                            {link.label}
                        </Menu.Item>
                    ))}
                    <Menu.Divider />
{/*
                <Menu.Item
                    leftSection={<LiaToggleOnSolid size={16} />}
                    onClick={() => toggleSize('leftSidebar', 2)}
                >
                        Expand Full Menu
                    </Menu.Item>
*/}

                </Menu.Dropdown>
            </Stack>
        </Menu>
    )
);

type BottomSectionProps = {
    leftSideBarWidth: number;
};

const BottomSection = React.memo(({leftSideBarWidth}: BottomSectionProps) => (
    <AppShell.Section
        style={{
            display: leftSideBarWidth < 100 ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
        }}
    >
        <Group
            gap="10px"
            style={{
                flexDirection: leftSideBarWidth < 100 ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
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
        </Group>
        <Box mt="xl"></Box>
    </AppShell.Section>
));

export const Navbar = React.memo(() => {
    const theme = useMantineTheme();
    const pathname = usePathname();
    const [leftSidebarWidth, setLeftSidebarWidth] = useRecoilState(leftSidebarAtom);

    const { toggleSize } = useToggleSizes();

    const memoizedNavItems = useMemo(
        () =>
            navItems.map((item) =>
                leftSidebarWidth < 100 ? (
                    <NavItemCompact
                        key={item.label}
                        item={item}
                        leftSideBarWidth={leftSidebarWidth}
                        pathname={pathname}
                        theme={theme}
                        toggleSize={toggleSize}
                    />
                ) : (
                    <NavItemExpanded
                        key={item.label}
                        item={item}
                        leftSideBarWidth={leftSidebarWidth}
                        pathname={pathname}
                        theme={theme}
                    />
                )
            ),
        [leftSidebarWidth, pathname, theme]
    );

    return (
        <>
            <AppShell.Section grow component={ScrollArea} my="xs">
                {memoizedNavItems}
            </AppShell.Section>
            <BottomSection leftSideBarWidth={leftSidebarWidth}/>
        </>
    );
});

Navbar.displayName = 'Navbar';
