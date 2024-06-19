'use client'

import { Button, Fieldset, Space, TextInput, Text, Grid, Select } from '@mantine/core'
import BrokerComponent from '../BrokerComponent'
import { Component, ComponentType, Broker } from '@/types/broker'
import { useState } from 'react'
import { brokersAtom } from '@/context/atoms/brokerAtoms'
import { useRecoilValue } from 'recoil'
import { createBrokerManager } from '@/services/brokerService'
import { BrokerEdit } from './BrokerEdit'
import { Notifications } from '@mantine/notifications'

const initialValues = {
    id: '',
    name: '',
    officialName: '',
    defaultValue: '',
    dataType: '',
    component: {} as Component,
    description: ''
}

export const BrokerCreateForm = () => {
    const brokers = useRecoilValue(brokersAtom)
    const brokerManager = createBrokerManager()
    const [currentData, setCurrentData] = useState<Broker>({
        ...initialValues
    } as Broker)

    const componentOptions = Object.keys(ComponentType).map((key) => ({
        key: key,
        value: key,
        label: key
    })) as { value: string; label: string }[]

    const handleAddBroker = () => {
        const dataType = currentData.component.defaultValue
            ? typeof currentData.component.defaultValue
            : (typeof currentData.component.type.valueOf() as string)
        try {
            brokerManager.createBroker({
                ...currentData,
                dataType: dataType,
                officialName: currentData.name.toUpperCase().replace(/\s/g, '_')
            })
            setCurrentData(initialValues)
            Notifications.show({
                title: 'Broker created',
                message: 'Broker created successfully',
                autoClose: true,
                color: 'teal'
            })
        } catch (error) {
            Notifications.show({
                title: 'Broker creation failed',
                message: 'Broker creation failed',
                autoClose: true,
                color: 'red'
            })
        }
    }

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties">
                    <TextInput
                        label="Name"
                        onChange={(value) =>
                            setCurrentData({
                                ...currentData,
                                name: value.target.value,
                                component: { ...currentData.component, label: value.target.value }
                            })
                        }
                        value={currentData.name}
                        placeholder="Enter a name"
                        error={
                            brokers.some((broker) => broker.name === currentData.name)
                                ? 'Name already exists. Please choose a different name.'
                                : null
                        }
                    />
                    <Space h="sm" />
                    <TextInput
                        label="Description"
                        value={currentData.description}
                        onChange={(value) =>
                            setCurrentData({
                                ...currentData,
                                description: value.target.value,
                                component: {
                                    ...currentData.component,
                                    description: value.target.value
                                }
                            })
                        }
                        placeholder="Enter a description"
                    />
                    <Space h="sm" />
                    <Select
                        label="Type"
                        description="Choose the type of component"
                        placeholder="Choose the type of component"
                        data={componentOptions}
                        value={currentData.component.type}
                        onChange={(value) =>
                            setCurrentData({
                                ...currentData,
                                component: { ...currentData.component, type: value as string }
                            })
                        }
                    />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Preview" radius="md">
                    <BrokerComponent
                        currentComponent={currentData.component}
                        type={currentData.component.type}
                        handleDefaultValueChange={(value: any) =>
                            setCurrentData({
                                ...currentData,
                                component: { ...currentData.component, defaultValue: value }
                            })
                        }
                    />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
                <BrokerEdit currentData={currentData} setCurrentData={setCurrentData} />
                <Space h="sm" />
                <Button
                    onClick={handleAddBroker}
                    disabled={
                        brokers.some((broker) => broker.name === currentData.name) ||
                        currentData.name.trim() === ''
                    }
                >
                    Save Broker
                </Button>
            </Grid.Col>
        </Grid>
    )
}
