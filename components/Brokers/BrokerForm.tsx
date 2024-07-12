"use client";

import { activeUserAtom } from '@/state/userAtoms';
import { Button, Fieldset, Space, TextInput, Grid, Select, Tooltip, Textarea, Group, Text, useCombobox, Combobox, Input, InputBase } from '@mantine/core';
import { ComponentType, Broker, ComponentTypeInfo, Component } from '@/types/broker';
import { brokersAtom, componentAtomFamily, componentsAtom, selectedComponentSelector } from '@/context/atoms/brokerAtoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { createBrokerManager } from '@/services/brokerService';
import { BrokerEdit } from '../../app/dashboard/matrix-engine/brokers/add/BrokerEdit';
import { Notifications } from "@mantine/notifications";
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import BrokerComponent from './BrokerComponent';

interface Item {
    value: string;
    label: string;
    description: string;
}


const dataTypeOptions: Item[] = [
    { value: 'str', label: 'Text', description: 'Simple words, sentences and paragraphs of any type of text (Very Flexible).' },
    { value: 'int', label: 'Whole Number', description: 'Numbers without decimals, like 1, 2, 3.' },
    { value: 'float', label: 'Number with decimals', description: 'Numbers with fractions, like 1.5, 2.75.' },
    { value: 'bool', label: 'Yes/No', description: 'A simple choice between Yes or No.' },
    { value: 'json', label: 'Dictionary/JSON', description: 'Structured data with keys and values, like an address book where each contact has a name, address, and phone number.' },
    { value: 'list', label: 'Comma Separated List or Array', description: 'A collection of items, like a shopping list separated by commas.' },
    { value: 'url', label: 'URL Link', description: 'A web address, like https://example.com.' },
];

interface BrokerFormProps {
    id: string;
}

