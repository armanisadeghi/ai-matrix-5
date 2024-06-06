"use client";

import { Button, CheckboxGroup, Fieldset, Paper, Space, Stack, Switch, TextInput, Text, Checkbox, Group, FileInput, Image, Grid, Select } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { Component, ComponentType, Broker } from '@/types/broker';
import { useState } from 'react';
import { useBroker } from '@/context/brokerContext';
import { uuid } from 'uuidv4';

const initialValues = {
    id: '',
    name: 'New Broker',
    dataType: ["string"],
    component: {} as Component,
    description: "Describe your new broker",
    defaultValue: undefined,
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
            defaultValue: value,
        }));
    };

    const handleAddBroker = () => {
        const newBroker = {
            ...currentBroker,
            id: currentBroker.id === '' ? uuid() : currentBroker.id,
        };
        setBrokers([newBroker, ...brokers]);
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties">
                    <TextInput label="Name" onChange={e => setCurrentBroker({ ...currentBroker, name: e.target.value })} defaultValue="My New Broker" placeholder='Enter a name' />
                    <Space h="sm" />
                    <TextInput label="Description" onChange={e => setCurrentBroker({ ...currentBroker, description: e.target.value })} defaultValue="description" placeholder='Enter a description' />
                    <Space h="sm" />
                    <Select label="Type" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} onChange={handleInputTypeChange} />
                </Fieldset>
                <Space h="sm" />
                <Button variant="primary" onClick={handleAddBroker}>Save Broker</Button>
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