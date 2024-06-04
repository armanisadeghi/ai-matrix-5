import React from 'react'
import BrokerList from '../BrokerList'
import { Center, Stack, Text } from '@mantine/core'
import Link from 'next/link'

const SampleBrokerPage: React.FC = () => {
    return (
        <Stack>
            <Center><Text>Broker List</Text></Center>
            <Center><Link href="/dashboard/matrix-engine/custom-brokers">Go to a Broker lab</Link></Center>
            <BrokerList />
        </Stack>
    )
}

export default SampleBrokerPage