import React from 'react'
import BrokerComponent from './BrokerComponent';
import { Broker as BrokerType } from '@/types/broker';
import { Group } from '@mantine/core';
const Broker = ({ broker }: { broker: BrokerType }) => {
    return (
        <>{broker &&
            <Group p='xs'>
                <BrokerComponent currentComponent={broker.component} type={broker.component.type} />
            </Group>
        }</>
    )
}

export default Broker