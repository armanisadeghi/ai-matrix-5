"use client";

import { rem, Tabs } from "@mantine/core";
import {
    IconAffiliate,
    IconBellCog,
    IconMoodCog,
    IconPalette,
    IconSettings,
    IconUserCircle,
} from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { notFound, usePathname, useRouter } from "next/navigation";
import { getActiveTab } from "@/utils/tabUtils";
import { PATH_USER } from "@/routes";

const iconStyle = { width: rem(18), height: rem(18) };

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    const router = useRouter();
    const currentPath = usePathname();
    const [activeTab, setActiveTab] = useState<string | null>(getActiveTab(currentPath));

    const onTabChange = (value: string | null) => {
        router.push(PATH_USER.tabs(value ?? "#"));
        setActiveTab(value);
    };

    if (!activeTab) {
        notFound();
    }

    return (
        <>
            <Tabs value={activeTab} onChange={onTabChange} variant="outline">
                <Tabs.List mb="lg" style={{ flexWrap: "nowrap", width: "100%", overflowY: "auto" }}>
                    <Tabs.Tab value="personal" leftSection={<IconUserCircle style={iconStyle} />}>
                        Personal Information
                    </Tabs.Tab>
                    <Tabs.Tab value="appearance" leftSection={<IconPalette style={iconStyle} />}>
                        Appearance
                    </Tabs.Tab>
                    <Tabs.Tab value="preferences" leftSection={<IconMoodCog style={iconStyle} />}>
                        Preferences
                    </Tabs.Tab>
                    <Tabs.Tab value="integrations" leftSection={<IconAffiliate style={iconStyle} />}>
                        Integrations
                    </Tabs.Tab>
                    <Tabs.Tab value="billing" leftSection={<IconSettings style={iconStyle} />}>
                        Billing
                    </Tabs.Tab>
                    <Tabs.Tab value="security" leftSection={<IconSettings style={iconStyle} />}>
                        Security
                    </Tabs.Tab>
                    <Tabs.Tab value="notifications" leftSection={<IconBellCog style={iconStyle} />}>
                        Notifications
                    </Tabs.Tab>
                </Tabs.List>

                {activeTab ? <Tabs.Panel value={activeTab}>{children}</Tabs.Panel> : <p>undefined tab</p>}
            </Tabs>
        </>
    );
}

export default Layout;
