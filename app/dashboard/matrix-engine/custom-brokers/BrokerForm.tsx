"use client";

import { Broker } from '@/types/broker';
import { Button, Container, Flex, SimpleGrid, Space } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { useBroker } from '@/context/brokerContext';
import { uuid } from 'uuidv4';


export const BrokerForm = () => {
    const { setBrokers, brokers, currentBroker, setCurrentBroker } = useBroker()
    const handleSave = () => {
        setBrokers([{
            ...currentBroker, id: uuid(), name: `${currentBroker.components.map(c => c.type).join('-')}`,
            dataType: ['string'], components: currentBroker.components
        }, ...brokers.filter((broker) => broker.id !== currentBroker.id)]);
    };

    return (
        <Container>
            <SimpleGrid>
                {currentBroker.components.map((component) => (
                    <div key={component.componentId}>
                        <BrokerComponent type={component.type} currentComponent={component} />
                        <Space h="xs" />
                        <Flex justify="flex-end">
                            {component && (
                                <Button variant="light" onClick={() => setCurrentBroker({ ...currentBroker, components: currentBroker.components.filter((c) => c.componentId !== component.componentId) })}>
                                    Delete
                                </Button>
                            )}
                        </Flex>
                    </div>
                ))}
            </SimpleGrid>
            <Space h="md" />
            <Button variant="primary" onClick={handleSave}>Save Broker</Button>
        </Container>
    )
};