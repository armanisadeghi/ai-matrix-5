import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';

export interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    badgeText: string;
    link: string;
}

export function CustomCard({ title, description, imageUrl, badgeText, link }: CardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Link href={link} passHref>
                <a>
                    <Card.Section>
                        <Image src={imageUrl} height={160} alt={title} />
                    </Card.Section>
                </a>
            </Link>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title}</Text>
                <Badge color="pink">{badgeText}</Badge>
            </Group>

            <Text size="sm" color="dimmed">
                {description}
            </Text>

            <Link href={link} passHref>
                <Button component="a" color="blue" fullWidth mt="md" radius="md">
                    Book classic tour now
                </Button>
            </Link>
        </Card>
    );
}
