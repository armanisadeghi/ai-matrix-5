"use client";

import { Button, Fieldset, Space, TextInput, Grid, Select, Tooltip, Textarea } from '@mantine/core';
import { ComponentType, Broker } from '@/types/broker';
import { brokersAtom, componentAtomFamily } from '@/context/atoms/brokerAtoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { createBrokerManager } from '@/services/brokerService';
import { BrokerEdit } from '../../app/dashboard/matrix-engine/brokers/add/BrokerEdit';
import { Notifications } from "@mantine/notifications";
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import BrokerComponent from './BrokerComponent';

interface BrokerFormProps {
    id: string;
}

export const BrokerForm = ({ id }: BrokerFormProps) => {
    const brokerManager = createBrokerManager();
    const [currentComponent, setCurrentComponent] = useRecoilState(componentAtomFamily(id));
    const brokers = useRecoilValue(brokersAtom);
    const currentBroker = brokers.find((broker: Broker) => broker.id === id);
    const [currentData, setCurrentData] = useState<Broker>({} as Broker);

    useEffect(() => {
        if (!currentBroker) {
            const newBroker: Broker = {
                id: id,
                displayName: '',
                officialName: '',
                description: '',
                componentType: 'Input',
                dataType: 'str',
                tooltip: '',
            };

            setCurrentData(newBroker as Broker);
        } else {
            setCurrentData(currentBroker);
            const componentProperties = JSON.parse(currentBroker.validationRules || '{}');
            setCurrentComponent((prev) => ({ ...prev, label: currentBroker.displayName, description: currentBroker.description, tooltip: currentBroker.tooltip, ...componentProperties } as any));
        }

    }, []);


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
            const broker = {
                ...currentData,
                displayName: currentData?.displayName,
                description: currentData?.description,
                dataType: currentData?.dataType,
                officialName: `${currentData?.displayName.toUpperCase().replace(/\s/g, '_')}_1001`,
                componentType: currentData?.componentType,
                tooltip: currentComponent?.tooltip,
                sampleEntries: currentData?.sampleEntries,
                validationRules: JSON.stringify(currentComponent)
            }
            currentBroker ? brokerManager.updateBroker(broker as Broker) : brokerManager.createBroker(broker as Broker);
            Notifications.show({
                title: `${currentBroker ? 'Broker updated' : 'Broker created'}`,
                message: `${currentBroker ? 'Broker updated' : 'Broker created'} successfully`,
                autoClose: true,
                color: 'teal',
            })
        } catch (error) {
            Notifications.show({
                title: `Broker ${currentBroker ? 'update' : 'creation'} failed`,
                message: `Broker ${currentBroker ? 'update' : 'creation'} failed`,
                autoClose: true,
                color: 'red',
            })
        }
    };

    const handleValueChange = (data: string, value: string | number | boolean) => {
        currentData && setCurrentData({ ...currentData, [data]: value });
        if (data === 'displayName') {
            currentComponent && setCurrentComponent({ ...currentComponent, label: value as string });
        }
        if (data === 'description') {
            currentComponent && setCurrentComponent({ ...currentComponent, description: value as string });
        }
        if (data === 'tooltip') {
            currentComponent && setCurrentComponent({ ...currentComponent, tooltip: value as string });
        }
        if (data === "componentType") {
            currentComponent && setCurrentComponent({ ...currentComponent, type: value as ComponentType });
        }
    }

    const handleDataTypeChange = (value: string | null) => {
        currentData && setCurrentData({ ...currentData, dataType: value as typeof currentData['dataType'] });
    }

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties">
                    <TextInput
                        label="Name"
                        onChange={(value) => handleValueChange('displayName', value.target.value)}
                        value={currentData.displayName}
                        placeholder='Enter a name'
                    />
                    <Space h="sm" />
                    <Tooltip label={dataTypeOptions.find((option) => option.value === currentData!.dataType)?.tooltip}>
                        <Select label="Data type" data={dataTypeOptions} value={currentData!.dataType} onChange={(value) => handleDataTypeChange(value)} /></Tooltip>
                    <Space h="sm" />
                    <Textarea resize='both' label="Description" value={currentData.description}
                        onChange={value => handleValueChange('description', value.target.value)} placeholder='Enter a description' />
                    <Space h="sm" />
                    <Select label="Type" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} value={currentData.componentType}
                        onChange={value => handleValueChange('componentType', value as string)} />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Preview" radius="md">
                    <BrokerComponent id={currentData!.id} type={currentData.componentType} handleDefaultValueChange={(value: any) => setCurrentComponent({ ...currentComponent, defaultValue: value })} />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
                <BrokerEdit id={id} />
                <Space h="sm" />
                <Button
                    onClick={handleEditBroker}
                >Save Broker</Button>
            </Grid.Col>
        </Grid>
    );
};