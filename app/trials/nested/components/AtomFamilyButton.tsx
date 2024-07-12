'use client';

import { Button, ComboboxItem, Flex, Select } from '@mantine/core';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { eventTriggerFamily } from '@/app/trials/nested/state/atoms';

const TriggerEventComponent = ({ id }: { id: string }) => {
    const setEventTrigger = useSetRecoilState(eventTriggerFamily(id));
    const [value, setValue] = useState<ComboboxItem | null>(null);

    const triggerEvent = () => {
        setEventTrigger('triggerNavigation');
    };

    return (
        <Flex
            mih={50}
            bg="rgba(0, 0, 0, .3)"
            gap="sm"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
        >
            <Select
                data={[{ value: 'react', label: 'React library' }]}
                value={value ? value.value : null}
                onChange={(_value, option) => setValue(option)}
            />

            <Button onClick={triggerEvent}>Trigger Navigation Event</Button>
        </Flex>
    );
};

export default TriggerEventComponent;
