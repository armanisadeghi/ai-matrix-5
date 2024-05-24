"use client";

import { Box, rem, Tabs, Title } from "@mantine/core";
import {
  IconMessageCircle,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import PersonalInformation from "@/app/account/settings/tabs/PersonalInformation";

const iconStyle = { width: rem(12), height: rem(12) };

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
              leftSection={<IconMessageCircle style={iconStyle} />}
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

          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

          <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default SettingsPage;
