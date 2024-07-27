import React, { useState } from 'react';
import {
    Text,
    Button,
    Stack,
    Group,
    Divider,
    Box,
    TextInput,
    Switch,
    Paper,
    Collapse,
    ActionIcon,
    Container,
} from '@mantine/core';
import { IconChevronLeft, IconMessageCircle, IconCalendar, IconChevronDown, IconChevronUp, IconBrandGithub, IconCheck, IconCode } from '@tabler/icons-react';
import styles from './SetupPageNew.module.css';

const Sidebar = () => (
    <Stack>
        <Button leftSection={<IconChevronLeft size={14} />} variant="subtle" color="gray">
            Back
        </Button>
        <Text size="xl" fw={600} className={styles.textPop}>Get started</Text>
        <Text size="sm" c="dimmed">Please follow the steps to configure your repository and deploy it.</Text>

        <Text size="xs" fw={700} c="dimmed" tt="uppercase">Git repo</Text>
        <Group gap="xs">
            <IconBrandGithub size={16} />
            <Text size="xs" component="a" href="https://github.com/restackio/starter-genai-langchain-py" target="_blank" rel="noopener noreferrer">
                restackio/starter-genai-langchain-py
            </Text>
        </Group>

        <Divider my="sm" />

        <Text c="dimmed">Need help?</Text>
        <Stack gap="xs">
            <Text size="xs" c="dimmed">Our team is available by chat.</Text>
            <Button leftSection={<IconMessageCircle size={14} />} variant="default" size="xs">
                Chat with us
            </Button>
        </Stack>
        <Stack gap="xs">
            <Text size="xs" c="dimmed">Our CTO can help you build an AI product.</Text>
            <Button leftSection={<IconCalendar size={14} />} variant="default" size="xs">
                Book a session
            </Button>
        </Stack>
    </Stack>
);

const SetupStep = ({ title, isActive, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Paper p="md" style={{ opacity: isActive ? 1 : 0.5, pointerEvents: isActive ? 'auto' : 'none' }}>
            <Group justify="space-between" mb="xs">
                <Text tt="uppercase" fw={700} size="xs" className={styles.textSubtlePop}>{title}</Text>
                <ActionIcon onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                </ActionIcon>
            </Group>
            <Collapse in={isOpen}>
                {children}
            </Collapse>
        </Paper>
    );
};

const SetupPageLayout = () => (
    <Container size="xl">
        <Group align="flex-start" gap="xl">
            <Box w={300}>
                <Sidebar />
            </Box>
            <Stack style={{ flex: 1 }}>
                <SetupStep title="Create repository" isActive={true}>
                    <Stack>
                        <Text size="sm">To ensure you can easily update your project after deploying it, a Git repository must be created. Every push to that Git repository will be deployed automatically.</Text>
                        <Box>
                            <Text fw={500} size="sm" mb={4} className={styles.textSubtlePop}>Organization</Text>
                            <Button leftSection={<IconBrandGithub size={14} />} variant="filled" color="indigo">
                                + Add GitHub organization
                            </Button>
                        </Box>
                        <TextInput
                            label={<Text className={styles.textSubtlePop}>Repository name</Text>}
                            defaultValue="starter-genai-langchain-py"
                        />
                        <Switch label={<Text className={styles.textSubtlePop}>Create private Repository</Text>} />
                        <Button variant="filled">Create</Button>
                    </Stack>
                </SetupStep>

                <SetupStep title="Local setup" isActive={false}>
                    <Stack>
                        <Text size="sm">You are ready to run your repository locally:</Text>
                        <Paper p="sm" withBorder>
                            <Group justify="space-between">
                                <Text size="sm" className={styles.textSubtlePop}>Open it in your favorite code editor:</Text>
                                <Group>
                                    <Button variant="default" size="xs">VS Code</Button>
                                    <Button variant="default" size="xs">Cursor</Button>
                                    <Button variant="default" size="xs">JetBrains IDE</Button>
                                </Group>
                            </Group>
                        </Paper>
                        <Paper p="sm" withBorder>
                            <Group justify="space-between">
                                <Text size="sm" className={styles.textSubtlePop}>Or directly on GitHub:</Text>
                                <Button variant="default" size="xs">Open GitHub repo</Button>
                            </Group>
                        </Paper>
                        <Text size="sm">Push a commit and Restack will automatically build and deploy your application.</Text>
                    </Stack>
                </SetupStep>

                <SetupStep title="Deploy" isActive={false}>
                    <Stack>
                        <Text size="sm" className={styles.textSubtlePop}>Preparing repository.</Text>
                        <Paper p="sm" withBorder>
                            <Stack>
                                <Group>
                                    <IconCheck size={16} />
                                    <Text size="sm" className={styles.textSubtlePop}>GitHub commit</Text>
                                </Group>
                                <Group>
                                    <IconCode size={16} />
                                    <Text size="sm" className={styles.textSubtlePop}>Building logs</Text>
                                </Group>
                                <Group>
                                    <IconCode size={16} />
                                    <Text size="sm" className={styles.textSubtlePop}>Deploying application</Text>
                                </Group>
                            </Stack>
                        </Paper>
                    </Stack>
                </SetupStep>
            </Stack>
        </Group>
    </Container>
);

export default SetupPageLayout;
