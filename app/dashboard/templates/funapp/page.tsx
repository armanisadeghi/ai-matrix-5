'use client';
import React, { useRef } from 'react';
import VerticalSplitter from '@/ui/split/VerticalSplitter';
import { Checkbox, Group } from '@mantine/core';
import AmeCheckbox from '@/ui/checkbox/AmeCheckbox';

const RunPage = () => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = e.target.value.length > 10 ? [10, 90] : [50, 50];
    };

    return (
        <div>
            <VerticalSplitter>
                <div>
                    <p>This is section 1.</p>
                    <Checkbox.Group
                        defaultValue={['aimatrix']}
                        label="Select your favorite Artificial Intelligence Frameworks"
                        description="Choose one or more of the following options:"
                        withAsterisk
                    >
                        <Group mt="xs">
                            <AmeCheckbox value="aimatrix" label="AI Matrix"/>
                            <AmeCheckbox value="autogen" label="Microsoft Autogen"/>
                        </Group>
                    </Checkbox.Group>
                </div>
                <div>
                    <p>This is section 2.</p>
                    <Checkbox.Group
                        defaultValue={['aimatrix']}
                        label="Select your favorite Artificial Intelligence Frameworks"
                        description="Choose one or more of the following options:"
                    >
                        <Group mt="xs">
                            <AmeCheckbox value="aimatrix" label="AI Matrix"/>
                            <AmeCheckbox value="autogen" label="Microsoft Autogen"/>
                        </Group>
                    </Checkbox.Group>
                </div>
                <div>
                    <p>HI Natalie</p>
                    <Checkbox.Group
                        defaultValue={['aimatrix']}
                        label="Select your favorite Artificial Intelligence Frameworks"
                        description="Choose one or more of the following options:"
                    >
                        <Group mt="xs">
                            <AmeCheckbox value="aimatrix" label="AI Matrix"/>
                            <AmeCheckbox value="autogen" label="Microsoft Autogen"/>
                        </Group>
                    </Checkbox.Group>
                </div>
                <div>
                    <p>This is section 3.</p>
                    <Checkbox.Group
                        defaultValue={['aimatrix']}
                        label="Select your favorite Artificial Intelligence Frameworks"
                        description="Choose one or more of the following options:"
                    >
                        <Group mt="xs">
                            <AmeCheckbox value="aimatrix" label="AI Matrix"/>
                            <AmeCheckbox value="autogen" label="Microsoft Autogen"/>
                        </Group>
                    </Checkbox.Group>
                </div>

            </VerticalSplitter>
        </div>
    );
};

export default RunPage;
