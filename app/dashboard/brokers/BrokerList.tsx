"use client";

import React from 'react';
import BrokerListItem from './BrokerListItem';
import { Stack } from '@mantine/core';
import { brokersAtom } from '@/context/atoms/brokerAtoms';
import { useRecoilValue } from 'recoil';
import { Broker } from '@/types/broker';


const BrokerList = ({ user, brokers }: { user: boolean, brokers: Broker[] }) => {

    return (
        <Stack>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} user={user} />
            ))}
        </Stack>
    );
};

export default BrokerList;