import React from 'react'
import { Button, Center, Space, Stack } from '@mantine/core'
import Link from 'next/link'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { BrokerCreateForm } from './BrokerCreateForm'

const AddBrokerPage: React.FC = () => {
    return (
        <Stack>
            <Center>
                <Link href="/dashboard/matrix-engine/brokers" scroll={false}>
                    <Button
                        variant="light"
                        leftSection={<IconArrowLeft size={14} />}
                    >
                        Go to Brokers
                    </Button>
                </Link>
                <Space w="md" />
                <Link href="broker-test">
                    <Button
                        variant="light"
                        rightSection={<IconArrowRight size={14} />}
                    >
                        Go to a Testing Page
                    </Button>
                </Link>
            </Center>
            <BrokerCreateForm />
        </Stack>
    )
}

export default AddBrokerPage