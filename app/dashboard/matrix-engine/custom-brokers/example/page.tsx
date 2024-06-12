import React from 'react'
import BrokerList from '../BrokerList'
import { Button, Center, Space, Stack } from '@mantine/core'
import Link from 'next/link'
import { BrokerCreateForm } from '../BrokerCreateForm'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

const SampleBrokerPage: React.FC = () => {
    return (
        <Stack>
            <Center>
                <Link href="/dashboard/matrix-engine/custom-brokers">
                    <Button
                        variant="light"
                        leftSection={<IconArrowLeft size={14} />}
                    >
                        Go to a Broker lab
                    </Button>
                </Link>
                <Space w="md" />
                <Link href="/dashboard/matrix-engine/custom-brokers/broker-test">
                    <Button
                        variant="light"
                        rightSection={<IconArrowRight size={14} />}
                    >
                        Go to a Testing Page
                    </Button>
                </Link>
            </Center>
            <BrokerCreateForm />
            <BrokerList user={false} />
        </Stack>
    )
}

export default SampleBrokerPage