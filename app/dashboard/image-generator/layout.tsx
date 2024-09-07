"use client";

import AmePaper from "@/ui/surfaces/AmePaper";
import { getActiveTab } from "@/utils/tabUtils";
import { Button, Flex, Grid, rem } from "@mantine/core";
import { IconHome, IconPhotoAi, IconBinoculars } from "@tabler/icons-react";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import React, { ReactNode, useMemo } from "react";

const iconStyle = { width: rem(18), height: rem(18) };

const TABS: { icon: React.FC<any>; title: string; link: string }[] = [
    { icon: IconHome, title: "home feed", link: "home" },
    { icon: IconBinoculars, title: "explore", link: "explore" },
    { icon: IconPhotoAi, title: "ai image generator", link: "ai-image-generator" },
];

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    const currentPath = usePathname();

    const activeTab = useMemo(() => {
        return getActiveTab(currentPath);
    }, [currentPath]);

    const tabItems = TABS.map(({ icon: Icon, title, link }) => (
        <Button
            key={title}
            leftSection={<Icon style={iconStyle} />}
            component={Link}
            href={link}
            tt="capitalize"
            variant={activeTab === link ? "light" : "subtle"}
            ta="left"
            justify="flex-start"
            fw="normal"
        >
            {title}
        </Button>
    ));

    if (!activeTab) {
        notFound();
    }

    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, md: 3, lg: 2 }}>
                    <Flex
                        direction={{ base: "row", sm: "row", md: "column" }}
                        justify={{ base: "center", md: "start" }}
                        gap={{ base: "xs", sm: 4 }}
                    >
                        {tabItems}
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 9, lg: 10 }}>
                    <AmePaper px="md">{children}</AmePaper>
                </Grid.Col>
            </Grid>
        </>
    );
}

export default Layout;
