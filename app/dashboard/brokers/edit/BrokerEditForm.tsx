"use client";

import { Button, Fieldset, Space, TextInput, Text, Grid, Select } from '@mantine/core';
import BrokerComponent from '../BrokerComponent';
import { Component, ComponentType, Broker } from '@/types/broker';
import { useState } from 'react';
import { brokersAtom } from '@/context/atoms/brokerAtoms';
import { useRecoilValue } from 'recoil';
import { createBrokerManager } from '@/services/brokerService';
import { BrokerEdit } from '../add/BrokerEdit';
import { Notifications } from "@mantine/notifications";

const initialValues: Broker = {
    id: '',
    name: '',
    officialName: '',
    defaultValue: "",
    dataType: "str",
    component: {} as Component,
    description: "",
    category: "custom",
}


export const BrokerEditForm = ({ id }: { id: string }) => {
    const brokers = useRecoilValue(brokersAtom);
    const brokerManager = createBrokerManager();
    const [currentData, setCurrentData] = useState<Broker>(() => {
        const broker = brokers.find((broker) => broker.id === id);
        if (broker) {
            return {
                ...broker,
                component: {
                    ...broker.component,
                    label: broker.name,
                    description: broker.description
                }
            };
        }
        return initialValues;
    });

    const componentOptions = Object.keys(ComponentType).map((key) => ({
        key: key,
        value: key,
        label: key,
    })) as { value: string; label: string }[];

    const dataTypeOptions = [
        { value: 'str', label: 'Text', tooltip: 'Simple words, sentences and paragraphs of any type of text (Very Flexible).' },
        { value: 'int', label: 'Whole Number', tooltip: 'Numbers without decimals, like 1, 2, 3.' },
        { value: 'float', label: 'Number with decimals', tooltip: 'Numbers with fractions, like 1.5, 2.75.' },
        { value: 'bool', label: 'Yes/No', tooltip: 'A simple choice between Yes or No.' },
        { value: 'json', label: 'Dictionary/JSON', tooltip: 'Structured data with keys and values, like an address book where each contact has a name, address, and phone number.' },
        { value: 'list', label: 'Comma Separated List or Array', tooltip: 'A collection of items, like a shopping list separated by commas.' },
        { value: 'url', label: 'URL Link', tooltip: 'A web address, like https://example.com.' },
    ];

    const handleEditBroker = () => {
        try {
            brokerManager.updateBroker({ ...currentData, name: currentData.name.toUpperCase(), description: currentData.description, dataType: currentData.dataType, officialName: currentData.name.toUpperCase().replace(/\s/g, '_') });
            Notifications.show({
                title: 'Broker updated',
                message: 'Broker updated successfully',
                autoClose: true,
                color: 'teal',
            })
        } catch (error) {
            Notifications.show({
                title: 'Broker update failed',
                message: 'Broker update failed',
                autoClose: true,
                color: 'red',
            })
        }
    };

    const handleDataTypeChange = (value: string) => {
        setCurrentData({ ...currentData, dataType: value as Broker['dataType'], component: { ...currentData.component, type: value } })
    }


    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties">
                    <TextInput
                        label="Name"
                        onChange={value => setCurrentData({ ...currentData, name: value.target.value })}
                        value={currentData.name}
                        placeholder='Enter a name'
                    />
                    <Space h="sm" />
                    <Select label="Data type" data={dataTypeOptions} value={currentData.dataType} onChange={() => handleDataTypeChange} />

                    <TextInput label="Description" value={currentData.description}
                        onChange={value => setCurrentData({ ...currentData, description: value.target.value })} placeholder='Enter a description' />
                    <Space h="sm" />
                    <Select label="Type" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} value={currentData.component.type}
                        onChange={value => setCurrentData({ ...currentData, component: { ...currentData.component, type: value as string } })} />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Preview" radius="md">
                    <BrokerComponent currentComponent={currentData.component} type={currentData.component.type} handleDefaultValueChange={(value: any) => setCurrentData({ ...currentData, component: { ...currentData.component, defaultValue: value } })} />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
                <BrokerEdit currentData={currentData} setCurrentData={setCurrentData} />
                <Space h="sm" />
                <Button
                    onClick={handleEditBroker}
                >Save Broker</Button>
            </Grid.Col>

        </Grid>
    );
};