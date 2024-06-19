'use client'

import React, { useState } from 'react'
import { Button, Textarea, Select, Container, Title, Space } from '@mantine/core'
import { useWebSocketText } from '@/hooks/redis/useWebSocketText'
import { useWebSocketData } from '@/hooks/redis/useWebSocketData'
import AmeJsonInput from '@/ui/json/AmeJsonInput'
import { RequestPayload } from '@/types/requests'

const ExampleComponent: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const [data, setData] = useState<string>('{}')
    const [communicationType, setCommunicationType] = useState<'text' | 'data'>('text')

    const [textRequest, setTextRequest] = useState<RequestPayload>({
        channel: 'webSocketText',
        metadata: {
            requestId: 'text-request-1',
            taskSpecs: {},
            user: {}
        },
        data: {},
        settings: {}
    })

    const [dataRequest, setDataRequest] = useState<RequestPayload>({
        channel: 'webSocketData',
        metadata: {
            requestId: 'data-request-1',
            taskSpecs: {},
            user: {}
        },
        data: {},
        settings: {}
    })

    const [textResponse, sendTextRequest] = useWebSocketText(textRequest)
    const [dataResponse, sendDataRequest] = useWebSocketData(dataRequest)

    const handleSendText = () => {
        sendTextRequest(message)
        setMessage('')
    }

    const handleSendData = () => {
        sendDataRequest(JSON.parse(data))
        setData('{}')
    }

    return (
        <Container>
            <Title>WebSocket Example</Title>
            <Space h="md" />

            <Select
                label="Communication Type"
                placeholder="Pick one"
                data={[
                    { value: 'text', label: 'Text' },
                    { value: 'data', label: 'Data' }
                ]}
                value={communicationType}
                onChange={(value) => setCommunicationType(value as 'text' | 'data')}
            />
            <Space h="md" />

            {communicationType === 'text' ? (
                <>
                    <Textarea
                        label="Message"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(event) => setMessage(event.currentTarget.value)}
                        minRows={4}
                    />
                    <Space h="md" />
                    <Button onClick={handleSendText}>Send Text</Button>
                    <Space h="md" />
                    <Textarea
                        label="Received Text"
                        placeholder="Incoming text messages"
                        value={textResponse?.data || ''}
                        readOnly
                        minRows={4}
                    />
                </>
            ) : (
                <>
                    <AmeJsonInput label="Data" value={data} onChange={setData} />
                    <Space h="md" />
                    <Button onClick={handleSendData}>Send Data</Button>
                    <Space h="md" />
                    <AmeJsonInput
                        label="Received Data"
                        value={dataResponse?.data || {}}
                        enabled={false}
                    />
                </>
            )}
        </Container>
    )
}

export default ExampleComponent
