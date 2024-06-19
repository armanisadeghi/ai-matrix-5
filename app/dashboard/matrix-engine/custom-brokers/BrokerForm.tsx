'use client'

import { Broker, Component } from '@/types/broker'
import { Button, Container, Flex, SimpleGrid, Space } from '@mantine/core'
import BrokerComponent from './BrokerComponent'
import { useRecoilValue } from 'recoil'
import { createBrokerManager } from '@/services/brokerService'
import { currentBrokerAtom } from '../../../../context/atoms/brokerAtoms'

export const BrokerForm = () => {
    const currentBroker = useRecoilValue(currentBrokerAtom)
    const brokerManager = createBrokerManager()

    const handleSave = () => {
        brokerManager.createBroker(currentBroker)
        brokerManager.setCurrentBroker({ ...currentBroker, component: {} as Component })
    }

    const handleEdit = () => {
        brokerManager.setCurrentBroker({ ...currentBroker, component: {} as Component })
    }

    return (
        <Container>
            <SimpleGrid>
                {currentBroker.component && (
                    <div>
                        <BrokerComponent
                            currentComponent={currentBroker.component}
                            type={currentBroker.component.type}
                        />
                        <Space h="xs" />
                        <Flex justify="flex-end">
                            <Button variant="light" onClick={handleEdit}>
                                Delete
                            </Button>
                        </Flex>
                    </div>
                )}
            </SimpleGrid>
            <Space h="md" />
            <Button variant="primary" onClick={handleSave}>
                Save Broker
            </Button>
        </Container>
    )
}
