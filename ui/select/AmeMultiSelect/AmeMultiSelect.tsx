// components/AmeMultiSelect/AmeMultiSelect.tsx

import React from 'react';
import { MultiSelectProps } from '@mantine/core';
import AmeMultiSelectClient from './AmeMultiSelectClient';


export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface AmeMultiSelectProps extends Omit<MultiSelectProps, 'data'> {
    label?: string;
    data: SelectOption[] | string[];
    placeholder?: string;
    withAsterisk?: boolean;
    error?: string;
    nothingFoundMessage?: string;
}

const AmeMultiSelect: React.FC<AmeMultiSelectProps> = (
    {
        label,
        data,
        placeholder = '',
        withAsterisk = false,
        error = 'This field is required',
        nothingFoundMessage = 'No matches...',
        value,
        onChange,
        ...others
    }) => {
    const formattedData = data.map((item) =>
        typeof item === 'string' ? {value: item, label: item} : item
    );

    return (
        <AmeMultiSelectClient
            label={label}
            data={formattedData}
            placeholder={placeholder}
            withAsterisk={withAsterisk}
            error={error}
            nothingFoundMessage={nothingFoundMessage}
            value={value}
            onChange={onChange}
            {...others}
        />
    );
};

export default AmeMultiSelect;
