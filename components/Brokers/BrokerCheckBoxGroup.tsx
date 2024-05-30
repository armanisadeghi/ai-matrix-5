import { Checkbox, Group, Paper, rem } from '@mantine/core';
import { useState } from 'react';

interface ColorOption {
    value: string;
    label: string;
    color: string;
}

interface BrokerCheckBoxGroupProps {
    defaultValue?: string[];
    label?: string;
    description?: string;
    withAsterisk?: boolean;
    options: ColorOption[];
}

const colorOptions: ColorOption[] = [
    { value: 'red', label: 'Red', color: '#FF0000' },
    { value: 'green', label: 'Green', color: '#00FF00' },
    { value: 'blue', label: 'Blue', color: '#0000FF' },
];

export const BrokerCheckBoxGroup = ({
    defaultValue = ['red'],
    label = "Select your favorite colors",
    description = "This is anonymous",
    withAsterisk = true,
    options = colorOptions
}: BrokerCheckBoxGroupProps) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (val: string[]) => {
        setValue(val);
    };

    return (
        <Paper withBorder p="lg" mb="lg">
            <Group mb={rem(10)}>
                <div>
                    <strong>{label}</strong>
                </div>
                {withAsterisk && <span>*</span>}
            </Group>
            <Group mb={rem(10)}>
                <div>{description}</div>
            </Group>
            <Checkbox.Group value={value} onChange={handleChange}>
                <Group >
                    {options.map(option => (
                        <Checkbox
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            style={{
                                borderRadius: '4px',
                                padding: '4px',
                                marginRight: '8px',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <span style={{ color: option.color }}>{option.label}</span>
                        </Checkbox>
                    ))}
                </Group>
            </Checkbox.Group>
        </Paper>
    );
}