import { Group, Highlight, UnstyledButton, useMantineTheme } from '@mantine/core';
import { IconBrain } from '@tabler/icons-react';

export function Logo() {
  const theme = useMantineTheme();
  return (
    <Group component={UnstyledButton}>
      <IconBrain color={theme.colors.blue[6]} />
      <Highlight
        highlight="ai"
        fw={500}
        fz="lg"
        highlightStyles={{
          backgroundImage:
            'linear-gradient(45deg, var(--mantine-color-blue-5), var(--mantine-color-violet-7))',
          fontWeight: 700,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        AI Matrix
      </Highlight>
    </Group>
  );
}
