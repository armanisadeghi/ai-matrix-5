'use client';
import React, { useRef } from 'react';
import HorizontalSplitter, { HorizontalSplitterRef } from '@/ui/split/HorizontalSplitter';
import { Checkbox, Group } from '@mantine/core';
import AmeCheckbox from '@/ui/checkbox/AmeCheckbox';

const RunPage = () => {
    const splitterRef = useRef<HorizontalSplitterRef>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = e.target.value.length > 10 ? [10, 90] : [50, 50];
        splitterRef.current?.updateSizes(newSize);
    };

    return (
        <div>
            <input type="text" onChange={handleInputChange} placeholder="Type here..." />
            <HorizontalSplitter ref={splitterRef}>
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

            </HorizontalSplitter>
        </div>
    );
};

export default RunPage;
