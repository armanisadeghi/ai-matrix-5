import { AppShell, Box } from "@mantine/core";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "@/layout/Main/Footer";
import { useDynamicLayout } from "./useDynamicLayout";

type Props = {
    children: ReactNode;
};

export function PrimaryLayout({ children }: Props) {
    const {
        headerHeight,
        leftSideBarWidth,
        rightSideBarWidth,
        footerHeight,
        deviceType
    } = useDynamicLayout();

    const finalHeaderHeight = headerHeight || 60;
    const finalLeftSideBarWidth = leftSideBarWidth || 250;
    const finalRightSideBarWidth = rightSideBarWidth || 0;
    const finalFooterHeight = footerHeight || 0;
    const finalDeviceType = deviceType || 'desktop';

    return (
        <AppShell
            layout="default"
            header={{
                height: finalHeaderHeight,
            }}
            navbar={{
                width: finalLeftSideBarWidth,
                breakpoint: "sm",
                collapsed: { mobile: finalLeftSideBarWidth === 0 },
            }}
            aside={{
                width: finalRightSideBarWidth,
                breakpoint: "md",
                collapsed: {
                    desktop: false,
                    mobile: true,
                },
            }}
            footer={{
                height: finalFooterHeight,
            }}
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            {finalLeftSideBarWidth !== 0 && (
                <AppShell.Navbar pt="xs" pb="xs" pl={0} pr={0}>
                    <Navbar />
                </AppShell.Navbar>
            )}
            <AppShell.Main>
                <Box>{children}</Box>
            </AppShell.Main>
            {finalRightSideBarWidth !== 0 && (
                <AppShell.Aside>
                    <Sidebar />
                </AppShell.Aside>
            )}
            {finalFooterHeight !== 0 && (
                <AppShell.Footer>
                    <Footer />
                </AppShell.Footer>
            )}
        </AppShell>
    );
}
