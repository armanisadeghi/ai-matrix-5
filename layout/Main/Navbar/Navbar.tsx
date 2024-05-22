import { Group, Code, ScrollArea, rem, Box, TextInput } from '@mantine/core';
import {
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconSearch,
  IconAi,
  IconTools,
  IconLayersIntersect,
  IconGrid3x3,
  IconAutomation,
  IconGrid4x4,
  IconCurrency,
  IconSettings,
  IconSettingsCog,
} from '@tabler/icons-react';
import { LinksGroup, Logo } from '@/components';

import classes from './Navbar.module.css';
import { UserButton } from '@/components/UserButton';

const mockdata = [
  {
    label: 'Intelligence',
    icon: IconGauge,
    initiallyOpened: true,
    links: [
      { label: 'AI Cha', link: '/' },
      { label: 'Custom Bots', link: '/' },
      { label: 'Bot Builder', link: '/' },
    ],
  },
  {
    label: 'AI Apps',
    icon: IconAi,
    links: [
      { label: 'Legal', link: '/' },
      { label: 'Medical', link: '/' },
      { label: 'Marketing', link: '/' },
      { label: 'SEO', link: '/' },
      { label: 'Kids', link: '/' },
      { label: 'School', link: '/' },
      { label: 'Fun', link: '/' },
      { label: 'Image', link: '/' },
      { label: 'Video', link: '/' },
      { label: 'Others', link: '/' },
    ],
  },
  {
    label: 'Productivity',
    icon: IconCalendarStats,
    links: [
      { label: 'Messenger', link: '/' },
      { label: 'Email', link: '/' },
      { label: 'Task Manager', link: '/' },
      { label: 'Calendar', link: '/' },
      { label: 'Meetings', link: '/' },
    ],
  },
  {
    label: 'Analytics',
    icon: IconPresentationAnalytics,
    links: [
      { label: 'Messenger', link: '/' },
      { label: 'Email', link: '/' },
      { label: 'Task Manager', link: '/' },
      { label: 'Calendar', link: '/' },
      { label: 'Meetings', link: '/' },
    ],
  },
  {
    label: 'Tools',
    icon: IconTools,
    links: [
      { label: 'Audio', link: '/' },
      { label: 'Image', link: '/' },
      { label: 'Video', link: '/' },
      { label: 'PDF', link: '/' },
      { label: 'Text', link: '/' },
      { label: 'Web', link: '/' },
      { label: 'Writing', link: '/' },
      { label: 'Marketing', link: '/' },
      { label: 'SEO', link: '/' },
    ],
  },
  {
    label: 'Integrations',
    icon: IconLayersIntersect,
    links: [
      { label: 'Shopify', link: '/' },
      { label: 'Wordpress', link: '/' },
      { label: 'Zappier', link: '/' },
      { label: 'Google', link: '/' },
      { label: 'Microsoft', link: '/' },
      { label: 'GitHub', link: '/' },
    ],
  },
  {
    label: 'Matrix Ending',
    icon: IconGrid3x3,
    links: [
      { label: 'Prompt Playground', link: '/' },
      { label: 'Agents', link: '/' },
      { label: 'Super Agents', link: '/' },
      { label: 'Recipes', link: '/' },
      { label: 'Tools', link: '/' },
      { label: 'Knowledge', link: '/' },
      { label: 'System Brokers', link: '/' },
      { label: 'Custom Brokers', link: '/' },
    ],
  },
  {
    label: 'Automation Matrix',
    icon: IconAutomation,
    links: [
      { label: 'Actions', link: '/' },
      { label: 'Tasks', link: '/' },
      { label: 'Clusters', link: '/' },
      { label: 'Hyperclustures', link: '/' },
    ],
  },
  {
    label: 'Matrix Apps',
    icon: IconGrid4x4,
    links: [
      { label: 'App Builder', link: '/' },
      { label: 'App Tester', link: '/' },
      { label: 'App Components', link: '/' },
    ],
  },
  {
    label: 'Agency Manager',
    icon: IconCurrency,
    links: [
      { label: 'Manage Clients', link: '/' },
      { label: 'Manage Users', link: '/' },
      { label: 'Agency Settings', link: '/' },
      { label: 'Secrets Manager', link: '/' },
    ],
  },
  {
    label: 'Admin',
    icon: IconSettings,
    links: [
      { label: 'Agencies', link: '/' },
      { label: 'Clients', link: '/' },
      { label: 'Users', link: '/' },
      { label: 'Configuration', link: '/' },
    ],
  },
  {
    label: 'Super Admin',
    icon: IconSettingsCog,
    links: [
      { label: 'Function Manager', link: '/' },
      { label: 'System Apps', link: '/' },
      { label: 'Access Management', link: '/' },
    ],
  },
];

export function Navbar() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <>
      <Box hiddenFrom="sm" className={classes.header}>
        <Group justify="space-between">
          <Logo />
        </Group>
      </Box>

      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
        mb="sm"
      />

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </>
  );
}
