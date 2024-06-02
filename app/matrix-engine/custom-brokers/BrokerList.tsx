import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Stack } from '@mantine/core';
import { useBroker } from '@/context/brokerContext';

interface BrokerListProps {
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    isEditingId: string;
}

const BrokerList = ({ onDelete, onEdit, isEditingId }: BrokerListProps) => {
    const { brokers } = useBroker();

    return (
        <Stack>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} onDelete={onDelete} onEdit={onEdit} isEditingId={isEditingId} />
            ))}
        </Stack>
    );
};

export default BrokerList;