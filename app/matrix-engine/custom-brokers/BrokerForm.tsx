"use client";

import { Broker, Component } from '@/types/broker';
import { Button, Container, Flex, SimpleGrid, Space } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { useBroker } from '@/context/brokerContext';
import { v4 as uuidv4 } from 'uuid';
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
    }, [components]);
    const handleSave = () => {
        const brokerExists = brokers.some((broker: Broker) => broker.id === id);

        const newComponents = components.map((component) => ({
            ...component,
            componentId: uuidv4(),
        }));

        const newBroker: Broker = {
            id: brokerExists ? id : uuidv4(),
            name: `${components.map(c => c.type).join('-')}-${Date.now()}`,
            dataType: ['string'],
            components: newComponents,
        };

        if (brokerExists) {
            const updatedBrokers = brokers.map((broker: Broker) => {
                if (broker.id === id) {
                    return newBroker;
                }
                return broker;
            });
            setBrokers([...updatedBrokers]);
        } else {
            const updatedBrokers = [...brokers, newBroker];
            setBrokers(updatedBrokers);
            setEditingId(newBroker.id);
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
                        <div key={component.componentId}>
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