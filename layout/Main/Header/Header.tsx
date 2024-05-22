import React from 'react';
import { ActionIcon, Burger, BurgerProps, Group, TextInput } from '@mantine/core';
import { ColorSchemeToggle, Logo } from '@/components';
import { IconBell, IconSearch } from '@tabler/icons-react';

type Props = {
  opened: BurgerProps['opened'];
  toggle: () => void;
};

export function Header(props: Props) {
  const { toggle, opened } = props;

  return (
    <Group h="100%" px="md" align="center" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Logo />
      </Group>
      <Group>
        <TextInput
          leftSection={<IconSearch size={16} />}
          placeholder="Search information, messages and resources"
          w={500}
        />
      </Group>
      <Group>
        <ColorSchemeToggle />
        <ActionIcon>
          <IconBell size={18} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
