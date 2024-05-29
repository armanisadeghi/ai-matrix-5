"use client";
type BrokerFormProps = {
    type: string;
    setBrokerComponents: any;
};

import { useEffect, useState } from 'react';
import { Button, Fieldset, Paper, Space, Stack, Switch, TextInput } from '@mantine/core';
import { Component } from '@/types/broker';
import BrokerComponent from './BrokerComponent';
import { IconPlus } from '@tabler/icons-react';
import { SizeSlider } from '@/components/Brokers/BrokerSizeSlider';

export const BrokerEdit = ({ type, setBrokerComponents }: BrokerFormProps) => {
    const [currentBroker, setCurrentBroker] = useState<Component>({
        type: type,
        label: "new Label",
        description: "new Description",
        tooltip: "new Tooltip",
        maxLength: 10,
        placeholderText: "",
        defaultValue: "",
        displayOrder: 0,
        validation: "",
        dependencies: [],
        required: false,
        options: [],
        size: "md",
        color: "default",
        exampleInputs: [],
        group: "",
        min: 0,
        max: 10,
        step: 1,
    } as Component);

    useEffect(() => {
        setCurrentBroker({ ...currentBroker, type: type });
    }, [type]);


    return (
        <Paper style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Stack style={{ width: '100%', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                <Fieldset legend="Add properties" >
                    <TextInput label="Name" onChange={(e) => setCurrentBroker({ ...currentBroker, label: e.target.value })} />
                    <Space h="sm" />
                    <TextInput label="Placeholder" onChange={(e) => setCurrentBroker({ ...currentBroker, placeholderText: e.target.value })} />
                    <Space h="sm" />
                    <TextInput label="Default Value" onChange={(e) => setCurrentBroker({ ...currentBroker, defaultValue: e.target.value })} />
                    <TextInput label="Description" onChange={(e) => setCurrentBroker({ ...currentBroker, description: e.target.value })} />
                    <Space h="sm" />
                    <Switch label="Required" onChange={(e) => setCurrentBroker({ ...currentBroker, required: e.target.checked })} />
                    <Space h="sm" />
                    {/* <SizeSlider onChange={(e) => setCurrentBroker({ ...currentBroker, size: e.toString() })} /> */}
                </Fieldset>
                <Space h="sm" />
                <Button variant="primary" onClick={() => {
                    setBrokerComponents((prevComponents: Component[]) => [...prevComponents, currentBroker]);
                }}>
                    Add Component To Broker
                </Button>
            </Stack>
            <Space w="md" />
            <Fieldset legend="Component" radius="md" style={{ width: '100%' }}>
                <BrokerComponent component={currentBroker} type={type} />
            </Fieldset>
        </Paper>
    );
};