'use client';

import { useSetRecoilState } from 'recoil';
import { eventTriggerFamily } from '@/app/trials/nested/state/atoms';
import AmeDependencySelect from './AmeDependencySelect';
import { Flex, Space } from '@mantine/core';
import { testPageOptions } from './sampleData';

const TriggerEventComponent = () => {
    const setEventTrigger = useSetRecoilState(eventTriggerFamily('shared'));

    const handleTrigger = (selections: any) => {
        console.log('Triggered with selections:', selections);
        setEventTrigger(selections);
    };

    const handleChange = (levelIndex: number, value: string | null) => {
        console.log(`Level ${levelIndex} changed to ${value}`);
        // Additional logic can be added here
    };

    return (
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
        >
            <AmeDependencySelect
                data={testPageOptions.continents}
                onTrigger={handleTrigger}
                direction="vertical"
                showAll={true}
                onChange={handleChange}
            />
            <Space w="xl" />
        </Flex>
    );
};

export default TriggerEventComponent;
