"use client";

import { Broker, Component } from '@/types/broker';
import { Button, Container, Flex, SimpleGrid, Space } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { useBroker } from '@/context/brokerContext';
import { uuid } from 'uuidv4';


export const BrokerForm = () => {
    const { setBrokers, brokers, currentBroker, setCurrentBroker } = useBroker()
    const handleSave = () => {
        setBrokers([{
            ...currentBroker, id: uuid(), name: `${currentBroker.component.type})`,
            dataType: ['string'], component: currentBroker.component
        }, ...brokers.filter((broker) => broker.id !== currentBroker.id)]);
    };

    return (
        <Container>
            <SimpleGrid>
                <div key={currentBroker.component.componentId}>
                    <BrokerComponent type={currentBroker.component.type} currentComponent={currentBroker.component} />
                    <Space h="xs" />
                    <Flex justify="flex-end">
                        {currentBroker.component && (
                            <Button variant="light" onClick={() => setCurrentBroker({ ...currentBroker, component: {} as Component })}>
                                Delete
                            </Button>
                        )}
                    </Flex>
                </div>
            </SimpleGrid>
            <Space h="md" />
            <Button variant="primary" onClick={handleSave}>Save Broker</Button>
        </Container>
    )
};