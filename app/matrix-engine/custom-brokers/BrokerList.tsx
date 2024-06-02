import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Stack } from '@mantine/core';
import { Broker } from '@/types/broker';
import { useBroker } from '@/context/brokerContext';

interface BrokerListProps {
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const BrokerList = ({ onDelete, onEdit }: BrokerListProps) => {
    const { brokers } = useBroker();

    return (
        <Stack>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </Stack>
    );
};

export default BrokerList;