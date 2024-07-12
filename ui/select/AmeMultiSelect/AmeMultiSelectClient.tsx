// components/AmeMultiSelect/AmeMultiSelectClient.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { MultiSelect } from '@mantine/core';
import { AmeMultiSelectProps, SelectOption } from './AmeMultiSelect';

const AmeMultiSelectClient: React.FC<AmeMultiSelectProps> = ({
                                                                 label,
                                                                 data,
                                                                 placeholder,
                                                                 withAsterisk,
                                                                 error,
                                                                 nothingFoundMessage,
                                                                 value,
                                                                 onChange,
                                                                 ...others
                                                             }) => {
    const [touched, setTouched] = useState(false);
    const [internalValue, setInternalValue] = useState<string[]>(value || []);

    useEffect(() => {
        setInternalValue(value || []);
    }, [value]);

    const handleBlur = () => {
        setTouched(true);
    };

    const handleOptionSubmit = (values: string[]) => {
        setInternalValue(values);
        if (onChange) {
            onChange(values);
        }
    };

    return (
        <MultiSelect
            label={label}
            placeholder={placeholder}
            value={internalValue}
            onChange={handleOptionSubmit}
            onBlur={handleBlur}
            data={data}
            searchable
            nothingFoundMessage={nothingFoundMessage}
            withAsterisk={withAsterisk}
            error={touched && internalValue.length === 0 ? error : undefined}
            radius="md"
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 400 } }}
            aria-label={placeholder}
            clearable
            maxValues={5}
            hidePickedOptions
            checkIconPosition="right"
            maxDropdownHeight={200}
            {...others}
        />
    );
};

export default AmeMultiSelectClient;
