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
            <Button variant="subtle">Features</Button>
            <Button variant="subtle">Testimonials</Button>
            <Button variant="subtle">Pricing</Button>
            <Button variant="subtle">Sign In</Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
