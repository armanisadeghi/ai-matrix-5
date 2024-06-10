"use client";

import { Button, Center, Container, Flex, Grid, Paper, Space, Stack } from '@mantine/core';
import BrokerComponent from '../BrokerComponent';
import { Broker } from '@/types/broker';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { brokersAtom } from '@/context/atoms/brokerAtoms';

export const BrokerFormComponent = ({ brokerIds }: { brokerIds: string[] }) => {
    const brokers = useRecoilValue(brokersAtom);
    const [values, setValues] = useState([] as any[]);
    const [idBrokers, setIdBrokers] = useState([] as Broker[]);

    useEffect(() => {
        const brokerData = brokers.filter((broker) => brokerIds.includes(broker.id));
        setIdBrokers(brokerData);
        setValues(brokerData.map(b => ({ [b.id]: b.component.defaultValue })));
    }, [brokerIds]);

    const handleDefaultValueChange = (value: any, broker: Broker) => {
        setValues(prevValues => {
            const brokerIndex = prevValues.findIndex(b => b[broker.id] !== undefined);
            if (brokerIndex !== -1) {
                const updatedValues = [...prevValues];
                updatedValues[brokerIndex] = { [broker.id]: value ? value : broker.component.defaultValue };
                return updatedValues;
            } else {
                return [...prevValues, { [broker.id]: value ? value : broker.component.defaultValue }];
            }
        });
    };

    return (
        <Container w='100%'>
            <Paper withBorder p='sm'>
                {idBrokers.map((broker) => (
                    <Paper p='md' key={broker.id}>
                        <BrokerComponent
                            currentComponent={broker.component}
                            type={broker.component.type}
                            handleDefaultValueChange={(value: any) => handleDefaultValueChange(value, broker)}
                        />
                    </Paper>
                ))}
            </Paper>
            <Space h="sm" />
            <Flex justify="end">
                <Button variant="outline" onClick={() => console.log(values)}>Submit</Button>
            </Flex>
        </Container>
    )
};