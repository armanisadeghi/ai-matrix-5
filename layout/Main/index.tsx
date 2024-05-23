'use client';

import {AppShell, Combobox} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import { Navbar } from '@/layout/Main/Navbar';
import { Header } from '@/layout/Main/Header';
import { Footer } from '@/layout/Main/Footer';

type Props = { children: ReactNode };

export function MainLayout(props: Props) {
  const { children } = props;
  const [opened, { toggle }] = useDisclosure();

  return (
      <AppShell
          header={{ height: 60 }}
          navbar={{
              width: { base: 150, md: 200, lg: 250 },
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
          }}
          footer={{ height: 60 }}
          padding="md"
      >
          <AppShell.Header>
              <Header opened={opened} toggle={toggle} />
          </AppShell.Header>
          <AppShell.Navbar px='xs' pt="md">
              <Navbar />
          </AppShell.Navbar>
          <AppShell.Main>{children}</AppShell.Main>
          <AppShell.Footer>
              <Footer/>
          </AppShell.Footer>
      </AppShell>

  );
}
