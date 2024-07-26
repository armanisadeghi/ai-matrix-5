'use client';

import { useBrokers } from '@/app/samples/socket-test/hooks/useBrokers';
import { brokersAtom } from '@/context/atoms';
import { requestEventOptions, requestTaskOptions } from '@/redux/features/dynamicEvents/types';
import { recipeData } from '@/redux/features/recipes/recipeData';
import { FlatRecipeData } from '@/redux/features/recipes/types';
import {
    activeRecipeIdAtom, brokerValueFamily, otherOverridesAtom, modelNameOverrideAtom, flatRecipeDataFamily, processorOverridesAtom, requestEventAtom, requestStreamAtom,
    socketRequestTaskAtom, taskDataAtom, textEntryAtom, runSimpleRecipeSocketTaskSelector, activeRecipeStreamAtom, activeRecipeResponseAtom, allRecipeBrokersSelector
} from '@/state/aiAtoms/recipeAtoms';
import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { useSocket } from '@/utils/socketio/useSocket';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilCallback, useRecoilValue } from 'recoil';
import { Box, Button, Switch, TextInput, Textarea, Title, JsonInput, Stack, Group, SimpleGrid, Space, Divider, Select, Card, } from '@mantine/core';


export interface SocketTaskObject {
    task: string;
    index: number;
    stream: boolean;
    taskData: {
        [key: string]: any;
    };
}

export type SocketTask = SocketTaskObject[];

