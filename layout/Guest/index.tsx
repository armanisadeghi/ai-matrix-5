'use client';

import { AppShell, Burger, Button, Group, Skeleton } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { ReactNode } from 'react';
import Link from 'next/link';
import { Logo } from '@/components';
import { useAuth0 } from '@auth0/auth0-react';

type Props = { children: ReactNode };

export function GuestLayout(props: Props) {
  const { children } = props;
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 120 });
  const { isAuthenticated, user } = useAuth0();

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
            {
              isAuthenticated ? (
                <Button variant="subtle" component={Link} href="/logout">{user?.name}</Button>
              ) : (
                <Button variant="subtle" component={Link} href="/login">Sign In</Button>
              )
            }
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell >
  );
}
