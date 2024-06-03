import { useBroker } from '@/context/brokerContext'
import { Stack } from '@mantine/core'
import React from 'react'
import BrokerList from '../BrokerList'

const SampleBrokerPage: React.FC = () => {
    const { brokers } = useBroker()
    return (
        <Stack>
            {brokers.map(broker => <BrokerList key={broker.id} isEditingId={broker.id} />)}
        </Stack>
    )
}

export default SampleBrokerPage