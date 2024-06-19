'use client'

import { Paper, SimpleGrid, Textarea } from '@mantine/core'
import BrokerComponent from '../BrokerComponent'
import { Broker } from '@/types/broker'

export const BrokerTestForm = ({
    question,
    setQuestion,
    brokerValue,
    setBrokerValue
}: {
    question: string
    setQuestion: any
    brokerValue: Broker[]
    setBrokerValue: Function
}) => {
    const handleDefaultValueChange = (value: any, broker: Broker) => {
        setBrokerValue((prev: Broker[]) => [
            ...prev.map((b) =>
                b.id === broker.id
                    ? { ...b, component: { ...b.component, defaultValue: value } }
                    : b
            )
        ])
    }

    return (
        <SimpleGrid>
            <Textarea
                autosize
                onChange={(e) => setQuestion(e.target.value)}
                defaultValue={question}
            />
            {brokerValue.length > 0 && (
                <Paper withBorder p="md">
                    {brokerValue.map((broker) => (
                        <Paper key={broker.id} p="md">
                            <BrokerComponent
                                currentComponent={broker.component}
                                type={broker.component.type}
                                handleDefaultValueChange={(value: any) =>
                                    handleDefaultValueChange(value, broker)
                                }
                            />
                        </Paper>
                    ))}
                </Paper>
            )}
        </SimpleGrid>
    )
}
