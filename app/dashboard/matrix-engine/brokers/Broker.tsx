import React from 'react'
import BrokerComponent from '../../../../components/Brokers/BrokerComponent';
import { Broker as BrokerType } from '@/types/broker';
import { Group } from '@mantine/core';
const Broker = ({ broker }: { broker: BrokerType }) => {
    return (
        <>{broker &&
            <Group w={'60%'}>
                <BrokerComponent id={broker.id} type={broker.componentType} handleDefaultValueChange={() => { }} />
            </Group>
        }</>
    )
}

export default Broker