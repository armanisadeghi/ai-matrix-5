import { brokersAtom } from '@/context/atoms';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, TextInput, Button, Container, Center, Grid, Text, Switch, Textarea, JsonInput } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useSocket } from '@/utils/socketio/useSocket';
import { activeRecipeIdAtom, activeRecipeStreamAtom, activeRecipeResponseAtom, modelNameOverrideAtom, BrokerValue } from '@/state/aiAtoms/recipeAtoms';
import { processorOverridesAtom, otherOverridesAtom, requestStreamAtom, runSimpleRecipeSocketTaskSelector } from '@/state/aiAtoms/recipeAtoms';
import { v4 } from 'uuid';

const AiRecipeTester: React.FC = () => {
    const [recipeId, setRecipeId] = useRecoilState(activeRecipeIdAtom);

    const socketTask = useRecoilValue(runSimpleRecipeSocketTaskSelector(recipeId));


    const [modelOverrides, setModelOverrides] = useRecoilState(modelNameOverrideAtom);
    const [processorOverrides, setProcessorOverrides] = useRecoilState(processorOverridesAtom);
    const [otherOverrides, setOtherOverrides] = useRecoilState(otherOverridesAtom);
    const [requestStream, setRequestStream] = useRecoilState(requestStreamAtom);
    const [streamData, setStreamData] = useRecoilState(activeRecipeStreamAtom);
    const [responseData, setResponseData] = useRecoilState(activeRecipeResponseAtom);
    const [brokers, setBrokers] = useRecoilState(brokersAtom);

    const { socketStatus, isAuthenticated, startTask } = useSocket();


    const handleSubmit = useCallback(() => {
        if (socketTask.length > 0) {
            console.log('handleSubmit Starting task:', socketTask)
            startTask('simple_recipe', socketTask);
        } else {
            console.error('socketTask is empty');
        }
    }, [startTask, socketTask]);

    const handleAddBroker = useCallback(() => {
        const newBroker: BrokerValue = {
            id: v4(),
            official_name: '',
            name: '',
            value: '',
            data_type: 'str',
            ready: false,
        };
        setBrokers(prevBrokers => [...prevBrokers, newBroker]);
    }, [setBrokers]);

    const handleUpdateBroker = useCallback((index: number, field: keyof BrokerValue, value: any) => {
        setBrokers(prevBrokers =>
            prevBrokers.map((broker, i) =>
                i === index ? { ...broker, [field]: value } : broker
            )
        );
    }, [setBrokers]);

    const areBrokersReady = brokers.every(broker => broker.ready);

    return (
        <Container size="xl">
            <Center style={{minHeight: '100vh'}}>
                <Card shadow="sm" padding="lg" style={{width: '800px'}}>
                    <Text fw={500} size="xl" mb="md">AI Recipe Tester</Text>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Recipe ID"
                                value={recipeId}
                                onChange={(e) => setRecipeId(e.target.value)}
                                mb="sm"
                            />
                            <Switch
                                label="Request Stream"
                                checked={requestStream}
                                onChange={(e) => setRequestStream(e.currentTarget.checked)}
                                mb="sm"
                            />
                            <Button onClick={handleAddBroker} mb="sm" variant="outline">Add Broker</Button>
                            {brokers.map((broker, index) => (
                                <Card key={broker.id} shadow="xs" mb="sm" withBorder>
                                    <TextInput
                                        label="Broker Official Name"
                                        value={broker.official_name}
                                        onChange={(e) => handleUpdateBroker(index, 'official_name', e.target.value)}
                                        mb="xs"
                                    />
                                    <TextInput
                                        label="Broker Name"
                                        value={broker.name}
                                        onChange={(e) => handleUpdateBroker(index, 'name', e.target.value)}
                                        mb="xs"
                                    />
                                    <Textarea
                                        label="Broker Value"
                                        value={broker.value}
                                        onChange={(e) => handleUpdateBroker(index, 'value', e.target.value)}
                                        mb="xs"
                                    />
                                    <Switch
                                        label="Broker Ready"
                                        checked={broker.ready}
                                        onChange={(e) => handleUpdateBroker(index, 'ready', e.currentTarget.checked)}
                                    />
                                </Card>
                            ))}
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <JsonInput
                                label="Model Overrides"
                                value={JSON.stringify(modelOverrides, null, 2)}
                                onChange={(value) => setModelOverrides(JSON.parse(value))}
                                mb="sm"
                                formatOnBlur
                                autosize
                                minRows={2}
                            />
                            <JsonInput
                                label="Processor Overrides"
                                value={JSON.stringify(processorOverrides, null, 2)}
                                onChange={(value) => setProcessorOverrides(JSON.parse(value))}
                                mb="sm"
                                formatOnBlur
                                autosize
                                minRows={2}
                            />
                            <JsonInput
                                label="Other Overrides"
                                value={JSON.stringify(otherOverrides, null, 2)}
                                onChange={(value) => setOtherOverrides(JSON.parse(value))}
                                mb="sm"
                                formatOnBlur
                                autosize
                                minRows={2}
                            />
                        </Grid.Col>
                    </Grid>
                    <Button fullWidth mt="md" onClick={handleSubmit} disabled={!areBrokersReady} variant="outline">
                        Submit
                    </Button>
                    {streamData && (
                        <Text mt="md">
                            Stream Data: {streamData}
                        </Text>
                    )}
                    {responseData && (
                        <Text mt="md">
                            Response Data: {responseData}
                        </Text>
                    )}
                    <JsonInput
                        label="Socket Task (Read Only)"
                        value={JSON.stringify(socketTask, null, 2)}
                        mb="sm"
                        formatOnBlur
                        autosize
                        minRows={4}
                        readOnly
                    />
                </Card>
            </Center>
        </Container>
    );
}

export default AiRecipeTester;
