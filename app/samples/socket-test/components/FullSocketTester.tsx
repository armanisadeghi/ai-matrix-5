import { activeRecipeIdAtom, activeRecipeResponseAtom, activeRecipeStreamAtom, brokersAtom, BrokerValue, modelOverridesAtom, otherOverridesAtom, processorOverridesAtom, requestStreamAtom, runSimpleRecipeSocketTaskSelector } from '@/state/aiAtoms/recipeAtoms';
import { useSocket } from '@/utils/socketio/useSocket';
import { Button, Card, Center, Container, Grid, Group, JsonInput, Switch, Text, Textarea, TextInput } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 } from 'uuid';


const FullSocketTester: React.FC = () => {
    const [recipeId, setRecipeId] = useRecoilState(activeRecipeIdAtom);
    const [modelOverrides, setModelOverrides] = useRecoilState(modelOverridesAtom);
    const [processorOverrides, setProcessorOverrides] = useRecoilState(processorOverridesAtom);
    const [otherOverrides, setOtherOverrides] = useRecoilState(otherOverridesAtom);
    const [requestStream, setRequestStream] = useRecoilState(requestStreamAtom);
    const [streamData, setStreamData] = useRecoilState(activeRecipeStreamAtom);
    const [responseData, setResponseData] = useRecoilState(activeRecipeResponseAtom);
    const [brokers, setBrokers] = useRecoilState(brokersAtom);
    const socketTask = useRecoilValue(runSimpleRecipeSocketTaskSelector(recipeId));

    const {socketStatus, isAuthenticated, startTask, addDirectListener, removeDirectListener, isAuthenticatedAndConnected, emitMessage, getSocket, addCatchallListener, removeCatchallListener, addRawPacketListener, removeRawPacketListener} = useSocket();

    // New state for testing capabilities
    const [sessionId, setSessionId] = useState<string>('');
    const [directEventName, setDirectEventName] = useState<string>('');
    const [directEventData, setDirectEventData] = useState<string>('');
    const [classEventName, setClassEventName] = useState<string>('');
    const [classEventData, setClassEventData] = useState<string>('');
    const [directListenerName, setDirectListenerName] = useState<string>('');
    const [directListenerData, setDirectListenerData] = useState<string>('');
    const [classListenerName, setClassListenerName] = useState<string>('');
    const [classListenerData, setClassListenerData] = useState<string>('');
    const [catchallEvents, setCatchallEvents] = useState<string[]>([]);
    const [rawPacketEvents, setRawPacketEvents] = useState<string[]>([]);
    const [dynamicEvents, setDynamicEvents] = useState<string[]>([]);

    useEffect(() => {
        const socket = getSocket();
        if (socket) {
            setSessionId(socket.id || '');
        }
    }, [getSocket, socketStatus]);

    useEffect(() => {
        const handleSimpleRecipeStream = (data: string) => {
            setStreamData(prev => prev + data);
        };

        const handleSimpleRecipeComplete = (data: string) => {
            setResponseData(data);
        };

        addDirectListener('simple_recipe_stream', handleSimpleRecipeStream);
        addDirectListener('simple_recipe_complete', handleSimpleRecipeComplete);

        return () => {
            removeDirectListener('simple_recipe_stream', handleSimpleRecipeStream);
            removeDirectListener('simple_recipe_complete', handleSimpleRecipeComplete);
        };
    }, [addDirectListener, removeDirectListener, setStreamData, setResponseData]);

    useEffect(() => {
        const handleCatchallEvent = (eventName: string, ...args: any[]) => {
            const eventInfo = `Namespace event: ${eventName}, Data: ${JSON.stringify(args)}`;
            setCatchallEvents(prev => [...prev, eventInfo]);
        };

        const handleRawPacket = (packet: any) => {
            if (packet.type === 'message') {
                const eventInfo = `Raw packet: ${JSON.stringify(packet.data)}`;
                setRawPacketEvents(prev => [...prev, eventInfo]);
            }
        };

        const handleDynamicEvent = (eventName: string, data: any) => {
            const eventInfo = `Dynamic event: ${eventName}, Data: ${JSON.stringify(data)}`;
            setDynamicEvents(prev => [...prev, eventInfo]);
        };

        addCatchallListener(handleCatchallEvent);
        addRawPacketListener(handleRawPacket);


        const handleIncomingStreamEvent = (data: { event_name: string }) => {
            console.log('Received incoming stream event:', data.event_name);
            const dynamicListener = (eventData: any) => handleDynamicEvent(data.event_name, eventData);
            addDirectListener(data.event_name, dynamicListener);
        };

        addDirectListener('incoming_stream_event', handleIncomingStreamEvent);

        return () => {
            removeCatchallListener(handleCatchallEvent);
            removeRawPacketListener(handleRawPacket);
            removeDirectListener('incoming_stream_event', handleIncomingStreamEvent);
            // Remove any dynamic listeners here if you've stored them
        };
    }, [addCatchallListener, removeCatchallListener, addRawPacketListener, removeRawPacketListener, addDirectListener, removeDirectListener]);

    const handleSubmit = useCallback(() => {
        if (socketTask.length > 0 && isAuthenticatedAndConnected()) {
            console.log('handleSubmit Starting task:', socketTask)
            startTask('simple_recipe', socketTask);
        } else {
            console.error('Socket not authenticated or connected, or socketTask is empty');
        }
    }, [startTask, socketTask, isAuthenticatedAndConnected]);

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
                i === index ? {...broker, [field]: value} : broker
            )
        );
    }, [setBrokers]);

    const areBrokersReady = brokers.every(broker => broker.ready);

    // New functions for testing capabilities
    const handleDirectEmit = useCallback(() => {
        const socket = getSocket();
        if (socket) {
            socket.emit(directEventName, JSON.parse(directEventData));
        }
    }, [getSocket, directEventName, directEventData]);

    const handleClassEmit = useCallback(() => {
        emitMessage(classEventName, JSON.parse(classEventData));
    }, [emitMessage, classEventName, classEventData]);

    const handleDirectListen = useCallback(() => {
        const socket = getSocket();
        if (socket) {
            socket.on(directListenerName, (data) => {
                setDirectListenerData(JSON.stringify(data, null, 2));
            });
        }
    }, [getSocket, directListenerName]);

    const handleClassListen = useCallback(() => {
        addDirectListener(classListenerName, (data) => {
            setClassListenerData(JSON.stringify(data, null, 2));
        });
    }, [addDirectListener, classListenerName]);

    return (
        <Container size="xl">
            <Center style={{minHeight: '100vh'}}>
                <Card shadow="sm" padding="lg" style={{width: '1000px'}}>
                    <Text fw={500} size="xl" mb="md">AI Recipe Tester</Text>
                    <Text>Socket Status: {socketStatus}</Text>
                    <Text>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</Text>
                    <Text>Session ID: {sessionId}</Text>
                    <Card shadow="sm" padding="sm" mt="md">
                        <Text fw={500}>Catchall Events</Text>
                        <Textarea
                            value={catchallEvents.join('\n')}
                            readOnly
                            minRows={2}
                            autosize
                        />
                    </Card>
                    <Card shadow="sm" padding="sm" mt="md">
                        <Text fw={500}>Namespace Events</Text>
                        <Textarea
                            value={catchallEvents.join('\n')}
                            readOnly
                            minRows={5}
                            maxRows={10}
                        />
                    </Card>

                    {/* Raw Packet Events Display */}
                    <Card shadow="sm" padding="sm" mt="md">
                        <Text fw={500}>Raw Packet Events</Text>
                        <Textarea
                            value={rawPacketEvents.join('\n')}
                            readOnly
                            minRows={5}
                            maxRows={10}
                        />
                    </Card>

                    {/* Dynamic Events Display */}
                    <Card shadow="sm" padding="sm" mt="md">
                        <Text fw={500}>Dynamic Events</Text>
                        <Textarea
                            value={dynamicEvents.join('\n')}
                            readOnly
                            minRows={5}
                            maxRows={10}
                        />
                    </Card>

                    {/* Direct Emit Test */}
                    <Card shadow="sm" padding="sm" mt="md">
                        <Text fw={500}>Direct Emit Test</Text>
                        <Group grow>
                            <TextInput
                                placeholder="Event Name"
                                value={directEventName}
                                onChange={(e) => setDirectEventName(e.currentTarget.value)}
                            />
                            <JsonInput
                                placeholder="Event Data (JSON)"
                                value={directEventData}
                                onChange={setDirectEventData}
                            />
                            <Button onClick={handleDirectEmit}>Emit Directly</Button>
                        </Group>
                    </Card>

                    {/* Class Emit Test */}
                    <Card shadow="sm" padding="sm" mt="md">
                        <Text fw={500}>Class Emit Test</Text>
                        <Group grow>
                            <TextInput
                                placeholder="Event Name"
                                value={classEventName}
                                onChange={(e) => setClassEventName(e.currentTarget.value)}
                            />
                            <JsonInput
                                placeholder="Event Data (JSON)"
                                value={classEventData}
                                onChange={setClassEventData}
                            />
                            <Button onClick={handleClassEmit}>Emit via Class</Button>
                        </Group>
                    </Card>

                    {/* Direct Listen Test */}
                    <Card shadow="sm" padding="sm" mt="md">
                        <Text fw={500}>Direct Listen Test</Text>
                        <Group grow>
                            <TextInput
                                placeholder="Event Name"
                                value={directListenerName}
                                onChange={(e) => setDirectListenerName(e.currentTarget.value)}
                            />
                            <Button onClick={handleDirectListen}>Listen Directly</Button>
                        </Group>
                        <Textarea
                            placeholder="Received Data"
                            value={directListenerData}
                            readOnly
                            minRows={3}
                            mt="sm"
                        />
                    </Card>

                    {/* Class Listen Test */}
                    <Card shadow="sm" padding="sm" mt="md">
                        <Text fw={500}>Class Listen Test</Text>
                        <Group grow>
                            <TextInput
                                placeholder="Event Name"
                                value={classListenerName}
                                onChange={(e) => setClassListenerName(e.currentTarget.value)}
                            />
                            <Button onClick={handleClassListen}>Listen via Class</Button>
                        </Group>
                        <Textarea
                            placeholder="Received Data"
                            value={classListenerData}
                            readOnly
                            minRows={3}
                            mt="sm"
                        />
                    </Card>


                    <Grid>
                        <Grid.Col span={5}>
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
                        <Grid.Col span={7}>
                            <JsonInput
                                label="Brokers"
                                value={JSON.stringify(brokers, null, 2)}
                                onChange={(value) => setBrokers(JSON.parse(value))}
                                mb="sm"
                                formatOnBlur
                                autosize
                                minRows={4}
                            />
                            <JsonInput
                                label="Model Overrides"
                                value={JSON.stringify(modelOverrides, null, 2)}
                                onChange={(value) => setModelOverrides(JSON.parse(value))}
                                mb="sm"
                                formatOnBlur
                                autosize
                                minRows={4}
                            />
                            <JsonInput
                                label="Processor Overrides"
                                value={JSON.stringify(processorOverrides, null, 2)}
                                onChange={(value) => setProcessorOverrides(JSON.parse(value))}
                                mb="sm"
                                formatOnBlur
                                autosize
                                minRows={4}
                            />
                            <JsonInput
                                label="Other Overrides"
                                value={JSON.stringify(otherOverrides, null, 2)}
                                onChange={(value) => setOtherOverrides(JSON.parse(value))}
                                mb="sm"
                                formatOnBlur
                                autosize
                                minRows={4}
                            />
                        </Grid.Col>
                    </Grid>
                    <Button
                        fullWidth
                        mt="md"
                        onClick={handleSubmit}
                        disabled={!areBrokersReady || !isAuthenticatedAndConnected()}
                        variant="outline"
                    >
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

export default FullSocketTester;
