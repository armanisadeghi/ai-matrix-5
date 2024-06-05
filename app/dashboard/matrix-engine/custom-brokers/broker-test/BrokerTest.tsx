"use client";
import React, { useState } from 'react'
import { Button, Combobox, ComboboxItem, Container, Grid, JsonInput, Select, Space, Stack, TagsInput } from '@mantine/core'
import { useBroker } from '@/context/brokerContext';
import Link from 'next/link';

const BrokerTest = () => {
    const [selectedBrokerNames, setSelectedBrokerNames] = useState<string[]>([]);
    const [jsonValue, setJsonValue] = useState<string>('');
    const { brokers } = useBroker();

    const options = brokers.map((broker) => ({
        value: broker.name,
        label: broker.name,
    }));

    const handleSelectChange = (value: string[]) => {
        setSelectedBrokerNames(value);
    };

    const handleButtonClick = () => {
        const brokerValues = brokers
            .filter((broker) => selectedBrokerNames.includes(broker.name))
            .map((broker) => ({ [broker.name]: broker.defaultValue }));
        const jsonString = JSON.stringify(brokerValues, null, 2);
        setJsonValue(jsonString);
    };

    return (
        <Grid>
            <Grid.Col span={12}>
                <Link href="/dashboard/matrix-engine/custom-brokers/example">Go create a brokers</Link>
                <Space h="md" />
                <Select
                    label="Select Brokers"
                    placeholder="Select Brokers"
                    data={options}
                    onChange={(value: string | null) => {
                        if (value !== null) {
                            setSelectedBrokerNames([value]);
                        }
                    }}
                    searchable
                    clearable
                    multiple
                />
            </Grid.Col>
            <Grid.Col span={12}>
                <TagsInput
                    label="Selected Brokers"
                    placeholder="Selected Brokers"
                    value={selectedBrokerNames}
                    onChange={handleSelectChange}
                />
            </Grid.Col>
            <Grid.Col span={12}>
                <JsonInput
                    label="Prompt Sample"
                    placeholder="Broker Values"
                    disabled
                    value={jsonValue}
                    onChange={() => { }}
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