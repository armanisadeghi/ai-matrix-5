"use client";

import { Button, Fieldset, Space, TextInput, Text, Grid, Select } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { Component, ComponentType, Broker } from '@/types/broker';
import { useState } from 'react';
import { useBroker } from '@/context/brokerContext';
import { uuid } from 'uuidv4';

const initialValues = {
    id: '',
    name: '',
    dataType: "",
    component: {} as Component,
    description: "",
}

export const BrokerCreateForm = () => {
    const [currentBroker, setCurrentBroker] = useState<Broker>(initialValues);
    const { setBrokers, brokers } = useBroker()

    const componentOptions = Object.keys(ComponentType).map((key) => ({
        value: key,
        label: key,
    })) as { value: string; label: string }[];

    const handleInputTypeChange = (value: any) => {
        setCurrentBroker({
            ...currentBroker,
            component: { ...currentBroker.component, type: value as ComponentType }
        });
    };

    const handleDefaultValueChange = (value: any) => {
        setCurrentBroker((prevBroker) => ({
            ...prevBroker,
            component: { ...prevBroker.component, defaultValue: value }
        }));
    };

    const handleAddBroker = () => {
        const newBroker = {
            ...currentBroker,
            id: currentBroker.id === '' ? uuid() : currentBroker.id,
            component: { ...currentBroker.component, defaultValue: currentBroker.component.defaultValue ? currentBroker.component.defaultValue : currentBroker.name }
        };
        setBrokers([newBroker, ...brokers]);
        setCurrentBroker(initialValues);
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties">
                    <TextInput
                        label="Name"
                        value={currentBroker.name}
                        onChange={e => setCurrentBroker({ ...currentBroker, name: e.target.value })}
                        placeholder='Enter a name'
                        error={
                            brokers.some((broker) => broker.name === currentBroker.name)
                                ? 'Name already exists. Please choose a different name.'
                                : null
                        }
                    />
                    <Space h="sm" />
                    <TextInput label="Description" value={currentBroker.description} onChange={e => setCurrentBroker({ ...currentBroker, description: e.target.value })} placeholder='Enter a description' />
                    <Space h="sm" />
                    <Select label="Type" value={currentBroker.component.type} description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} onChange={handleInputTypeChange} />
                </Fieldset>
                <Space h="sm" />
                <Button
                    variant="primary"
                    onClick={handleAddBroker}
                    disabled={
                        brokers.some((broker) => broker.name === currentBroker.name) ||
                        currentBroker.name.trim() === ''
                    }>Save Broker</Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Custom Broker" radius="md">
                    <Text>{currentBroker.name}</Text>
                    <Text size='xs' c={'gray.6'}>{currentBroker.description}</Text>
                    <Space h="sm" />
                    <BrokerComponent type={currentBroker.component.type} currentComponent={currentBroker.component} handleDefaultValueChange={handleDefaultValueChange} />
                </Fieldset>
            </Grid.Col>
        </Grid>
    );
};