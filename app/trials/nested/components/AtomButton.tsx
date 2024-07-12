'use client';

import { Button, Flex, Select, Space } from '@mantine/core';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { eventTriggerFamily, sharedEventAtom } from '@/app/trials/nested/state/atoms';
import { pageOptions } from '@/app/trials/nested/config/routeConfig';

const TriggerEventComponent = () => {
    const setEventTrigger = useSetRecoilState(sharedEventAtom);
    const [topLevel, setTopLevel] = useState<string | null>(null);
    const [nestedLevel, setNestedLevel] = useState<string | null>(null);

    const handleTopLevelChange = (value: string | null) => {
        setTopLevel(value);
        setNestedLevel(null);
    };

    const handleNestedLevelChange = (value: string | null) => {
        setNestedLevel(value);
    };

    const triggerEvent = () => {
        setEventTrigger('triggerNavigation');
    };

    const triggerSharedEvent = () => {
        if (topLevel && nestedLevel) {
            const setEventTrigger = useSetRecoilState(eventTriggerFamily(nestedLevel));
            //@ts-ignore
            setEventTrigger(topLevel);
        }
    };

    const topLevelOptions = Object.keys(pageOptions).map((key) => ({
        value: key, label: key,
    }));

    const nestedLevelOptions = topLevel
        ? pageOptions[topLevel as keyof typeof pageOptions].map((option) => ({
            value: option, label: option,
        })) : [];

    return (
        <Flex mih={50} gap="md" justify="flex-end" align="flex-start" direction="row" wrap="wrap">
            <Select
                placeholder="Select Navigation Level"
                data={topLevelOptions}
                value={topLevel}
                onChange={handleTopLevelChange}
                clearable
            />

            <Select
                placeholder="Select Nested Level"
                data={nestedLevelOptions}
                value={nestedLevel}
                onChange={handleNestedLevelChange}
                clearable
                disabled={!topLevel}
            />

            <Button
                onClick={triggerSharedEvent}
                disabled={!topLevel || !nestedLevel}
            >
                Trigger Selected Event
            </Button>
            <Space w="xl"/>

            <Button onClick={triggerEvent}>Trigger Event From Others</Button>
        </Flex>
    );
};

export default TriggerEventComponent;
