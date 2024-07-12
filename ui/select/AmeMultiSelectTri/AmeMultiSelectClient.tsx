'use client';

import React, { useState, useEffect } from 'react';
import { MultiSelect, MultiSelectProps } from '@mantine/core';
import AmeMultiSelectServer, { AmeMultiSelectProps } from './AmeMultiSelectServer';

const AmeMultiSelectClient: React.FC<AmeMultiSelectProps> = (props) => {
    const { value, onChange } = props;
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
        <AmeMultiSelectServer
            {...props}
            value={internalValue}
            onChange={handleOptionSubmit}
            onBlur={handleBlur}
            error={touched && internalValue.length === 0 ? props.error : undefined}
        />
    );
};

export default AmeMultiSelectClient;
