"use client";
import React from 'react';
import { Pill, ActionIcon, Group, Paper } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';

interface Broker {
    id: string;
    name?: string;
    tags: string[];
}

interface BrokerListItemProps {
    broker: Broker;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const BrokerListItem = ({ broker, onDelete, onEdit }: BrokerListItemProps) => {
    const { name = '', tags } = broker;

    return (
        <Paper withBorder radius="md" p="md" shadow="sm" style={{ width: '100%' }}>
            <Group p="apart">
                <div>{name}</div>
                <Group m="xs" p="apart">
                    {tags.map((tag) => (
                        <Pill key={tag} variant="contrast">
                            {tag}
                        </Pill>
                    ))}
                </Group>
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