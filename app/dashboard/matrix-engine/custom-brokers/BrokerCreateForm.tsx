"use client";

import { Button, Fieldset, Space, TextInput, Text, Grid, Select } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { Component, ComponentType, Broker } from '@/types/broker';
import { useState } from 'react';
import { brokersAtom } from '@/context/atoms/brokerAtoms';
import { useRecoilValue } from 'recoil';
import { createBrokerManager } from '@/services/brokerService';

const initialValues = {
    id: '',
    name: 'Broker Name',
    officialName: 'BROKER_NAME',
    dataType: "",
    component: {} as Component,
    description: "",
}

export const BrokerCreateForm = () => {
    const brokers = useRecoilValue(brokersAtom);
    const brokerManager = createBrokerManager();
    const [currentData, setCurrentData] = useState<Broker>({
        ...initialValues,
    } as Broker);

    const componentOptions = Object.keys(ComponentType).map((key) => ({
        value: key,
        label: key,
    })) as { value: string; label: string }[];

    const handleAddBroker = () => {
        brokerManager.setCurrentBroker(initialValues);
        brokerManager.createBroker({ ...currentData, dataType: typeof currentData.component.defaultValue, officialName: currentData.name.toUpperCase().replace(/\s/g, '_') });
        setCurrentData(initialValues);
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties">
                    <TextInput
                        label="Name"
                        onChange={value => setCurrentData({ ...currentData, name: value.target.value })}
                        value={currentData.name}
                        placeholder='Enter a name'
                        error={
                            brokers.some((broker) => broker.name === currentData.name)
                                ? 'Name already exists. Please choose a different name.'
                                : null
                        }
                    />
                    <Space h="sm" />
                    <TextInput label="Description" value={currentData.description}
                        onChange={value => setCurrentData({ ...currentData, description: value.target.value })} placeholder='Enter a description' />
                    <Space h="sm" />
                    <Select label="Type" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} value={currentData.component.type}
                        onChange={value => setCurrentData({ ...currentData, component: { ...currentData.component, type: value } })} />
                </Fieldset>
                <Space h="sm" />
                <Button
                    variant="primary"
                    onClick={handleAddBroker}
                    disabled={
                        brokers.some((broker) => broker.name === currentData.name) ||
                        currentData.name.trim() === ''
                    }>Save Broker</Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Custom Broker" radius="md">
                    <Text>{currentData.name}</Text>
                    <Text size='xs' c={'gray.6'}>{currentData.description}</Text>
                    <Space h="sm" />
                    <BrokerComponent currentComponent={currentData.component} type={currentData.component.type} handleDefaultValueChange={value => setCurrentData({ ...currentData, component: { ...currentData.component, defaultValue: value } })} />
                </Fieldset>
            </Grid.Col>
        </Grid>
    );
};