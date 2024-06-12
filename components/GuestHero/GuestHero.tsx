import { Button, Container, Group, Image, Text, Title } from '@mantine/core';
import { IconArrowUpRight, IconBrain } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './GuestHero.module.scss';

export function GuestHero() {
  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Group gap="xs" mb="lg" className={classes.highlight}>
            <IconBrain />
            <Text fw={500}>AI MATRIX ENGINE</Text>
          </Group>
          <Title mb="lg" className={classes.title}>
            The Only No-Code <br />
            Artificial Intelligence Business Automation Framework.
          </Title>
          <Text c="dimmed" mb="lg" className={classes.subtitle}>
            AI Matrix bridges the gap between current AI capabilities and your real-world business.
          </Text>
          <Group mt={30}>
            <Button size="md" component={Link} href="/dashboard">
              Get started
            </Button>
            <Button size="md" variant="light" rightSection={<IconArrowUpRight />}>
              Learn More
            </Button>
          </Group>
        </div>
        <Image src="/welcome-hero.png" className={classes.image} />
      </div>
    </Container>
  );
}
