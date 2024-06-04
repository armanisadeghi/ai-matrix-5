"use client";
import React from 'react';
import { Pill, ActionIcon, Group, Paper, Title, Button, Card } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Broker } from '@/types/broker';
import { useBroker } from '@/context/brokerContext';

interface BrokerListItemProps {
    broker: Broker;
}

const BrokerListItem = ({ broker }: BrokerListItemProps) => {
    const { deleteBroker, setCurrentBroker } = useBroker();

    return (
        <Card radius="md" withBorder p="md" w="100%" onClick={() => setCurrentBroker(broker)} onMouseEnter={(e) => (e.currentTarget.style.border = '1px solid gray')}
            onMouseLeave={(e) => (e.currentTarget.style.border = '')}
            style={{ transition: 'border-color 0.3s ease' }}>
            <Group p="apart">
                <Title order={5}>{broker.name}</Title>
            </Group>
            <Group p="apart" m="xs" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ActionIcon onClick={() => setCurrentBroker(broker)}>
                    <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon onClick={() => deleteBroker(broker.id)}>
                    <IconTrash size={16} />
                </ActionIcon>
            </Group>
        </Card>
    );
};

export default BrokerListItem;