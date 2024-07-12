"use client";

import { Button, Container, Flex, Paper, Space } from '@mantine/core';
import { Broker } from '@/types/broker';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { brokersAtom } from '@/context/atoms/brokerAtoms';
import BrokerComponent from '@/components/Brokers/BrokerComponent';

export const BrokerFormComponent = ({ brokerIds }: { brokerIds: string[] }) => {
    const brokers = useRecoilValue(brokersAtom);
    const [values, setValues] = useState([] as any[]);
    const [idBrokers, setIdBrokers] = useState([] as Broker[]);

    useEffect(() => {
        const brokerData = brokers.filter((broker) => brokerIds.includes(broker.id));
        setIdBrokers(brokerData);
    }, [brokerIds]);

    const handleDefaultValueChange = (value: any, broker: Broker) => {
        setValues(prevValues => {
            const brokerIndex = prevValues.findIndex(b => b[broker.id] !== undefined);
            if (brokerIndex !== -1) {
                const updatedValues = [...prevValues];
                updatedValues[brokerIndex] = { [broker.id]: value };
                return updatedValues;
            } else {
                return [...prevValues, { [broker.id]: value }];
            }
        });
    };

    const handleSubmit = () => {
        console.log(values);
    };

    return (
        <Container w='100%'>
            <Paper withBorder p='sm'>
                {idBrokers.map((broker) => (
                    <Paper p='md' key={broker.id}>
                        <BrokerComponent
                            type={broker.componentType}
                            handleDefaultValueChange={(value: any) => handleDefaultValueChange(value, broker)} id={broker.id} />
                    </Paper>
                ))}
            </Paper>
            <Space h="sm" />
            <Flex justify="end">
                <Button variant="outline" onClick={handleSubmit}>Submit</Button>
            </Flex>
        </Container>
    )
};