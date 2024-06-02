"use client";

import { Broker, Component } from '@/types/broker';
import { Button, Container, Flex, SimpleGrid, Space } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { useBroker } from '@/context/brokerContext';
import { uuid } from 'uuidv4';
import { useEffect, useState } from 'react';

interface BrokerFormProps {
    components: Component[];
    setBrokerComponents: Function;
    id: string;
    setEditingId: Function;
}

export const BrokerForm = ({ components, setBrokerComponents, id, setEditingId }: BrokerFormProps) => {
    const { setBrokers, brokers } = useBroker()

    useEffect(() => {
        setBrokerComponents(components);
    }, []);
    const handleSave = () => {
        const newBroker: Broker = {
            id: id === '' ? uuid() : id,
            name: `${components.map(c => c.type).join('-')}`,
            dataType: ['string'],
            components: components,
        };

        if (id === '') {
            setBrokers([...brokers, newBroker]);
            setEditingId(newBroker.id);
        } else {
            setBrokers([...brokers.filter((broker) => broker.id !== id), newBroker]);
            setEditingId(id);
        }
    };

    const handleDeleteComponent = (componentId: string) => {
        const updatedComponents = components.filter((component) => componentId !== component.componentId);
        setBrokerComponents(updatedComponents);
    }

    return (
        <Container>
            {components.length > 0 && <>
                <SimpleGrid>
                    {components.map((component) => (
                        <div key={component.componentId} onClick={() => setEditingId(component.componentId)}>
                            <BrokerComponent component={component} type={component.type} />
                            <Space h="xs" />
                            <Flex justify="flex-end">
                                {component && (
                                    <Button variant="light" onClick={() => handleDeleteComponent(component.componentId)}>
                                        Delete
                                    </Button>
                                )}
                            </Flex>
                        </div>
                    ))}
                </SimpleGrid>
                <Space h="md" />
                <Button variant="primary" onClick={handleSave}>Save Broker</Button>
            </>}
        </Container>
    )
};