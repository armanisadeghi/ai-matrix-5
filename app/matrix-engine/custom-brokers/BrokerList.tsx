import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Group, Stack } from '@mantine/core';
import { Broker } from '@/types/broker';

interface BrokerListProps {
    brokers: Broker[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const BrokerList = ({ brokers, onDelete, onEdit }: BrokerListProps) => {

    return (
        <Stack>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </Stack>
    );
};

export default BrokerList;