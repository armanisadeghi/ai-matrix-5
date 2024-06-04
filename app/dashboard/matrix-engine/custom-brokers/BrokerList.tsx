import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Stack } from '@mantine/core';
import { useBroker } from '@/context/brokerContext';


const BrokerList = () => {
    const { brokers } = useBroker();

    return (
        <Stack>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} />
            ))}
        </Stack>
    );
};

export default BrokerList;