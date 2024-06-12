"use client";
import React, { useState } from 'react';
import { Pill, ActionIcon, Group, Title, Card, Text, Collapse } from '@mantine/core';
import { IconTrash, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Broker as BrokerType } from '@/types/broker';
import Broker from "./Broker"
import { createBrokerManager } from '@/services/brokerService';

interface BrokerListItemProps {
    broker: BrokerType;
    user: boolean
}

const BrokerListItem = ({ broker, user }: BrokerListItemProps) => {
    const [open, setOpen] = useState(false);
    const brokerManager = createBrokerManager();

    const handleDelete = async () => {
        await brokerManager.deleteBroker(broker.id);
    };

    const handleEdit = (e: any) => {
        e.stopPropagation()
        setOpen((prev) => !prev)
    }
    return (
        <Card radius="md" withBorder p="xs" w="100%" onMouseEnter={(e) => (e.currentTarget.style.border = '1px solid gray')}
            onMouseLeave={(e) => (e.currentTarget.style.border = '')}
            style={{ transition: 'border-color 0.3s ease' }}>
            <Group justify='space-between' align='flex-start'>
                <Group align='center'>
                    <Title order={6}>{broker.name}</Title>
                    {broker.component && <><Pill>{broker.component.type}</Pill>
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
                        </Text></>}
                    <Text size='xs' c={'gray.6'}>{broker.description}</Text>
                </Group>
                {open ? <IconChevronUp size={14} color="gray" onClick={() => setOpen((prev) => !prev)} cursor={'pointer'} /> : <IconChevronDown onClick={() => setOpen((prev) => !prev)} size={14} color="gray" cursor={'pointer'} />}
            </Group>
            <Collapse in={open}>
                <Group py={10}>
                    <Broker broker={broker} />
                </Group>
                <Group right={10}>
                    <ActionIcon onClick={handleDelete} >
                        <IconTrash size={14} />
                    </ActionIcon></Group>
            </Collapse>
        </Card >
    );
};

export default BrokerListItem;