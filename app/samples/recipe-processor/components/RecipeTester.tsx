'use client';

import { useReduxSocket } from '@/utils/socketio/useReduxSocket';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Switch, TextInput, Textarea, Title, Stack, Group, SimpleGrid, Space, Divider, Select, Card, Tooltip } from '@mantine/core';
import { RootState, AppDispatch } from '@/redux/store';
import { updateRecipeOverrides } from '@/redux/features/recipes/recipeSlice';
import { initializeRecipe } from '@/redux/features/recipes/recipeThunks';
import { setRequestEvent, setRequestStream, setRequestTask } from '@/redux/features/dynamicEvents/dynamicEventsSlice';
import { updateBrokerInstance } from '@/redux/features/broker/brokerSlice';
import { submitTaskData } from '@/redux/features/dynamicEvents/dynamicEventsThunks';
import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { BrokerInstance } from '@/redux/features/broker/types';

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
    const recipeId = activeRecipeIds[0] || ''; // Use the first active recipe, or an empty string if none
    const recipe = useSelector((state: RootState) => state.recipes.recipeInstances[recipeId]);
    const brokerInstances = useSelector((state: RootState) => state.brokers.brokerInstances[recipeId] || {});
    const {
        requestEvent,
        requestTask,
        requestEventOptions,
        requestTaskOptions,
        requestStream,
        events: dynamicEvents,
    } = useSelector((state: RootState) => state.dynamicEvents);

    const [recipeIdInput, setRecipeIdInput] = useState('');

    const {
        socketStatus,
        isAuthenticated,
        socketSid,
        addDirectListener,
        removeDirectListener,
    } = useReduxSocket();

    const handleLoadRecipe = useCallback(() => {
        if (recipeIdInput) {
            dispatch(initializeRecipe(recipeIdInput));
        }
    }, [dispatch, recipeIdInput]);

    const handleBrokerChange = useCallback((brokerId: string, value: any, ready: boolean) => {
        dispatch(updateBrokerInstance({ recipeId, brokerId, updates: { value, ready } }));
    }, [dispatch, recipeId]);

    const handleSubmit = useCallback(() => {
        console.log('Submitting recipe data')
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
        console.log('Task data:', taskData)

        dispatch(submitTaskData({
            eventName: requestEvent,
            task: requestTask,
            taskData: taskData,
        }));
    }, [dispatch, recipeId, recipe, brokerInstances, requestEvent, requestTask]);

    useEffect(() => {
        const handleDynamicEvent = (eventName: string) => (data: any) => {
            console.log(`Recipe Tester - Received data for ${eventName}:`, data);
            // Update dynamic event data in Redux store
            // This will be handled by the dynamicEventsSlice reducer
        };

        // Set up listeners for all dynamic events
        Object.keys(dynamicEvents).forEach(eventName => {
            addDirectListener(eventName, handleDynamicEvent(eventName));
        });

        return () => {
            // Clean up listeners
            Object.keys(dynamicEvents).forEach(eventName => {
                removeDirectListener(eventName, handleDynamicEvent(eventName));
            });
        };
    }, [dynamicEvents, addDirectListener, removeDirectListener]);

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
                        onChange={(e) => dispatch(setRequestStream(e.currentTarget.checked))}
                    />
                </Group>
                <Group>
                    <Select
                        label="Request Event"
                        data={requestEventOptions}
                        value={requestEvent}
                        onChange={(value) => value && dispatch(setRequestEvent(value))}
                    />
                    <Select
                        label="Request Task"
                        data={requestTaskOptions}
                        value={requestTask}
                        onChange={(value) => value && dispatch(setRequestTask(value))}
                    />
                </Group>
                <Divider my="sm" label="Dynamic Broker Display" labelPosition="center"/>
                <SimpleGrid cols={2}>
                    {Object.values(brokerInstances).map((broker) => (
                        <BrokerInput
                            key={broker.id}
                            broker={broker}
                            onChange={handleBrokerChange}
                        />
                    ))}
                </SimpleGrid>
                <Divider my="sm" label="Dynamic Events" labelPosition="center"/>

                <SimpleGrid cols={2}>
                    {Object.entries(dynamicEvents).map(([eventName, event]) => (
                        <Card key={eventName}>
                            <Title order={6}>{eventName}</Title>
                            <Textarea
                                value={event.textStream}
                                readOnly
                                minRows={5}
                                autosize
                            />
                        </Card>
                    ))}
                </SimpleGrid>
`
                <Divider my="sm" label="Recipe Data" labelPosition="center"/>
                <SimpleGrid cols={2}>
                    <Card>
                        <Textarea
                            label="Model Override"
                            value={recipe?.overrides.model_override || ''}
            onChange={(event) => dispatch(updateRecipeOverrides({recipeId, overrides: {model_override: event.target.value}}))}
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
            <SimpleGrid cols={2}>
                {Object.entries(dynamicEvents).map(([eventName, event]) => (
                    <Card key={eventName}>
                        <Title order={5}>{eventName}</Title>
                        <Textarea
                            value={event.textStream}
                            readOnly
                            minRows={5}
                            autosize
                        />
                    </Card>
                ))}
            </SimpleGrid>
            <Space h="md"/>
            <Card>
                <Title order={5}>Current Recipe State</Title>
                <AmeJsonInput
                    value={recipe || {}}
                    readOnly
                    minRows={10}
                />
            </Card>
            <Card>
                <Title order={5}>Current Broker Instances</Title>
                <AmeJsonInput
                    value={brokerInstances}
                    readOnly
                    minRows={10}
                />
            </Card>
        </Box>
    );
};

export default RecipeTestingUI;
