"use client";

import React from 'react';
import BrokerListItem from './BrokerListItem';
import { ScrollArea, Stack, TableTd, TableThead } from '@mantine/core';
import { Broker } from '@/types/broker';
import { Table, TableTbody, TableTr } from '@mantine/core';


const BrokerList = ({ user, brokers }: { user: boolean, brokers: Broker[] }) => {
    const headers = [
        { id: 'id', name: 'ID' },
        { id: 'name', name: 'Name' },
        { id: 'description', name: 'Description' },
        { id: 'defaultValue', name: 'Default Value' },
        { id: 'dataType', name: 'Data Type' },
        { id: 'component', name: 'Component' },
        { id: 'officialName', name: 'Official Name' },
        { id: 'category', name: 'Category' },
    ]

    return (
        <ScrollArea w={'100vw'}>
            <Table w={'100%'}
                highlightOnHover withTableBorder
                withColumnBorders
                withRowBorders
                styles={{
                    table: { minWidth: '100%' },
                }}
            >
                <Table.Thead>
                    <Table.Tr>{headers.map((header) => (
                        <Table.Th key={header.id} style={{ fontSize: '12px' }}>{header.name}</Table.Th>
                    ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {brokers.map((broker) => (
                        <Table.Tr key={broker.id}>
                            <TableTd style={{ fontSize: '12px' }}>{broker.id}</TableTd>
                            <TableTd style={{ fontSize: '12px' }}>{broker.name}</TableTd>
                            <TableTd style={{ fontSize: '12px' }}>{broker.description}</TableTd>
                            <TableTd style={{ fontSize: '12px' }}>{broker.default_value as string}</TableTd>
                            <TableTd style={{ fontSize: '12px' }}>{broker.data_type}</TableTd>
                            <TableTd style={{ fontSize: '12px' }}>{broker.component.type}</TableTd>
                            <TableTd style={{ fontSize: '12px' }}>{broker.official_name}</TableTd>
                            <TableTd style={{ fontSize: '12px' }}>{broker.category}</TableTd>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default BrokerList;