"use client";

import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Stack } from '@mantine/core';
import { brokersAtom } from '@/context/atoms/brokerAtoms';
import { useRecoilValue } from 'recoil';


const BrokerList = ({ user }: { user: boolean }) => {
    const brokers = useRecoilValue(brokersAtom);

    return (
        <Stack>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} user={user} />
            ))}
        </Stack>
    );
};

export default BrokerList;