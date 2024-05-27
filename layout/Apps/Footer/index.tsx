import React from 'react';
import {Button, Group, Text} from "@mantine/core";

export function Footer(): React.JSX.Element {
    return (
        <Group h="100%" px="md" align="center" justify="space-between">
            <Text>
                Powered by AI Matrix
            </Text>
            <Group>
                <Button variant="subtle">Support</Button>
                <Button variant="subtle">Help</Button>
            </Group>
        </Group>

    );
}
