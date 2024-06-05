"use client";
import React, { useState } from 'react'
import { Button, Grid, JsonInput, Space } from '@mantine/core'
import Link from 'next/link';
import { BrokerMultiSelect } from './BrokerMultiselect';

const BrokerTest = () => {
    const [jsonValue, setJsonValue] = useState<string>('');
    const handleButtonClick = () => {
        setJsonValue(jsonValue);
    };

    return (
        <Grid>
            <Grid.Col span={12}>
                <Link href="/dashboard/matrix-engine/custom-brokers/example">Go create some brokers</Link>
                <Space h="md" />
                <BrokerMultiSelect setJsonValue={setJsonValue} />
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