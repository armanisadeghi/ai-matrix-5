"use client";
import React from 'react';
import { Pill, ActionIcon, Group, Paper, Title, Button, Card, Stack, Text, Badge } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Broker } from '@/types/broker';
import { useBroker } from '@/context/brokerContext';

interface BrokerListItemProps {
    broker: Broker;
    user: boolean
}

const BrokerListItem = ({ broker, user }: BrokerListItemProps) => {
    const { deleteBroker, setCurrentBroker } = useBroker();

    return (
        <Card radius="md" withBorder p="md" w="100%" onClick={() => setCurrentBroker(broker)} onMouseEnter={(e) => (e.currentTarget.style.border = '1px solid gray')}
            onMouseLeave={(e) => (e.currentTarget.style.border = '')}
            style={{ transition: 'border-color 0.3s ease' }}>
            <Group justify='space-between' align='flex-start'>
                <Group align='flex-start'>
                    <Stack>
                        <Group>
                            <Badge
                                size="xs"
                                variant="gradient"
                                gradient={{ from: 'blue', to: 'cyan', deg: 130 }}
                            >
                                Custom Broker
                            </Badge>
                            <Title order={5}>{broker.name}</Title>
                            {broker.components && broker.components.map((c, i) => <Pill key={i}>{c.type}</Pill>)}
                            <Text size='xs' c={'gray.6'}>{`Default Value: 
                                ${typeof broker.defaultValue === 'string' ||
                                    typeof broker.defaultValue === 'number' ||
                                    typeof broker.defaultValue === 'boolean' ? (
                                    broker.defaultValue.toString()
                                ) : Array.isArray(broker.defaultValue) ? (
                                    broker.defaultValue.join(', ')
                                ) : broker.defaultValue instanceof File ? (
                                    broker.defaultValue.name
                                ) : (
                                    'No value'
                                )}`}
                            </Text>
                        </Group>
                        <Text size='xs' c={'gray.6'}>{broker.description}</Text>
                    </Stack>
                </Group>
                {user === false &&
                    <Group justify="flex-end">
                        <ActionIcon onClick={() => setCurrentBroker(broker)}>
                            <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon onClick={() => deleteBroker(broker.id)}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                }
            </Group>

        </Card>
    );
};

export default BrokerListItem;