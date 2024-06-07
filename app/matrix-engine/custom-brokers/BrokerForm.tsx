"use client";

import { Broker, Component } from '@/types/broker';
import { Button, Container, SimpleGrid, Space } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { useBroker } from '@/context/brokerContext';


export const BrokerForm = ({ components, id }: { components: Component[], id: string }) => {
    const { setBrokers, brokers } = useBroker()

    const handleSave = () => {
        const brokerExists = brokers.some((broker: Broker) => broker.id === id);

        const newBroker: Broker = {
            id: Date.now().toString(),
            name: `${components.map(c => c.type).join('-')}-${Date.now()}`,
            dataType: ['string'],
            components: components
        }

        if (brokerExists) {
            const updatedBrokers = brokers.map((broker: Broker) => {
                if (broker.id === newBroker.id) {
                    return newBroker;
                }
                return broker;
            });
            setBrokers([newBroker, ...updatedBrokers.filter((b: Broker) => b.id !== newBroker.id)]);
        } else {
            const updatedBrokers = [newBroker, ...brokers];
            setBrokers(updatedBrokers);
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