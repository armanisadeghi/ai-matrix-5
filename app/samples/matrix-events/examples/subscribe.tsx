import { eventSelectorFamily } from '@/utils/matrixEvents/atoms';
import useMatrixEvents from '@/utils/matrixEvents/useMatrixEvents';
import { Button, SimpleGrid, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const NavigationInput = ({ id, label, path, queryParams = {} }) => {
    const { registerEvent, triggerEvent, getAllEvents, eventIds } = useMatrixEvents();
    const [value, setValue] = useState('');
    const query = new URLSearchParams(queryParams).toString();
    const link = `${path}/${encodeURIComponent(value)}${query ? `?${query}` : ''}`;
    const subscribeEvent = (id: string) => useRecoilValue(eventSelectorFamily(id));
    const eventState = subscribeEvent(id);

    useEffect(() => {
        if (eventState.value === 'triggerNavigation') {
            window.location.href = link;
        }
    }, [eventState, link]);

    return (
        <SimpleGrid cols={2} type="container" spacing="lg">
            <div>
                <TextInput
                    placeholder={`Enter "${label} Page" name to navigate to that page!`}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                />
            </div>
            <div>
                <Button component="a" onClick={() => triggerEvent(id, 'triggerNavigation')}>
                    Go to any {label}
                </Button>
            </div>
        </SimpleGrid>
    );
};

export default NavigationInput;
