'use client';

import { AppShell, Burger, Button, Group } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { ReactNode } from 'react';
import { Logo } from '@/components';

type Props = { children: ReactNode };

export function GuestLayout(props: Props) {
  const { children } = props;
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 }, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Logo />
          </Group>
          <Group gap={2}>
            <Button variant="subtle">About</Button>
            <Button variant="subtle">Careers</Button>
            <Button variant="subtle">Team</Button>
            <Button variant="subtle">Syndicate</Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
