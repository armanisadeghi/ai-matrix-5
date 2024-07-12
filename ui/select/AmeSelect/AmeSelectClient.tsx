// app/components/AmeSelect/AmeSelectClient.tsx

'use client';

import React, { useState } from 'react';
import { Select, SelectProps } from '@mantine/core';


interface AmeSelectClientProps extends SelectProps {
    label: string;
    data: { value: string; label: string; disabled?: boolean }[];
    placeholder?: string;
    withAsterisk?: boolean;
    error?: string;
    nothingFoundMessage?: string;
}

const AmeSelectClient: React.FC<AmeSelectClientProps> = (
    {
        label,
        data,
        placeholder,
        withAsterisk,
        error,
        nothingFoundMessage,
        ...others
    }) => {
    const [touched, setTouched] = useState(false);
    const [value, setValue] = useState('');

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
            data={data}
            searchable
            nothingFoundMessage={nothingFoundMessage}
            withAsterisk={withAsterisk}
            error={touched && !value ? error : undefined}
            radius="md"
            comboboxProps={{transitionProps: {transition: 'pop', duration: 400}}}
            aria-label={placeholder}
            {...others}
        />
    );
};

export default AmeSelectClient;
