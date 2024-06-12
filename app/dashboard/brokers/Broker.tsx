import React from 'react'
import { Stack, Title, Text } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { Broker as BrokerType } from '@/types/broker';
const Broker = ({ broker }: { broker: BrokerType }) => {
    return (
        <>{broker &&
            <Stack w={'100%'}>
                <Title order={6}>{broker.name}</Title>
                <Text size='xs' c={'gray.6'}>{broker.description}</Text>
                <BrokerComponent currentComponent={broker.component} type={broker.component.type} />
            </Stack>
        }</>
    )
}

export default Broker