import { Checkbox, Group, Paper, rem } from '@mantine/core';
import { useState } from 'react';

interface BrokerCheckBoxGroupProps {
    defaultValue?: string[];
    label?: string;
    description?: string;
    withAsterisk?: boolean;
    options: { value: string, label: string }[];
    required?: boolean;
    onChange?: (value: string[]) => void;
}

export const BrokerCheckBoxGroup = ({
    label = "Select your favorite colors",
    description = "This is anonymous",
    options,
    required,
    onChange
}: BrokerCheckBoxGroupProps) => {

    return (
        <Checkbox.Group onChange={onChange} required={required} label={label} description={description}>
            {options.map(option => <Checkbox mt="md" key={option.value} value={option.value} label={option.label} />)}
        </Checkbox.Group>
    );
}