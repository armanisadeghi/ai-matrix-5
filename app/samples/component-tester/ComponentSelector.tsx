import React from 'react';
import { Select, Divider, Stack } from '@mantine/core';
import { componentMap } from './componentConfig';

const componentOptions = Object.keys(componentMap).map((componentName) => ({
    label: componentName.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase()),
    value: componentName,
}));

interface ComponentSelectorProps {
    selectedComponent: string | null;
    onSelect: (value: string | null) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ selectedComponent, onSelect }) => {
    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="flex-start"
            gap="sm"
        >
            <Select
                data={componentOptions}
                value={selectedComponent}
                onChange={onSelect}
                placeholder="Select a component"
                maxDropdownHeight={400}
                searchable
            />
            <Divider my="xs" />
        </Stack>
    );
};

export default ComponentSelector;
