"use client";

import { Broker } from '@/types/broker';
import { Button, Container, SimpleGrid, Space } from '@mantine/core';
import BrokerComponent from '../BrokerComponent';
import { useRecoilValue } from 'recoil';
import { createBrokerManager } from '@/services/brokerService';
import { useState } from 'react';
import { brokerAtom } from '@/context/atoms/brokerAtoms';


export const BrokerForm = () => {
    const [editedBroker, setEditedBroker] = useState({} as Broker);
    const currentBroker = useRecoilValue(brokerAtom(editedBroker.id));
    const brokerManager = createBrokerManager();
    const handleSave = () => {
        brokerManager.updateBroker(editedBroker);
    };

    return (
        <Container>
            <SimpleGrid>
                {currentBroker && currentBroker.component && <BrokerComponent
                    currentComponent={currentBroker.component}
                    type={currentBroker.component.type}
                    handleDefaultValueChange={(value: any) => setEditedBroker({ ...currentBroker, component: { ...currentBroker.component, defaultValue: value } })} />}
            </SimpleGrid>
            <Space h="md" />
            <Button variant="primary" onClick={handleSave}>Save Broker</Button>
        </Container>
    )
};