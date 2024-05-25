import { Flex, Paper, Stack, Title, Text, Switch, Divider } from "@mantine/core";

const notifications = [
    { title: "General newsletter", description: "News, announcements & product updates" },
    { title: "Weekly activity report", description: "Weekly digest of top content & media" },
    { title: "Weekly blog posts", description: "Weekly feed of the most popular blog posts" },
];

function Notifications() {
    return (
        <>
            <Paper withBorder p="md">
                <Title order={5} mb="md">
                    Newsletters
                </Title>
                <Stack>
                    {notifications.map((item) => (
                        <>
                            <Flex key={item.title}>
                                <Stack gap={2}>
                                    <Text>{item.title}</Text>
                                    <Text size="sm">{item.description}</Text>
                                </Stack>
                                <Switch ml="auto" />
                            </Flex>
                            <Divider />
                        </>
                    ))}
                </Stack>
            </Paper>
        </>
    );
}

export default Notifications;