export const BrokerForm = ({ id }: BrokerFormProps) => {
    const brokerManager = createBrokerManager();
    const [brokers, setBrokers] = useRecoilState(brokersAtom);
    const currentComponent = useRecoilValue(selectedComponentSelector(id));
    const setCurrentComponent = useSetRecoilState(componentsAtom);
    const activeUser = useRecoilValue(activeUserAtom);
    const [currentData, setCurrentData] = useState<Broker>(brokers.filter((broker: Broker) => broker.id === id)[0] || {});
    const [componentOptions, setComponentOptions] = useState(Object.entries(ComponentType).map(([key, value]) => ({
        value: key,
        label: value.label,
    })));


    useEffect(() => {
        if (!currentData) {
            const newBroker: Broker = {
                id: id,
                displayName: '',
                officialName: '',
                description: '',
                componentType: 'Input',
                dataType: 'str',
                tooltip: '',
                userId: '',
                matrixId: activeUser.matrixId || '',
                validationRules: '{}',
            };

            setBrokers((prev: Broker[]) => ([...prev, newBroker as Broker]));
            setCurrentComponent((prev) => ([...prev, { id: id, label: '', type: 'Input', description: '', tooltip: '' }]));
            return () => {
                setBrokers((prev: Broker[]) => prev.filter((broker) => broker.id !== newBroker.id));
                setCurrentComponent((prev) => prev.filter((component) => component.id !== newBroker.id));
            };
        } else {
            const componentProperties = JSON.parse(currentData.validationRules || '{}');
            setCurrentComponent((prev) => ([...prev, { id: id, label: currentData.displayName, type: currentData.componentType, description: currentData.description, tooltip: currentData.tooltip }]));
            setCurrentData((prev) => ({ ...prev, validationRules: JSON.stringify(componentProperties) }));
        }

    }, []);
    function SelectOption({ value, label, description }: Item) {
        return (
            <Group>
                <div>
                    <Text fz="sm" fw={500}>
                        {label}
                    </Text>
                    <Text fz="xs" opacity={0.6}>
                        {description}
                    </Text>
                </div>
            </Group>
        );
    }

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const handleEditBroker = () => {
        try {
            const broker = {
                ...currentData,
                displayName: currentData?.displayName,
                description: currentData?.description,
                dataType: currentData?.dataType,
                officialName: `${currentData?.displayName.toUpperCase().replace(/\s/g, '_')}_1001`,
                componentType: currentData?.componentType,
                tooltip: currentData?.tooltip,
                sampleEntries: currentData?.sampleEntries,
                validationRules: JSON.stringify(currentComponent)
            }
            currentData ? brokerManager.updateBroker(broker as Broker) : brokerManager.createBroker(broker as Broker);
            Notifications.show({
                title: `${currentData ? 'Broker updated' : 'Broker created'}`,
                message: `${currentData ? 'Broker updated' : 'Broker created'} successfully`,
                autoClose: true,
                color: 'teal',
            })
        } catch (error) {
            Notifications.show({
                title: `Broker ${currentData ? 'update' : 'creation'} failed`,
                message: `Broker ${currentData ? 'update' : 'creation'} failed`,
                autoClose: true,
                color: 'red',
            })
        }
    };

    const handleValueChange = (data: string, value: string | number | boolean) => {
        currentData && setCurrentData({ ...currentData, [data]: value });
        const updatedComponent = { ...currentComponent };
        if (data === 'displayName') {
            updatedComponent.label = value as string;
        } else if (data === 'description') {
            updatedComponent.description = value as string;
        } else if (data === 'tooltip') {
            updatedComponent.tooltip = value as string;
        } else if (data === 'componentType') {
            updatedComponent.type = value as ComponentTypeInfo['type'];
        }
        setCurrentComponent((prev: Component[]) => {
            return [...prev.filter((component: Component) => component.id !== currentData.id), updatedComponent]
        });
    }

    const selectedOption = dataTypeOptions.find((item) => item.value === currentData.dataType);

    const handleDataTypeChange = (value: string | null) => {
        const filteredType = Object.entries(ComponentType).filter(([key, item]) => item.type === value);
        setCurrentData({ ...currentData, dataType: value as typeof currentData['dataType'], componentType: filteredType[0][0] });
    };

    const options = dataTypeOptions.map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
            <SelectOption {...item} />
        </Combobox.Option>
    ));

    useEffect(() => {
        if (currentData.componentType) {
            const inputType = Object.entries(ComponentType).filter(([key, value]) => key === currentData.componentType)[0][1].type;
            setComponentOptions(Object.entries(ComponentType).filter(([key, value]) => value.type === inputType).map(([key, value]) => ({
                value: key,
                label: value.label,
            })));
        }
    }, [currentData.dataType]);

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties">
                    <TextInput
                        label="Name"
                        onChange={(value) => handleValueChange('displayName', value.target.value)}
                        value={currentData.displayName || ''}
                        placeholder='Enter a name'
                    />
                    <Space h="sm" />
                    <Combobox
                        store={combobox}
                        withinPortal={false}
                        onOptionSubmit={(value) => {
                            handleDataTypeChange(value)
                            combobox.closeDropdown();
                        }}
                    >
                        <Combobox.Target>
                            <InputBase
                                label="Data Type"
                                component="button"
                                type="button"
                                pointer
                                rightSection={<Combobox.Chevron />}
                                onClick={() => combobox.toggleDropdown()}
                                rightSectionPointerEvents="none"
                                multiline
                            >
                                {selectedOption ? (
                                    <SelectOption {...selectedOption} />
                                ) : (
                                    <Input.Placeholder>Pick value</Input.Placeholder>
                                )}
                            </InputBase>
                        </Combobox.Target>

                        <Combobox.Dropdown>
                            <Combobox.Options>{options}</Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                    <Space h="sm" />
                    <Textarea resize='both' label="Description" value={currentData.description || ''}
                        onChange={value => handleValueChange('description', value.target.value)} placeholder='Enter a description' />
                    <Space h="sm" />
                    <Select label="Component" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} value={currentData.componentType}
                        onChange={value => handleValueChange('componentType', value as string)} />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Preview" radius="md">
                    <BrokerComponent id={currentData!.id} type={currentData.componentType} handleDefaultValueChange={(value: any) => setCurrentComponent(prev => [...prev, { ...currentComponent, defaultValue: value }])} />
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