export const RecipeTestComponent: React.FC = () => {
    const [recipeId, setRecipeId] = useRecoilState(activeRecipeIdAtom);
    const [requestEvent, setRequestEvent] = useRecoilState(requestEventAtom);
    const [requestTask, setRequestTask] = useRecoilState(socketRequestTaskAtom);
    const [requestStream, setRequestStream] = useRecoilState(requestStreamAtom);
    const setTaskData = useSetRecoilState(taskDataAtom);

    const [flatRecipeData, setFlatRecipeData] = useRecoilState(flatRecipeDataFamily(recipeId || ''));
    const [textEntryState, setTextEntryState] = useRecoilState(textEntryAtom)
    const [processorOverrides, setProcessorOverrides] = useRecoilState(processorOverridesAtom);
    const [otherOverrides, setOtherOverrides] = useRecoilState(otherOverridesAtom);
    const [modelNameOverride, setModelNameOverride] = useRecoilState(modelNameOverrideAtom);

    const [streamOutput, setStreamOutput] = useState('');
    const [dynamicEventName, setDynamicEventName] = useState('');

    const socketTask = useRecoilValue(runSimpleRecipeSocketTaskSelector(recipeId));
    const recipeBrokers = useRecoilValue(allRecipeBrokersSelector(recipeId));
    /*
     const [modelOverrides, setModelOverrides] = useRecoilState(modelOverridesAtom);
     */
    const [streamData, setStreamData] = useRecoilState(activeRecipeStreamAtom);
    const [responseData, setResponseData] = useRecoilState(activeRecipeResponseAtom);
    const [brokers, setBrokers] = useRecoilState(brokersAtom);

    const {
        loadRecipeBrokers,
        switchRecipe,
        getRecipeBrokers,
        updateBroker,
        updateBrokerValue,
        getBrokerValue,
        setAllBrokersReady,
        brokerValueFamily,
    } = useBrokers();

    const {
        socketManager,
        socket,
        socketSid,
        socketStatus,
        isAuthenticated,
        matrixId,
        socketNamespace,
        startTask,
        emitMessage,
        addDirectListener,
        removeDirectListener,
        isAuthenticatedAndConnected,
        addCatchallListener,
        removeCatchallListener,
        addRawPacketListener,
        removeRawPacketListener,
    } = useSocket();

    const handleBrokerValueChange = useRecoilCallback(({set}) => (brokerId: string, value: string) => {
        updateBrokerValue(brokerId, value);
        setFlatRecipeData((prev) => ({
            ...prev,
            broker_values: {
                ...prev.broker_values,
                [brokerId]: value
            },
        }));
    }, [updateBrokerValue]);

    const handleLoadRecipe = useRecoilCallback(({set}) => () => {
        const recipe = recipeData.find(r => r.id === recipeId);
        if (recipe) {
            const brokers = loadRecipeBrokers(recipeId);
            set(flatRecipeDataFamily(recipeId), (prev: FlatRecipeData) => ({
                ...prev,
                needed_brokers: recipe.input_brokers,
                broker_values: brokers.reduce((acc, broker) => ({...acc, [broker.id]: broker.value}), {}),
            }));
        } else {
            console.error('Recipe not found');
        }
    }, [recipeId, loadRecipeBrokers]);

    const handleSubmit = useCallback(() => {
        const task: SocketTask = [{
            task: requestTask,
            index: 0,
            stream: requestStream,
            taskData: {
                ...flatRecipeData,
                broker_values: Object.entries(flatRecipeData.broker_values).map(([name, value]) => ({name, value})),
            },
        }];

        console.log('handleSubmit Starting task:', requestEvent, task);
        startTask(requestEvent, task);
    }, [requestTask, requestStream, flatRecipeData, requestEvent, startTask]);

    // Handle incoming_stream_event
    useEffect(() => {
        const handleIncomingStreamEvent = (data: { event_name: string }) => {
            console.log('Received incoming_stream_event:', data);
            setDynamicEventName(data.event_name);
        };

        if (socket) {
            socket.on('incoming_stream_event', handleIncomingStreamEvent);
        }

        return () => {
            if (socket) {
                socket.off('incoming_stream_event', handleIncomingStreamEvent);
            }
        };
    }, [socket]);

    // Handle dynamic events
    useEffect(() => {
        if (dynamicEventName) {
            const handleDynamicEvent = (data: any) => {
                console.log(`Received data for ${dynamicEventName}:`, data);
                setStreamOutput(prev => prev + JSON.stringify(data) + '\n');
            };

            addDirectListener(dynamicEventName, handleDynamicEvent);

            return () => {
                removeDirectListener(dynamicEventName, handleDynamicEvent);
            };
        }
    }, [dynamicEventName, addDirectListener, removeDirectListener]);

    // Update taskData when flatRecipeData changes
    useEffect(() => {
        setTaskData(flatRecipeData);
    }, [flatRecipeData, setTaskData]);

    return (
        <Box style={{maxWidth: '1000px', margin: '0 auto'}}>
            <h3>Recipe Test Component</h3>
            <Stack gap="md">
                <Group>
                    <h4>Recipe ID:</h4>
                    <TextInput
                        value={recipeId || ''}
                        onChange={(e) => setRecipeId(e.target.value)}
                    />
                    <Button onClick={handleLoadRecipe}>Load Recipe</Button>
                    <Switch
                        label="Stream"
                        checked={requestStream}
                        onChange={(e) => setRequestStream(e.target.checked)}
                    />
                </Group>
                <Group>
                    <Select label="Request Event" data={requestEventOptions} value={requestEvent} onChange={setRequestEvent}/>
                    <Select label="Request Task" data={requestTaskOptions} value={requestTask} onChange={setRequestTask}/>
                </Group>
                <Divider my="sm" label="Dynamic Broker Display" labelPosition="center"/>
                <SimpleGrid cols={2}>
                    {recipeBrokers.map((broker) => (
                        <Textarea
                            key={broker.id}
                            label={broker.displayName}
                            value={broker.value || ''}
                            onChange={(e) => handleBrokerValueChange(broker.id, e.target.value)}
                        />
                    ))}
                </SimpleGrid>
                <Divider my="sm" label="Recipe Data" labelPosition="center"/>


                <SimpleGrid cols={2}>
                    <Card>
                        <TextInput
                            variant="unstyled"
                            label="Dynamic Event Name"
                            value={dynamicEventName}
                            readOnly
                        />
                    </Card>
                    <Card>

                        <Textarea
                            label="Model Override"
                            value={modelNameOverride}
                            onChange={(event) => setModelNameOverride(event.currentTarget.value)}
                        />
                    </Card>
                    <Card>
                        <AmeJsonInput
                            label="Processor Override"
                            value={processorOverrides}
                            onChange={setProcessorOverrides}
                            minRows={2}
                        />
                    </Card>
                    <Card>
                        <AmeJsonInput
                            label="Other Override"
                            value={otherOverrides}
                            onChange={setOtherOverrides}
                            minRows={2}
                        />
                    </Card>
                </SimpleGrid>
            </Stack>
            <Space h="md"/>
            <Button onClick={handleSubmit}>Submit</Button>
            <Box mt="md">
                <Title order={3}>Stream Output</Title>
                <Textarea value={streamOutput} readOnly minRows={5}/>
            </Box>
            <Space h="md"/>
            <SimpleGrid cols={2}>
                <Card>
                    <Title order={5}>Current Socket Task Object</Title>

                    <JsonInput
                        value={JSON.stringify(socketTask, null, 2)}
                        mb="sm"
                        formatOnBlur
                        autosize
                        minRows={4}
                        readOnly
                    />
                </Card>
                <Card>
                    <Title order={5}>Test State</Title>
                    <Textarea value={textEntryState} onChange={(e) => setTextEntryState(e.target.value)} minRows={7} autosize/>
                    <Space h="md"/>
                    <Textarea value={recipeBrokers} readOnly minRows={7} autosize/>
                </Card>
            </SimpleGrid>

        </Box>
    )
        ;
};

export default RecipeTestComponent;
