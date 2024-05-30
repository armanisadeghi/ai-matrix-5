import { Checkbox, Group, Paper, rem } from '@mantine/core';
import { useState } from 'react';

interface BrokerCheckBoxGroupProps {
    defaultValue?: string[];
    label?: string;
    description?: string;
    withAsterisk?: boolean;
    options: { value: string, label: string }[];
    required?: boolean;
}

export const BrokerCheckBoxGroup = ({
    defaultValue = ['red'],
    label = "Select your favorite colors",
    description = "This is anonymous",
    options,
    required
}: BrokerCheckBoxGroupProps) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (val: string[]) => {
        setValue(val);
    };

    return (
        <Checkbox.Group value={value} onChange={handleChange} required={required} label={label} description={description}>
            {options.map(option => <Checkbox mt="md" value={option.value} label={option.label} />)}
        </Checkbox.Group>
    );
}