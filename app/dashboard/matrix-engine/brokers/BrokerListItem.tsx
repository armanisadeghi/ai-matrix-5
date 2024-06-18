"use client";
import React, { useState } from 'react';
import { Pill, ActionIcon, Group, Title, Card, Text, Collapse, Flex } from '@mantine/core';
import { IconTrash, IconChevronDown, IconChevronUp, IconEdit } from '@tabler/icons-react';
import { Broker as BrokerType } from '@/types/broker';
import Broker from "./Broker"
import { createBrokerManager } from '@/services/brokerService';
import { Notifications } from '@mantine/notifications';
import { Tooltip } from '@mantine/core';
import { useRouter } from 'next/navigation'
interface BrokerListItemProps {
    broker: BrokerType;
    user: boolean
}

const BrokerListItem = ({ broker, user }: BrokerListItemProps) => {
    const [open, setOpen] = useState(false);
    const brokerManager = createBrokerManager();
    const router = useRouter()

    const handleDelete = async () => {
        await brokerManager.deleteBroker(broker.id);
        Notifications.show({
            title: 'Broker Deleted',
            message: `${broker.name} has been deleted.`,
        })
    };

    const handleEdit = (e: any) => {
        router.push(`brokers/edit/${broker.id}`)
    }
    return (
        <Card radius="md" withBorder p="xs" w="100%" onMouseEnter={(e) => (e.currentTarget.style.border = '1px solid gray')}
            onMouseLeave={(e) => (e.currentTarget.style.border = '')}
            style={{ transition: 'border-color 0.3s ease' }}>
            <Group justify='space-between' align='flex-start'>
                <Group align='center'>
                    <Title order={6}>{broker.name}</Title>
                </Group>
                <Tooltip label="Edit default value">
                    {open ?
                        <IconChevronUp size={14} color="gray" onClick={() => setOpen((prev) => !prev)} cursor={'pointer'} />
                        :
                        <IconChevronDown onClick={() => setOpen((prev) => !prev)} size={14} color="gray" cursor={'pointer'} />
                    }
                </Tooltip>
            </Group>
            <Collapse in={open} py={'xs'}>
                <Flex justify='space-between' align='center'>
                    <Broker broker={broker} />
                    <Group>
                        <Tooltip label="Edit broker">
                            <ActionIcon onClick={handleEdit} >
                                <IconEdit size={14} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete broker">
                            <ActionIcon onClick={handleDelete} >
                                <IconTrash size={14} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Flex>
            </Collapse>
        </Card >
    );
};

export default BrokerListItem;