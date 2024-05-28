import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Group } from '@mantine/core';
import { Broker } from '@/types/broker';

interface BrokerListProps {
    brokers: Broker[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const BrokerList = ({ brokers, onDelete, onEdit }: BrokerListProps) => {
    return (
        <Group style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </Group>
    );
};

export default BrokerList;