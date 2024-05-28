"use client";
type BrokerFormProps = {
    type: string;
};

import { useState } from 'react';
import { Button, Fieldset, Paper, Space, Switch, TextInput } from '@mantine/core';
import { Component, ComponentType } from '@/types/broker';
import BrokerComponent from './BrokerComponent';
import { IconPlus } from '@tabler/icons-react';

export const BrokerEdit = ({ type }: BrokerFormProps) => {
    const [currentBroker, setCurrentBroker] = useState<Component>({
        type: type,
        label: "new Label",
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
    return (
        <Paper style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                <Fieldset legend="Add properties" >
                    <TextInput label="Name" onChange={(e) => setCurrentBroker({ ...currentBroker, label: e.target.value })} />
                    <Space h="sm" />
                    <TextInput label="Placeholder" onChange={(e) => setCurrentBroker({ ...currentBroker, placeholderText: e.target.value })} />
                    <Space h="sm" />
                    <TextInput label="Default Value" onChange={(e) => setCurrentBroker({ ...currentBroker, defaultValue: e.target.value })} />
                    <Space h="sm" />
                    <Switch label="Required" onChange={(e) => setCurrentBroker({ ...currentBroker, required: e.target.checked })} />
                </Fieldset>
                <Space h="sm" />
                <Button variant="primary" leftSection={<IconPlus />}>
                    Add Component
                </Button>
            </div>
            <Space w="md" />
            <Fieldset legend="Your component" radius="md" style={{ width: '100%' }}>
                <BrokerComponent component={currentBroker} />
            </Fieldset>
        </Paper>
    );
};