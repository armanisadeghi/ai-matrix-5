'use client';

import { Card, Title, Text, Button, Container, Center } from '@mantine/core';

const NotFoundPage = () => {
    return (
        <Container style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Center>
                    <Title order={1} style={{ fontSize: 100, fontWeight: 900 }}>Oops!</Title>
                </Center>
                <Text size="lg" mt="md" ta="center">Not sure what to say...</Text>
                <Text size="md" mt="xs" c="dimmed" ta="center">
                    We knew we shouldn't have let Armani try writing React Code!
                </Text>
                <Center mt="xl">
                    <Button variant="outline" size="md" onClick={() => window.location.href = '/'}>
                        Please try to reload the page
                    </Button>
                </Center>
            </Card>
        </Container>
    );
};

export default NotFoundPage;
