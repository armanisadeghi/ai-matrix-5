"use client";
import React from 'react';
import { Pill, ActionIcon, Group, Paper, Title } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Broker } from '@/types/broker';

interface BrokerListItemProps {
    broker: Broker;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const BrokerListItem = ({ broker, onDelete, onEdit }: BrokerListItemProps) => {
    const { name = '' } = broker;

    return (
        <Paper withBorder radius="md" p="md" shadow="sm" style={{ width: '100%' }}>
            <Group p="apart">
                <Title order={5}>{name}</Title>
            </Group>
            <Group p="apart" m="xs" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ActionIcon onClick={() => onEdit(broker.id)}>
                    <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon onClick={() => onDelete(broker.id)}>
                    <IconTrash size={16} />
                </ActionIcon>
            </Group>
        </Paper>
    );
};

export default BrokerListItem;