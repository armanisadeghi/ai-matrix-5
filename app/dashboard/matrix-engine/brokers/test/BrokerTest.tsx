"use client";
import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Paper, Space } from '@mantine/core'
import Link from 'next/link';
import { BrokerMultiSelect } from './BrokerMultiselect';
import { IconArrowLeft } from '@tabler/icons-react';
import { BrokerFormComponent } from './BrokerFormComponent';
import { brokersAtom } from '@/context/atoms/brokerAtoms';
import { useRecoilValue } from 'recoil';

const BrokerTest = () => {
    const [value, setValue] = useState<string[]>([]);
    const [brokerId, setBrokerId] = useState<string[]>([]);
    const brokers = useRecoilValue(brokersAtom);

    useEffect(() => {
        setBrokerId(brokers.filter((broker) => value.includes(broker.displayName)).map(b => b.id));
    }, [value]);

    return (
        <Container w='100%'>
            <Paper p="sm">
                <Link href="add">
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