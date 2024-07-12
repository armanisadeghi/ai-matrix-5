// layout/Primary/Navbar/Navbar.tsx
'use client';

import React from 'react';
import { NavbarLogic } from './NavbarLogic';
import { navItems } from './navItems';
import { Box, NavLink, Group, ActionIcon } from "@mantine/core";
import { IconSettings, IconMessage, IconHelp, IconFile, IconShield } from "@tabler/icons-react";
import Link from "next/link";

export function Navbar() {
    return (
        <NavbarLogic navItems={navItems}>
            {({ leftSideBarWidth, isActive }) => (
                <nav style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
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
                            >
                                {leftSideBarWidth >= 100 &&
                                    item.links.map((link, linkIndex) => (
                                        <NavLink
                                            key={linkIndex}
                                            label={link.label}
                                            component={Link}
                                            href={link.link}
                                            mt={linkIndex === 0 ? 4 : 0}
                                            active={isActive(link.link)}
                                        />
                                    ))}
                            </NavLink>
                        ))}
                    </div>
                    <div
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
                    </div>
                </nav>
            )}
        </NavbarLogic>
    );
}
