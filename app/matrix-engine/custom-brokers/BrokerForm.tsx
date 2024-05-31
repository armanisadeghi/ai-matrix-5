"use client";

import { Broker, Component } from '@/types/broker';
import { Button, Container, SimpleGrid, Space } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { useBroker } from '@/context/brokerContext';
import { v4 as uuidv4 } from 'uuid';

interface BrokerFormProps {
    components: Component[];
    id: string;
    setEditingId: Function;
}

export const BrokerForm = ({ components, id, setEditingId }: BrokerFormProps) => {
    const { setBrokers, brokers } = useBroker()

    const handleSave = () => {
        const brokerExists = brokers.some((broker: Broker) => broker.id === id);

        const newBroker: Broker = {
            id: brokerExists ? id : uuidv4(),
            name: `${components.map(c => c.type).join('-')}-${Date.now()}`,
            dataType: ['string'],
            components: components,
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

    return (
        <Container>
            <SimpleGrid>
                {components.map((component, index) => (
                    <BrokerComponent key={index} component={component} type={component.type} />
                ))}
            </SimpleGrid>
            <Space h="md" />
            {components.length > 0 && <Button variant="primary" onClick={handleSave}>Save Broker</Button>}
        </Container>
    )
};