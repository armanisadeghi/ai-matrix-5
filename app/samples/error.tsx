'use client'

import { Card, Title, Text, Button, Container, Center } from '@mantine/core'

const NotFoundPage = () => {
    return (
        <Container
            style={{
                height: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Center>
                    <Title order={1} style={{ fontSize: 100, fontWeight: 900 }}>
                        404
                    </Title>
                </Center>
                <Text size="lg" mt="md" ta="center">
                    Page not found.
                </Text>
                <Text size="md" mt="xs" c="dimmed" ta="center">
                    We knew we shouldn't have let Armani try writing React Code!
                </Text>
                <Center mt="xl">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => (window.location.href = '/')}
                    >
                        Go back to homepage
                    </Button>
                </Center>
            </Card>
        </Container>
    )
}

export default NotFoundPage
