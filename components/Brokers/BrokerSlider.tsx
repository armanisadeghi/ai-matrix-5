import { Box, Flex, Group, Slider, Stack, Text } from '@mantine/core';
import { useState } from 'react';

type BrokerSizeSliderProps = {
    onChange: (size: number) => void,
    label?: string,
    description?: string,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    steps?: number,
    marks?: { value: number; label: string }[],
    min?: number,
    max?: number,
    color?: string,
    defaultValue?: number,
};

export const BrokerSlider = ({ defaultValue, color, description, onChange, label, size, marks, min = 1, max = 10, steps = 1, ...props }: BrokerSizeSliderProps) => {
    const [value, setValue] = useState(defaultValue);

    return (
        <Box w="100%" mx="auto">
            <Text size="sm">{description}</Text>
            <Flex justify="space-between" mt={10} w="100%" gap={10}>
                <Text size="xs">{min}</Text>
                <Slider
                    w={"100%"}
                    min={min}
                    max={max}
                    size={size}
                    step={steps}
                    showLabelOnHover
                    value={value}
                    label={value => `${value}`}
                    marks={marks}
                    color={color}
                    onChange={(value) => { setValue(value); onChange(value) }}
                    defaultValue={defaultValue}
                    {...props}
                />
                <Text size="xs">{max}</Text>
            </Flex>
        </Box>
    );
};