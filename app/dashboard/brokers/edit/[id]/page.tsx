"use client";
import React from 'react'
import { Button, Center, Space, Stack } from '@mantine/core'
import Link from 'next/link'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { BrokerEditForm } from '../BrokerEditForm'

const EditBrokerPage = ({ params }: { params: { id: string } }) => {
    return (
        <Stack>
            <Center>
                <Link href="/dashboard/brokers">
                    <Button
                        variant="light"
                        leftSection={<IconArrowLeft size={14} />}
                    >
                        Go to Brokers
                    </Button>
                </Link>
                <Space w="md" />
                <Link href="/dashboard/brokers/broker-test">
                    <Button
                        variant="light"
                        rightSection={<IconArrowRight size={14} />}
                    >
                        Go to a Testing Page
                    </Button>
                </Link>
            </Center>
            <BrokerEditForm id={params.id as string} />
        </Stack>
    )
}

export default EditBrokerPage