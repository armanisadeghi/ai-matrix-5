"use client";

import { Broker } from '@/types/broker';
import { Button, Container, Flex, SimpleGrid, Space } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { useBroker } from '@/context/brokerContext';
import { uuid } from 'uuidv4';

interface BrokerFormProps {
    setEditingId: Function;
}

export const BrokerForm = ({ setEditingId }: BrokerFormProps) => {
    const { setBrokers, brokers, currentBroker, setCurrentBroker } = useBroker()
    const handleSave = () => {
        const newBroker: Broker = {
            id: currentBroker.id === '' ? uuid() : currentBroker.id,
            name: `${currentBroker.components.map(c => c.type).join('-')}`,
            dataType: ['string'],
            components: currentBroker.components,
        };

        if (currentBroker.id === '') {
            setBrokers([...brokers, newBroker]);
            setEditingId(newBroker.id);
        } else {
            setBrokers([...brokers.filter((broker) => broker.id !== currentBroker.id), newBroker]);
            setEditingId(currentBroker.id);
        }
    };

    return (
        <Container>
            {currentBroker.components.length > 0 && <>
                <SimpleGrid>
                    {currentBroker.components.map((component) => (
                        <div key={component.componentId} onClick={() => setEditingId(component.componentId)}>
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
            </>}
        </Container>
    )
};