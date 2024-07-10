import React from 'react'
import { Button, Center, Space, Stack } from '@mantine/core'
import Link from 'next/link'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { BrokerForm } from '@/components/Brokers/BrokerForm'
import { v4 as uuid } from "uuid"
const AddBrokerPage: React.FC = () => {
    const id = uuid();

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
                <Link href="test">
                    <Button
                        variant="light"
                        rightSection={<IconArrowRight size={14} />}
                    >
                        Go to a Testing Page
                    </Button>
                </Link>
            </Center>
            <BrokerForm id={id} newBroker={true} />
        </Stack>
    )
}

export default AddBrokerPage