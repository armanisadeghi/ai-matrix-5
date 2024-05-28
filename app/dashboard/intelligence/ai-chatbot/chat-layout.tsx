import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Navbar } from "@/layout/Main/Navbar";
import { Header } from "@/layout/Apps/Header";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export function ChatLayout({ children }: Props) {
    const [opened, { toggle }] = useDisclosure();
    const mobile_match = useMediaQuery("(min-width: 768px)");

    return (
        <AppShell
            layout="alt"
            header={{ height: { base: 50, md: 60, lg: 70 } }}
            navbar={{
                width: 60,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="sm"

            footer={{ height: 60 }}
            aside={{ width: 200, breakpoint: 'sm', collapsed: { desktop: false, mobile: true } }}
        >
            <AppShell.Header>
                <Header opened={opened} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar
                px="xs"
                pt="md"
                style={{
                    width: '60px',
                    transition: 'width 0.3s',
                }}
            >
                <Navbar mobileOpened={mobile_match} isCollapsed={true} />
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
            <AppShell.Aside p="md">Aside</AppShell.Aside>
        </AppShell>
    );
}

export default ChatLayout;