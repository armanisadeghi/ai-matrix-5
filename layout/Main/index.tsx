'use client';

import {AppShell, useMantineTheme} from '@mantine/core';
import {useDisclosure, useMediaQuery} from '@mantine/hooks';
import {ReactNode} from 'react';
import {Navbar} from '@/layout/Main/Navbar';
import {Header} from '@/layout/Main/Header';
import {Footer} from '@/layout/Main/Footer';

type Props = { children: ReactNode };

export function MainLayout(props: Props) {
    const {children} = props;
    const [opened, {toggle}] = useDisclosure();
    const theme = useMantineTheme()
    const desktop_match = useMediaQuery('(min-width: 992px)');
    const tablet_match = useMediaQuery('(max-width: 992px)');
    const mobile_match = useMediaQuery('(min-width: 768px)');

    console.log(tablet_match, mobile_match)

    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: {base: 60, md: 200, lg: 250},
                breakpoint: 'sm',
                collapsed: {mobile: !opened},
            }}
            footer={{height: 60}}
            padding="md"
        >
            <AppShell.Header>
                <Header opened={opened} toggle={toggle}/>
            </AppShell.Header>
            <AppShell.Navbar px='xs' pt="md">
                <Navbar desktopOpened={desktop_match} tabletOpened={tablet_match} mobileOpened={mobile_match}/>
            </AppShell.Navbar>
            <AppShell.Main style={{backgroundColor: theme.colors.gray[1]}}>
                {children}
            </AppShell.Main>
            <AppShell.Footer>
                <Footer/>
            </AppShell.Footer>
        </AppShell>

    );
}
