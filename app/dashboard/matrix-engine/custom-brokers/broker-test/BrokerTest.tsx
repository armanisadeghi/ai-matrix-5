"use client";
import React, { useState } from 'react'
import { Button, Grid, JsonInput, Space } from '@mantine/core'
import Link from 'next/link';
import { BrokerMultiSelect } from './BrokerMultiselect';
import { useBroker } from '@/context/brokerContext';

const BrokerTest = () => {
    const [jsonValue, setJsonValue] = useState<string>('');
    const [value, setValue] = useState<string[]>([]);

    const { brokers } = useBroker()

    const handleButtonClick = () => {
        setJsonValue(JSON.stringify(brokers.filter((broker) => value.includes(broker.name)).map((broker) => ({
            [broker.name]: broker.defaultValue,
        })), null, 2));
    };

    return (
        <Grid>
            <Grid.Col span={12}>
                <Link href="/dashboard/matrix-engine/custom-brokers/example">Go create some brokers</Link>
                <Space h="md" />
                <BrokerMultiSelect setJsonValue={setJsonValue} value={value} setValue={setValue} />
            </Grid.Col>
            <Grid.Col span={12}>
                <JsonInput
                    label="Prompt Sample"
                    placeholder="Broker Values"
                    disabled
                    value={jsonValue}
                    autosize
                    minRows={4}
                />
            </Grid.Col>
            <Grid.Col span={12}>
                <Button variant="primary" onClick={handleButtonClick}>Show prompt</Button>
            </Grid.Col>
        </Grid>
    )
}

export default BrokerTest