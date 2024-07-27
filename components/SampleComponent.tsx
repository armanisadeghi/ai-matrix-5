// components/SampleComponent.tsx

'use client';

import React, { useState } from 'react';
import { Button, Group, Select, Text, Stack, Box, SimpleGrid, Progress } from '@mantine/core';
import { IconFileExport } from '@tabler/icons-react';

const ExportIcon = () => <IconFileExport size={14} />;

export default function SampleComponent() {
    const [language, setLanguage] = useState<string | null>(null);

    return (
        <Stack gap="xl">
            <Group justify="space-between" mb="md">
                <Select
                    label="Your favorite programming language"
                    placeholder="Pick a language"
                    value={language}
                    onChange={setLanguage}
                    data={['Python', 'TypeScript', 'HTML', 'React-Native']}
                    // Correct: Use 'data' prop for options, not 'options'
                />
            </Group>

            <Text size="sm" fw={500} c="blue" ta="center">
                Sample text demonstrating size, weight, color, and alignment
                {/* Correct: Use 'c' for color, not 'color' */}
                {/* Correct: Use 'ta' for text align, not 'textAlign' */}
            </Text>

            <Button
                disabled={!language}
                leftSection={<ExportIcon />}
                // Correct: Use 'leftSection' for icon, not 'leftIcon'
            >
                Export
            </Button>

            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 4 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
                // Correct: Use 'cols' for responsive columns, not 'columns'
            >
                <div>Grid Item 1</div>
                <div>Grid Item 2</div>
                <div>Grid Item 3</div>
                <div>Grid Item 4</div>
            </SimpleGrid>

            <Box
                style={(theme) => ({
                    backgroundColor: theme.colors.gray[1],
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.sm,
                })}
                // Correct: Use 'style' function for theme access, not 'sx'
            >
                <Text>Themed Box Content</Text>
            </Box>

            <Progress.Root size="xl">
                <Progress.Section value={60} color="cyan">
                    <Progress.Label>Documents</Progress.Label>
                </Progress.Section>
                <Progress.Section value={40} color="pink">
                    <Progress.Label>Photos</Progress.Label>
                </Progress.Section>
                {/* Correct: Use Progress.Root and Progress.Section, not just Progress */}
            </Progress.Root>

            {/* Incorrect usage example (commented out) */}
            {/*
             <Group grow>
             First string
             <>
             <div>element inside fragment</div>
             <div>another inside fragment</div>
             </>
             {20}
             </Group>
             */}
            {/* Incorrect: Group should only contain React elements, not strings or fragments */}
        </Stack>
    );
}
