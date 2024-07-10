import React from 'react'
import { Button, Center, Space, Stack } from '@mantine/core'
import Link from 'next/link'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { BrokerForm } from '@/components/Brokers/BrokerForm';

const EditBrokerPage = ({ params }: { params: { id: string } }) => {
    return (
        <Stack>
            <Center>
                <Link href="/dashboard/matrix-engine/brokers">
                    <Button
                        variant="light"
                        leftSection={<IconArrowLeft size={14} />}
                    >
                        Go to Brokers
                    </Button>
                </Link>
                <Space w="md" />
                <Link href="/dashboard/matrix-engine/brokers/test">
                    <Button
                        variant="light"
                        rightSection={<IconArrowRight size={14} />}
                    >
                        Go to a Testing Page
                    </Button>
                </Link>
            </Center>
            <BrokerForm id={params.id as string} newBroker={false} />
        </Stack>
    )
}

export default EditBrokerPage