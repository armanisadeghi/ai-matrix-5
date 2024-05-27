"use client";

import { useContext, useState } from 'react';
import {
    Group,
    Button,
    Paper,
    TextInput,
    Center,
    Container,
    Title,
    Select,
    Checkbox,
    Space,
} from '@mantine/core';
import { BrokerContext } from '@/context/brokerContext';
import { Broker, BrokerComponent, BrokerContextValue, ComponentType } from '@/types/broker';
import { Form, useForm } from '@mantine/form';
import BrokerList from './BrokerList';

const BrokerForm: React.FC = () => {
    const { brokers } = useContext(BrokerContext);
    const [state, setState] = useState<BrokerContextValue>({
        brokers: brokers,
    });
    const [broker, setBroker] = useState<Broker>({} as Broker);
    const [currentBrokerComponent, setCurrentBrokerComponent] = useState<BrokerComponent>({} as BrokerComponent);

    const addComponentToCurrentBroker = (component: BrokerComponent) => {
        const timestamp = Date.now();
        setCurrentBrokerComponent((prev) => ({
            ...prev,
            id: timestamp.toString(),
            name: component.name,
        }));
    };

    const handleSubmit = () => {
        setState((prevState) => ({
            ...prevState,
            brokers: [...prevState.brokers],
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState((prevState) => ({
            ...prevState,
            broker: {
                ...prevState,
                [e.target.name]: e.target.value,
            },
        }));
    };

    const handleDelete = (id: string) => {
        setState((prevState) => ({
            ...prevState,
            brokers: prevState.brokers.filter((broker) => broker.id !== id),
        }));
    };

    const handleEdit = (id: string) => {
        const brokerToEdit = state.brokers.find((broker) => broker.id === id);
        if (brokerToEdit) {
            setState((prevState) => ({
                ...prevState,
                broker: { ...brokerToEdit },
            }));
        }
    };

    const renderInputFields = (component: string) => {
        if (currentBrokerComponent.name === 'input') {
            return (
                <>
                    <TextInput
                        label="Label"
                        value={currentBrokerComponent.label || ''}
                        onChange={(e) => setCurrentBrokerComponent((prevComponent) => ({
                            ...prevComponent,
                            label: e.currentTarget.value,
                        }))}
                    />
                    <TextInput
                        label="Placeholder"
                        value={currentBrokerComponent.placeholder || ''}
                        onChange={(e) => setCurrentBrokerComponent((prevComponent) => ({
                            ...prevComponent,
                            placeholder: e.currentTarget.value,
                        }))}
                    />
                    <Checkbox
                        label="Required"
                        checked={currentBrokerComponent.required || false}
                        onChange={(e) => setCurrentBrokerComponent((prevComponent) => ({
                            ...prevComponent,
                            required: e.currentTarget.checked,
                        }))}
                    />
                </>
            );
        }
        return null;
    };

    const renderComponentContainer = (component: string) => {
        switch (component) {
            case 'input':
                return (
                    <Paper withBorder p="md" style={{ width: '100%', height: '100%' }}>
                        <Title order={3}>{broker.name || 'New Broker'}</Title>

                        <TextInput
                            style={{ width: '100%' }}
                            label={currentBrokerComponent.label || 'Name of the input'}
                            placeholder={currentBrokerComponent.placeholder || 'Placeholder'}
                            required={currentBrokerComponent.required || false}
                        />
                    </Paper>
                );
            case 'select':
                return (
                    <Paper withBorder p="md" style={{ width: '100%', height: '100%' }}>
                        <Title order={3}>{broker.name || 'New Broker'}</Title>
                        <Select
                            label="Select Field">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                            <option value="option5">Option 5</option>
                        </Select>
                    </Paper>
                );
            default:
                return null;
        }
    };

    const componentOptions = [
        { value: ComponentType.Input, label: 'Input' },
        { value: ComponentType.Select, label: 'Select' },
        { value: ComponentType.Textarea, label: 'Textarea' },
    ];

    const handleComponentChange = (e: string) => {
        if (currentBrokerComponent.name) {
            setState((prevState: any) => ({
                ...prevState,
                broker: [
                    ...prevState.broker,
                    {
                        ...currentBrokerComponent,
                    },
                ],
            }));
            setCurrentBrokerComponent({
                id: Date.now().toString(),
                name: '',
            });
        }
    };

    const form = useForm({
        initialValues: [],
    });

    return (
        <Form form={form} onSubmit={handleSubmit}>
            <Paper withBorder p='md' style={{ width: '100%' }}>
                <Group style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Paper p="md" style={{ width: '45%' }}>
                        <TextInput
                            label="Broker Name"
                            value={broker.name || 'New Broker'}
                            onChange={(e) => setBroker((prev) => ({ ...prev, name: e.currentTarget.value }))}
                        />
                        <Space h="md" />
                        <Select
                            label="Component"
                            defaultValue="Select a component"
                            data={componentOptions}
                            value={currentBrokerComponent.name || 'Select a component'}
                            onChange={(e) => setCurrentBrokerComponent((prevComponent) => ({
                                ...prevComponent,
                                name: e || '',
                            }))}
                        />
                        <Space h="md" />
                        <Group>
                            {renderInputFields(currentBrokerComponent.name)}
                        </Group>
                    </Paper>
                    {currentBrokerComponent && (
                        <Paper style={{ width: '45%' }}>
                            {renderComponentContainer(currentBrokerComponent.name)}
                        </Paper>
                    )}
                </Group>
                <Group p="md">
                    <Button type='submit'>Save Broker</Button>
                    <Button variant="default">Add New Component</Button>
                </Group>
            </Paper>
        </Form>
    );
};


const Brokers: React.FC = () => {
    const brokers = [
        { id: '1', name: 'John Doe', tags: ['tag1', 'tag2'] },
        { id: '2', tags: ['tag3', 'tag4'] },
    ];

    const handleDelete = (id: string) => {

    };

    const handleEdit = (id: string) => {
    };
    return (
        <Container size={1200} py="xl">
            <Center>
                <Title order={2}>Brokers</Title>
            </Center>
            <BrokerForm />
            <Space h="xl" />
            <Center>
                <Title order={3}>My Brokers</Title>
            </Center>
            <BrokerList brokers={brokers} onDelete={handleDelete} onEdit={handleEdit} />
        </Container>
    );
};

export default Brokers;