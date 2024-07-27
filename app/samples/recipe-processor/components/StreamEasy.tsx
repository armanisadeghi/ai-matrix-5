'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Switch, TextInput, Textarea, Title, Stack, Group, SimpleGrid, Space, Divider, Select, Card, Tooltip } from '@mantine/core';
import { RootState, AppDispatch } from '@/redux/store';
import { updateRecipeOverrides } from '@/redux/features/recipes/recipeSlice';
import { updateBrokerInstance } from '@/redux/features/broker/brokerSlice';
import { SocketManager } from '@/utils/socketio/SocketManager';
import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { BrokerInstance } from '@/redux/features/broker/types';
import { initializeRecipe } from '@/redux/features/recipes/recipeThunks';


const BrokerInput: React.FC<{
    broker: BrokerInstance;
    onChange: (id: string, value: any, ready: boolean) => void;
}> = ({ broker, onChange }) => {
    const handleChange = (value: any) => {
        onChange(broker.id, value, broker.ready);
    };

    const handleReadyChange = (ready: boolean) => {
        onChange(broker.id, broker.value, ready);
    };

    let input;
    switch (broker.componentType) {
        case 'Textarea':
            input = <Textarea value={broker.value} onChange={(e) => handleChange(e.target.value)} />;
            break;
        case 'SELECT':
            input = (
                <Select
                    data={broker.additionalParams?.select_options || []}
                    value={broker.value}
                    onChange={handleChange}
                />
            );
            break;
        // Add cases for other component types (radio, checkbox) here
        default:
            input = <TextInput value={broker.value} onChange={(e) => handleChange(e.target.value)} />;
    }

    return (
        <Tooltip label={broker.tooltip}>
            <Card>
                <Title order={6}>{broker.displayName}</Title>
                {input}
                <Switch
                    label="Ready"
                    checked={broker.ready}
                    onChange={(e) => handleReadyChange(e.currentTarget.checked)}
                />
            </Card>
        </Tooltip>
    );
};



