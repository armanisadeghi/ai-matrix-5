import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Stack } from '@mantine/core';
import { useBroker } from '@/context/brokerContext';

interface BrokerListProps {
    isEditingId: string;
}

const BrokerList = ({ isEditingId }: BrokerListProps) => {
    const { brokers } = useBroker();

    return (
        <Stack>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} isEditingId={isEditingId} broker={broker} />
            ))}
        </Stack>
    );
};

export default BrokerList;