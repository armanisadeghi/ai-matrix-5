import React from 'react'
import BrokerComponent from './BrokerComponent';
import { Broker as BrokerType } from '@/types/broker';
import { Group } from '@mantine/core';
const Broker = ({ broker }: { broker: BrokerType }) => {
    return (
        <>{broker &&
            <Group w={'60%'}>
                <BrokerComponent currentComponent={broker.component} type={broker.component.type} handleDefaultValueChange={() => { }} />
            </Group>
        }</>
    )
}

export default Broker