"use client";

import { Box, rem, Tabs, Title } from "@mantine/core";
import { IconMoodCog, IconSettings, IconUserCircle } from "@tabler/icons-react";
import PersonalInformation from "@/app/account/settings/tabs/PersonalInformation";
import Preferences from "@/app/account/settings/tabs/Preferences";

const iconStyle = { width: rem(14), height: rem(14) };

const SettingsPage = () => {
  return (
    <>
      <Box>
        <Title order={3} mb="md">
          Clients
        </Title>
        <Tabs defaultValue="personal">
          <Tabs.List mb="lg">
            <Tabs.Tab
              value="personal"
              leftSection={<IconUserCircle style={iconStyle} />}
            >
              Personal Information
            </Tabs.Tab>
            <Tabs.Tab
              value="preferences"
              leftSection={<IconMoodCog style={iconStyle} />}
            >
              Preferences
            </Tabs.Tab>
            <Tabs.Tab
              value="connections"
              leftSection={<IconSettings style={iconStyle} />}
            >
              Connections
            </Tabs.Tab>
            <Tabs.Tab
              value="billing"
              leftSection={<IconSettings style={iconStyle} />}
            >
              Billing
            </Tabs.Tab>
            <Tabs.Tab
              value="security"
              leftSection={<IconSettings style={iconStyle} />}
            >
              Security
            </Tabs.Tab>
            <Tabs.Tab
              value="notifications"
              leftSection={<IconSettings style={iconStyle} />}
            >
              Notifications
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="personal">
            <PersonalInformation />
          </Tabs.Panel>

          <Tabs.Panel value="preferences">
            <Preferences />
          </Tabs.Panel>

          <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default SettingsPage;
