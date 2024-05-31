"use client";
import React from 'react';
import { Pill, ActionIcon, Group, Paper, Title, Button, Card } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Broker } from '@/types/broker';

interface BrokerListItemProps {
    broker: Broker;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    isEditing: boolean;
}

const BrokerListItem = ({ broker, onDelete, onEdit, isEditing }: BrokerListItemProps) => {
    const { name = '', id } = broker;

    return (
        <Card radius="md" p="md" w="100%" onClick={() => onEdit(id)} shadow={isEditing ? 'md' : 'none'} style={{ outline: isEditing ? '1px solid lightgray' : 'none' }}>
            <Group p="apart">
                <Title order={5}>{name}</Title>
            </Group>
            <Group p="apart" m="xs" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ActionIcon onClick={() => onEdit(id)}>
                    <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon onClick={() => onDelete(id)}>
                    <IconTrash size={16} />
                </ActionIcon>
            </Group>
        </Card>
    );
};

export default BrokerListItem;