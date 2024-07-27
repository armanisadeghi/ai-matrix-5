// layout/Primary/Navbar/NavbarLinksGroupClient.tsx

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import Link from 'next/link';


interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
}

export const NavbarLinksGroupClient = React.memo(function NavbarLinksGroupClient(
    {
        icon: Icon,
        label,
        initiallyOpened,
        links
    }: LinksGroupProps) {
    const [opened, setOpened] = useState(initiallyOpened || false);

    const hasLinks = Array.isArray(links);

    const toggleOpened = useCallback(() => {
        setOpened((o) => !o);
    }, []);

    const items = useMemo(() => {
        return (hasLinks ? links : []).map((link) => (
            <Text component={Link} className={classes.link} href={link.link} key={link.label}>
                {link.label}
            </Text>
        ));
    }, [hasLinks, links]);

    const chevronStyle = useMemo(() => ({
        width: rem(16),
        height: rem(16),
        transform: opened ? 'rotate(-90deg)' : 'none',
    }), [opened]);

    return (
        <>
            <UnstyledButton onClick={toggleOpened} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{display: 'flex', alignItems: 'center'}}>
                        <ThemeIcon variant="transparent" color="gray">
                            <Icon style={{width: rem(18), height: rem(18)}}/>
                        </ThemeIcon>
                        <Box ml="sm">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={chevronStyle}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
});
