import React from 'react'
import BrokerList from '../BrokerList'
import { Center, Space, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import { BrokerCreateForm } from '../BrokerCreateForm'

const SampleBrokerPage: React.FC = () => {
    return (
        <Stack>
            <Center><Text>Broker List</Text></Center>
            <Center>
                <Link href="/dashboard/matrix-engine/custom-brokers">Go to a Broker lab</Link>
                <Space w="md" />
                <Link href="/dashboard/matrix-engine/custom-brokers/broker-test">Go to a Testing Page</Link>
            </Center>
            <BrokerCreateForm />
            <BrokerList user={false} />
        </Stack>
    )
}

export default SampleBrokerPage