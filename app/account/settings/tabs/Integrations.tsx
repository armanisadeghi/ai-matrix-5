import { Button, Divider, Flex, Image, Paper, PaperProps, SimpleGrid, Stack, Switch, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import products from "../../../data/product_connections.json";

interface ProductCardProps extends PaperProps {
    id: string;
    name: string;
    description: string;
    avatar_url: string;
    domain_url: string;
}

function Card({ avatar_url, domain_url, name, description }: ProductCardProps) {
    return (
        <Paper withBorder p="sm">
            <Flex>
                <Stack>
                    <Flex gap="sm">
                        <Image src={avatar_url} w={24} h={24} fit="contain" />
                        <Text fw={600} size="lg">
                            {name}
                        </Text>
                    </Flex>
                    <Text size="sm" c="dimmed" lineClamp={2}>
                        {description}
                    </Text>
                </Stack>
                <Switch />
            </Flex>
            <Button variant="default" mt="md" size="xs">
                View integration
            </Button>
        </Paper>
    );
}

function Integrations() {
    return (
        <>
            <Flex justify="space-between">
                <Stack gap="xs">
                    <Title order={4}>Integrations and connected apps</Title>
                    <Text>Supercharge your workflow and connect the tool you use every day.</Text>
                </Stack>
                <Button variant="default" leftSection={<IconPlus />}>
                    Request integration
                </Button>
            </Flex>
            <Divider my="md" />
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md" verticalSpacing="md">
                {products.slice(0, 20).map((p) => (
                    <Card key={p.id} {...p} />
                ))}
            </SimpleGrid>
        </>
    );
}

export default Integrations;
