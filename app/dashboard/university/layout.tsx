"use client";

import { Box, Button } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import { TabButtons } from "./components";

const TabButton = ({ value, label, activeTab, onClick }) => (
    <Button value={value} variant={value === activeTab ? "filled" : "subtle"} onClick={() => onClick(value)}>
        {label}
    </Button>
);

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("");

    const handleTabChange = (path: string) => {
        router.push(path, { scroll: false });
        setActiveTab(path);
    };

    useMemo(() => {
        if (pathname) {
            const p = pathname.split("/")[pathname.split("/").length - 1];

            setActiveTab(p);
        }
    }, [pathname]);

    return (
        <>
            <TabButtons activeTab={activeTab} handleTabChange={handleTabChange} />
            <Box mt="md">{children}</Box>
        </>
    );
}
