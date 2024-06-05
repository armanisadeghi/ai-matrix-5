import React, { useState } from 'react';
import { Select } from '@mantine/core';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface AmeSelectProps {
    label: string;
    data: SelectOption[] | string[];
    placeholder?: string;
    withAsterisk?: boolean;
    error?: string;
    nothingFoundMessage?: string;
}

const AmeSelect: React.FC<AmeSelectProps> = ({
                                                 label,
                                                 data,
                                                 placeholder = '',
                                                 withAsterisk = false,
                                                 error = 'This field is required',
                                                 nothingFoundMessage = 'No matches...'
                                             }) => {
    const [touched, setTouched] = useState(false);
    const [value, setValue] = useState('');

    const formattedData = data.map(item =>
        typeof item === 'string' ? { value: item, label: item } : item
    );

    const handleBlur = () => {
        setTouched(true);
    };

    const handleOptionSubmit = (value: string) => {
        setValue(value);
        setTouched(true);
    };

    return (
        <Select
            label={label}
            placeholder={placeholder}
            value={value}
            onOptionSubmit={handleOptionSubmit}
            onBlur={handleBlur}
            data={formattedData}
            searchable
            nothingFoundMessage={nothingFoundMessage}
            withAsterisk={withAsterisk}
            error={touched && !value ? error : undefined}
            radius="md"
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 400 } }}
        />
    );
};

export default AmeSelect;
