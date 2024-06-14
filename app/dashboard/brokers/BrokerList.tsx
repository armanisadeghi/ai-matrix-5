"use client";

import React from 'react';
import { ActionIcon, Group, ScrollArea, Stack, TableTd, TableThead, Tooltip } from '@mantine/core';
import { Broker } from '@/types/broker';
import { Table, TableTbody, TableTr } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { createBrokerManager } from '@/services/brokerService';
import { Notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';


const BrokerList = ({ brokers }: { brokers: Broker[] }) => {
    const brokerManager = createBrokerManager();
    const router = useRouter()
    const headers = [
        { id: 'id', name: 'ID' },
        { id: 'name', name: 'Name' },
        { id: 'description', name: 'Description' },
        { id: 'defaultValue', name: 'Default Value' },
        { id: 'dataType', name: 'Data Type' },
        { id: 'component', name: 'Component' },
        { id: 'officialName', name: 'Official Name' },
        { id: 'category', name: 'Category' },
        { id: 'action', name: 'Action' },
    ]

    const handleDelete = async (broker: Broker) => {
        await brokerManager.deleteBroker(broker.id);
        brokers.filter((broker) => broker.id !== broker.id);
        Notifications.show({
            title: 'Broker Deleted',
            message: `${broker.name} has been deleted.`,
        })
    };

    const handleEdit = (broker: Broker) => {
        router.push(`/dashboard/brokers/edit/${broker.id}`)
    }

    return (
        <ScrollArea w={'100vw'}>
            <Table
                highlightOnHover withTableBorder
                withColumnBorders
                withRowBorders
                styles={{
                    table: { minWidth: '100%' },
                    th: { fontSize: '12px' },
                    td: { fontSize: '12px' },
                }}
            >
                <Table.Thead>
                    <Table.Tr>{headers.map((header) => (
                        <Table.Th key={header.id}>{header.name}</Table.Th>
                    ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {brokers.map((broker) => (
                        <Table.Tr key={broker.id}>
                            <TableTd styles={{ td: { width: '20%' } }}>{broker.id}</TableTd>
                            <TableTd >{broker.name}</TableTd>
                            <TableTd >{broker.description}</TableTd>
                            <TableTd >{broker.default_value as string}</TableTd>
                            <TableTd >{broker.data_type}</TableTd>
                            <TableTd >{broker.component.type}</TableTd>
                            <TableTd >{broker.official_name}</TableTd>
                            <TableTd >{broker.category}</TableTd>
                            <TableTd >{<Group>
                                <Tooltip label="Edit broker">
                                    <ActionIcon onClick={() => handleEdit(broker)} >
                                        <IconEdit size={14} />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Delete broker">
                                    <ActionIcon onClick={() => handleDelete(broker)} >
                                        <IconTrash size={14} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>}</TableTd>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default BrokerList;