export const RecipeTestingUI: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeRecipeIds = useSelector((state: RootState) => state.recipes.activeRecipeIds);
    const recipeId = activeRecipeIds[0] || '';
    const recipe = useSelector((state: RootState) => state.recipes.recipeInstances[recipeId]);
    const brokerInstances = useSelector((state: RootState) => state.brokers.brokerInstances[recipeId] || {});
    const { sessionUrl, socketNamespace } = useSelector((state: RootState) => state.config);
    const { matrixId } = useSelector((state: RootState) => state.user.currentUser);

    const [recipeIdInput, setRecipeIdInput] = useState('');
    const [requestEvent, setRequestEvent] = useState('simple_recipe');
    const [requestTask, setRequestTask] = useState('run_recipe');
    const [requestStream, setRequestStream] = useState(true);
    const [dynamicEvents, setDynamicEvents] = useState<Record<string, string>>({});

    const socketManager = SocketManager.getInstance(matrixId, sessionUrl, socketNamespace);
    const [loggedEvents, setLoggedEvents] = useState({});
    const loggedEventsRef = useRef({});

    useEffect(() => {
        const handleIncomingStreamEvent = (data: { event_name: string }) => {
            console.log('Stream Easy - Received incoming stream event:', data.event_name);
            setDynamicEvents(prev => ({ ...prev, [data.event_name]: '' }));

            socketManager.addDirectListener(data.event_name, (eventData: any) => {
                if (eventData.data === 'STREAM_END') {
                    return;
                }

                if (!loggedEventsRef.current[data.event_name]) {
                    console.log(`Stream Easy - Received data for ${data.event_name}:`, eventData);
                    loggedEventsRef.current[data.event_name] = true;
                    setLoggedEvents({ ...loggedEventsRef.current });
                }

                setDynamicEvents(prev => ({
                    ...prev,
                    [data.event_name]: prev[data.event_name] + (eventData.data || '')
                }));
            });
        };

        socketManager.addDirectListener('incoming_stream_event', handleIncomingStreamEvent);

        return () => {
            socketManager.removeDirectListener('incoming_stream_event', handleIncomingStreamEvent);
        };
    }, [socketManager]);



    const handleLoadRecipe = useCallback(() => {
        if (recipeIdInput) {
            dispatch(initializeRecipe(recipeIdInput));
        }
    }, [dispatch, recipeIdInput]);

    const handleBrokerChange = useCallback((brokerId: string, value: any, ready: boolean) => {
        dispatch(updateBrokerInstance({ recipeId, brokerId, updates: { value, ready } }));
    }, [dispatch, recipeId]);

    const handleSubmit = useCallback(() => {
        if (!recipe) return;

        const taskData = {
            recipe_id: recipeId,
            broker_values: Object.values(brokerInstances).map(({ id, displayName, officialName, dataType, value, ready }) => ({
                id,
                name: displayName,
                official_name: officialName,
                data_type: dataType,
                value,
                ready,
            })),
            overrides: recipe.overrides,
        };

        const task = {
            task: requestTask,
            index: 0,
            stream: requestStream,
            taskData,
        };

        console.log('Submitting task:', task);
        socketManager.startTask(requestEvent, [task]);
    }, [recipe, recipeId, brokerInstances, requestEvent, requestTask, requestStream, socketManager]);

    return (
        <Box style={{maxWidth: '1000px', margin: '0 auto'}}>
            <Title order={3}>Recipe Testing UI</Title>
            <Stack gap="md">
                <Group>
                    <TextInput
                        label="Recipe ID"
                        value={recipeIdInput}
                        onChange={(e) => setRecipeIdInput(e.target.value)}
                    />
                    <Button onClick={handleLoadRecipe}>Load Recipe</Button>
                    <Switch
                        label="Stream"
                        checked={requestStream}
                        onChange={(e) => setRequestStream(e.currentTarget.checked)}
                    />
                </Group>
                <Group>
                    <Select
                        label="Request Event"
                        data={['simple_recipe', 'full_recipe']} // Add more options as needed
                        value={requestEvent}
                        onChange={(value) => value && setRequestEvent(value)}
                    />
                    <Select
                        label="Request Task"
                        data={['run_recipe', 'validate_recipe']} // Add more options as needed
                        value={requestTask}
                        onChange={(value) => value && setRequestTask(value)}
                    />
                </Group>
                <Divider my="sm" label="Dynamic Broker Display" labelPosition="center"/>
                <SimpleGrid cols={2}>
                    {Object.values(brokerInstances).map((broker) => (
                        <Card key={broker.id}>
                            <Title order={6}>{broker.displayName}</Title>
                            <Textarea
                                value={broker.value || ''}
                                onChange={(e) => handleBrokerChange(broker.id, e.currentTarget.value, broker.ready)}
                            />
                            <Switch
                                label="Ready"
                                checked={broker.ready}
                                onChange={(e) => handleBrokerChange(broker.id, broker.value, e.currentTarget.checked)}
                            />
                        </Card>
                    ))}
                </SimpleGrid>
                <Divider my="sm" label="Recipe Data" labelPosition="center"/>
                <SimpleGrid cols={2}>
                    <Card>
                        <Textarea
                            label="Model Override"
                            value={recipe?.overrides.model_override || ''}
                            onChange={(e) => dispatch(updateRecipeOverrides({
                                recipeId,
                                overrides: {model_override: e.target.value}
                            }))}
                            minRows={2}
                        />
                    </Card>
                    <Card>
                        <AmeJsonInput
                            label="Processor Override"
                            value={recipe?.overrides.processor_overrides || {}}
                            onChange={(value) => dispatch(updateRecipeOverrides({recipeId, overrides: {processor_overrides: value}}))}
                            minRows={2}
                        />
                    </Card>
                    <Card>
                        <AmeJsonInput
                            label="Other Override"
                            value={recipe?.overrides.other_overrides || {}}
                            onChange={(value) => dispatch(updateRecipeOverrides({recipeId, overrides: {other_overrides: value}}))}
                            minRows={2}
                        />
                    </Card>
                </SimpleGrid>
            </Stack>
            <Space h="md"/>
            <Button onClick={handleSubmit}>Submit Recipe</Button>
            <Space h="md"/>
            <Divider my="sm" label="Dynamic Events" labelPosition="center"/>
            <SimpleGrid cols={2}>
                {Object.entries(dynamicEvents).map(([eventName, textStream]) => (
                    <Card key={eventName}>
                        <Title order={6}>{eventName}</Title>
                        <Textarea
                            value={textStream}
                            readOnly
                            minRows={5}
                            autosize
                        />
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default RecipeTestingUI;
