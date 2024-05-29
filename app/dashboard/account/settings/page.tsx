"use client";

import { Box, rem, Tabs, Title } from "@mantine/core";
import { IconAffiliate, IconBellCog, IconMoodCog, IconSettings, IconUserCircle } from "@tabler/icons-react";
import PersonalInformation from "@/app/dashboard/account/settings/tabs/PersonalInformation";
import Preferences from "@/app/dashboard/account/settings/tabs/Preferences";
import Integrations from "@/app/dashboard/account/settings/tabs/Integrations";
import Billing from "@/app/dashboard/account/settings/tabs/Billing";
import Notifications from "@/app/dashboard/account/settings/tabs/Notifications";
import Security from "@/app/dashboard/account/settings/tabs/Security";

const iconStyle = { width: rem(14), height: rem(14) };

const SettingsPage = () => {
    return (
        <>
            <Box>
                <Title order={3} mb="md">
                    Settings
                </Title>
                <Tabs defaultValue="personal">
                    <Tabs.List mb="lg" style={{ flexWrap: "nowrap", width: "100%", overflowY: "auto" }}>
                        <Tabs.Tab value="personal" leftSection={<IconUserCircle style={iconStyle} />}>
                            Personal Information
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

                    <Tabs.Panel value="personal">
                        <PersonalInformation />
                    </Tabs.Panel>

                    <Tabs.Panel value="preferences">
                        <Preferences />
                    </Tabs.Panel>

                    <Tabs.Panel value="integrations">
                        <Integrations />
                    </Tabs.Panel>

                    <Tabs.Panel value="billing">
                        <Billing />
                    </Tabs.Panel>

                    <Tabs.Panel value="security">
                        <Security />
                    </Tabs.Panel>

                    <Tabs.Panel value="notifications">
                        <Notifications />
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </>
    );
};

export default SettingsPage;
