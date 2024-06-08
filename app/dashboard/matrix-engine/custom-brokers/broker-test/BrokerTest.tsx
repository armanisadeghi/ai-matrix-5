"use client";
import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Paper, Space } from '@mantine/core'
import Link from 'next/link';
import { BrokerMultiSelect } from './BrokerMultiselect';
import { useBroker } from '@/context/brokerContext';
import { IconArrowLeft } from '@tabler/icons-react';
import { BrokerFormComponent } from './BrokerFormComponent';

const BrokerTest = () => {
    const [value, setValue] = useState<string[]>([]);
    const brokers = [...useBroker().system, ...useBroker().brokers];
    const [brokerId, setBrokerId] = useState<string[]>([]);

    useEffect(() => {
        setBrokerId(brokers.filter((broker) => value.includes(broker.name)).map(b => b.id));
    }, [value]);

    return (
        <Container w='100%'>
            <Paper p="sm">
                <Link href="/dashboard/matrix-engine/custom-brokers/example">
                    <Button
                        variant="light"
                        leftSection={<IconArrowLeft size={14} />}
                    >
                        Go create some brokers
                    </Button>
                </Link>
            </Paper>
            <Space h="sm" />
            <Paper p="sm">
                <BrokerMultiSelect value={value} setValue={setValue} />
            </Paper>
            <Space h="sm" />
            {value.length > 0 && <BrokerFormComponent brokerIds={brokerId} />}
        </Container>
    )
}

export default BrokerTest