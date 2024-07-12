'use client';

import { Button, Flex, Select } from '@mantine/core';
import { useEffect, useState } from 'react';


interface SelectOption {
    value: string;
    label: string;

    [key: string]: any; // Allow for nested options
}

interface AmeDependencySelectProps {
    data: SelectOption[];
    onTrigger: (selections: UniqueEvent) => void;
    direction?: 'horizontal' | 'vertical';
    showAll?: boolean;
    onChange?: (levelIndex: number, value: string | null) => void;
}

interface UniqueEvent {
    [key: number]: string | null;
}

const AmeDependencySelect: React.FC<AmeDependencySelectProps> = (
    {
        data,
        onTrigger,
        direction = 'vertical',
        showAll = false,
        onChange,
    }) => {
    const [selections, setSelections] = useState<UniqueEvent>({});
    const [nestedData, setNestedData] = useState<SelectOption[][]>([data]);

    const handleSelectChange = (levelIndex: number, value: string | null) => {
        const newSelections = {...selections, [levelIndex]: value};
        // Reset subsequent selections
        for (let i = levelIndex + 1; i < Object.keys(newSelections).length; i++) {
            newSelections[i] = null;
        }
        setSelections(newSelections);

        if (onChange) {
            onChange(levelIndex, value);
        }

        // Update the nested data for subsequent levels
        const newNestedData = nestedData.slice(0, levelIndex + 1);
        if (value && nestedData[levelIndex]) {
            const selectedOption = nestedData[levelIndex].find(option => option.value === value);
            if (selectedOption) {
                const nextLevelKey = Object.keys(selectedOption).find(key => Array.isArray(selectedOption[key]));
                if (nextLevelKey) {
                    newNestedData[levelIndex + 1] = selectedOption[nextLevelKey];
                }
            }
        }

        // Ensure we fill the remaining nested data based on the deepest level
        const maxDepth = getMaxDepth(data);
        if (showAll) {
            for (let i = newNestedData.length; i < maxDepth; i++) {
                newNestedData[i] = [];
            }
        }

        setNestedData(newNestedData);
    };

    const triggerEvent = () => {
        onTrigger(selections);
    };

    const flexDirection = direction === 'vertical' ? 'column' : 'row';

    useEffect(() => {
        const maxDepth = getMaxDepth(data);
        const newNestedData = showAll
            ? Array.from({length: maxDepth}, (_, index) => nestedData[index] || [])
            : [data];
        setNestedData(newNestedData);
    }, [data, showAll]);

    const getMaxDepth = (options: SelectOption[]): number => {
        const getDepth = (opts: SelectOption[]): number => {
            const firstOption = opts[0];
            if (!firstOption) return 1;
            const nestedKeys = Object.keys(firstOption).filter(key => Array.isArray(firstOption[key]));
            if (nestedKeys.length === 0) return 1;
            return 1 + Math.max(...nestedKeys.map(key => getDepth(firstOption[key])));
        };
        return getDepth(options);
    };

    return (
        <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction={flexDirection} wrap="wrap">
            {nestedData.map((options, levelIndex) => (
                <Select
                    key={levelIndex}
                    placeholder={`Select Level ${levelIndex + 1}`}
                    data={options.map(option => ({value: option.value, label: option.label}))}
                    value={selections[levelIndex] || ''}
                    onChange={(value) => handleSelectChange(levelIndex, value)}
                    clearable
                    disabled={levelIndex > 0 && !selections[levelIndex - 1]}
                />
            ))}
            <Button
                onClick={triggerEvent}
                disabled={Object.values(selections).some(value => value === null)}
            >
                Trigger Event
            </Button>
        </Flex>
    );
};

export default AmeDependencySelect;
