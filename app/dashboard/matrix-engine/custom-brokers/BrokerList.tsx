"use client";

import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Stack } from '@mantine/core';
import { useBroker } from '@/context/brokerContext';


const BrokerList = ({ user }: { user: boolean }) => {
    const { brokers } = useBroker();

    return (
        <Stack>
            {brokers.reverse().map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} user={user} />
            ))}
        </Stack>
    );
};

export default BrokerList;