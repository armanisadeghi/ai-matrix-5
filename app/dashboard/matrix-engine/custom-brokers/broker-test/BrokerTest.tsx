"use client";
import React, { useEffect, useState } from 'react'
import { Button, Grid, JsonInput, Space, Text } from '@mantine/core'
import Link from 'next/link';
import { BrokerMultiSelect } from './BrokerMultiselect';
import { useBroker } from '@/context/brokerContext';
import { BrokerTestForm } from './BrokerTestForm';
import { IconArrowLeft } from '@tabler/icons-react';
import { Broker } from '@/types/broker';

const BrokerTest = () => {
    const [jsonValue, setJsonValue] = useState<string>('');
    const [value, setValue] = useState<string[]>([]);
    const [question, setQuestion] = useState<string>('My question here');
    const { brokers, system } = useBroker()
    const [brokerValue, setBrokerValue] = useState<Broker[]>([]);

    useEffect(() => {
        const allBrokers = [...system, ...brokers];
        setBrokerValue(allBrokers.filter((broker) => value.includes(broker.name)));
    }, [value]);

    const handleButtonClick = () => {
        const brokerData = brokerValue.map((broker) => ({
            [broker.name]: broker.component.defaultValue,
        }));

        const jsonObject = {
            question: question,
            data: brokerData
        };

        setJsonValue(JSON.stringify(jsonObject, null, 2));
    };

    return (
        <Grid>
            <Grid.Col span={12}>
                <Link href="/dashboard/matrix-engine/custom-brokers/example"><Button
                    variant="light"
                    leftSection={<IconArrowLeft size={14} />}
                >
                    Go create some brokers
                </Button></Link>
                <Space h="md" />
                <BrokerMultiSelect setJsonValue={setJsonValue} value={value} setValue={setValue} />
            </Grid.Col>
            <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={5}>Prompt Form</Text>
                <BrokerTestForm question={question} setQuestion={setQuestion} brokerValue={brokerValue} setBrokerValue={setBrokerValue} />
            </Grid.Col>
            <Grid.Col span={6}>
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