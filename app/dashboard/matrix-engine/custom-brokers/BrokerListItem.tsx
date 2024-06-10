"use client";
import React from 'react';
import { Pill, ActionIcon, Group, Paper, Title, Button, Card, Stack, Text, Badge } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Broker } from '@/types/broker';
import { createBrokerManager } from '@/services/brokerService';

interface BrokerListItemProps {
    broker: Broker;
    user: boolean
}

const BrokerListItem = ({ broker, user }: BrokerListItemProps) => {
    const brokerManager = createBrokerManager();

    const handleDelete = async () => {
        await brokerManager.deleteBroker(broker.id);
    };

    const handleEdit = () => {
        brokerManager.setCurrentBroker(broker)
    }
    return (
        <Card radius="md" withBorder p="xs" w="100%" onClick={handleEdit} onMouseEnter={(e) => (e.currentTarget.style.border = '1px solid gray')}
            onMouseLeave={(e) => (e.currentTarget.style.border = '')}
            style={{ transition: 'border-color 0.3s ease' }}>
            <Group justify='space-between' align='flex-start'>
                <Group align='flex-start'>
                    {/* <Badge
                        size="xs"
                        variant="gradient"
                        gradient={broker.id.split('-')[0] === 'system' ? { from: 'red', to: 'orange', deg: 130 } : { from: 'blue', to: 'green', deg: 130 }}
                    >
                        {broker.id.split('-')[0] === 'system' ? 'System Broker' : 'Custom Broker'}
                    </Badge> */}
                    <Title order={6}>{broker.name}</Title>
                    {broker.component && <Pill>{broker.component.type}</Pill>}
                    <Text size='xs' c={'gray.6'}>{`Default Value: 
                                ${typeof broker.component.defaultValue === 'string' ||
                            typeof broker.component.defaultValue === 'number' ||
                            typeof broker.component.defaultValue === 'boolean' ? (
                            broker.component.defaultValue.toString()
                        ) : Array.isArray(broker.component.defaultValue) ? (
                            broker.component.defaultValue.join(', ')
                        ) : broker.component.defaultValue instanceof File ? (
                            broker.name
                        ) : (
                            'No value'
                        )}`}
                    </Text>
                    <Text size='xs' c={'gray.6'}>{broker.description}</Text>
                </Group>
                <Group justify="flex-end">
                    <ActionIcon onClick={handleDelete}>
                        <IconTrash size={14} />
                    </ActionIcon>
                </Group>
            </Group>

        </Card>
    );
};

export default BrokerListItem;