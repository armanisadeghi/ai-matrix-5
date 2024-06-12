import React, { useState } from 'react';
import { Group, Container, Text, Badge, Burger, Paper, Stack } from '@mantine/core';

const LeftPanel: React.FC = () => {
    const [opened, setOpened] = useState(false);

    return (
        <Paper>
            <Stack>
                <Text>Categories</Text>
            </Stack>
        </Paper>
    );
};

export default LeftPanel;