import React, { useState, useRef } from 'react';
import { Slider, Box, Text, Group, Input, Tooltip } from '@mantine/core';

export interface AmeSliderProps {
    name: string;
    tooltip?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (value: number) => void;
    customLabels?: string[];
    showNumber?: boolean;
    size?: 'sm' | 'xs';
    color?: 'blue' | 'gray' | 'red';
}

const AmeSlider: React.FC<AmeSliderProps> = (
    {
        name,
        tooltip = '',
        min = 0,
        max = 10,
        step = 1,
        customLabels,
        showNumber = true,
        size = 'sm',
        color = 'blue'
    }) => {
    const [value, setValue] = useState<number>((min + max) / 2);
    const [inputValue, setInputValue] = useState<string>(`${(min + max) / 2}`);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSliderChange = (sliderValue: number) => {
        setValue(sliderValue);
        setInputValue(sliderValue.toString());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = parseFloat(e.target.value.replace(/[^0-9.,]+/g, ''));
        setInputValue(e.target.value);

        if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
            setValue(numericValue);
        }
    };

    const handleInputFocus = () => {
        inputRef.current?.select();
    };

    const generateMarks = () => {
        const defaultLabels = [
            min.toString(),
            ((min + max) / 4).toString(),
            ((min + max) / 2).toString(),
            ((min + max) * 0.75).toString(),
            max.toString()
        ];

        const labels = customLabels || defaultLabels;

        return [
            { value: min, label: labels[0] !== '' ? labels[0] : undefined },
            { value: (min + max) / 4, label: labels[1] !== '' ? labels[1] : undefined },
            { value: (min + max) / 2, label: labels[2] !== '' ? labels[2] : undefined },
            { value: (min + max) * 0.75, label: labels[3] !== '' ? labels[3] : undefined },
            { value: max, label: labels[4] !== '' ? labels[4] : undefined }
        ].filter(mark => mark.label !== undefined);
    };

    return (
        <Tooltip label={tooltip} position="top" withArrow>
            <Box maw={400} mx="auto" style={{ marginBottom: 18 }}>
                <Group justify="space-between">
                    <Text size="sm">{name}</Text>
                    {showNumber && (
                        <Input
                            ref={inputRef}
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            variant="filled"
                            size="xs"
                            radius="lg"
                            style={{
                                textAlign: 'center',
                                width: 60
                            }}
                            tabIndex={-1}
                        />
                    )}
                </Group>
                <Slider
                    color={color}
                    radius="md"
                    value={value}
                    onChange={handleSliderChange}
                    min={min}
                    max={max}
                    step={step}
                    size={size}
                    marks={generateMarks()}
                    style={{ margin: 5 }}
                />
            </Box>
        </Tooltip>
    );
};

export default AmeSlider;
