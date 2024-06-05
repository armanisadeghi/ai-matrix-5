import React, { useState, useRef } from 'react';
import { Slider, Box, Text, Group, Input } from '@mantine/core';

interface AmeSliderProps {
    name: string;
    tooltip?: string;
    min?: number;
    max?: number;
    step?: number;
}

const AmeSlider: React.FC<AmeSliderProps> = ({
                                                 name,
                                                 tooltip = '',
                                                 min = 0,
                                                 max = 10,
                                                 step = 1
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

    return (
        <Box maw={400} mx="auto" style={{ marginBottom: 18 }}>
            <Group justify="space-between">
                <Text size="sm" title={tooltip}>{name}</Text>
                <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    variant="filled"
                    size="xs"
                    radius="lg"
                    style={{ textAlign: 'center', width: 60 }}
                    tabIndex={-1}
                />
            </Group>
            <Slider
                color="blue"
                radius="md"
                value={value}
                onChange={handleSliderChange}
                min={min}
                max={max}
                step={step}
                marks={[
                    { value: min, label: min.toString() },
                    { value: (min + max) / 4, label: ((min + max) / 4).toString() },
                    { value: (min + max) / 2, label: ((min + max) / 2).toString() },
                    { value: (min + max) * .75, label: ((min + max) * .75).toString() },
                    { value: max, label: max.toString() }
                ]}
                style={{ margin: 5 }}
            />
        </Box>
    );
};

export default AmeSlider;
