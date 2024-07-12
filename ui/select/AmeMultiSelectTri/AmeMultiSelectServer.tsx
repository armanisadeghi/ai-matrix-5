import React from 'react';
import { MultiSelect, MultiSelectProps } from '@mantine/core';

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
    value?: string[];
    onChange?: (values: string[]) => void;
}

const AmeMultiSelectServer: React.FC<AmeMultiSelectProps> = (
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

    const formattedData = data.map((item) => (typeof item === 'string' ? { value: item, label: item } : item));

    return (
        <MultiSelect
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            data={formattedData}
            searchable
            nothingFoundMessage={nothingFoundMessage}
            withAsterisk={withAsterisk}
            error={undefined}
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

export default AmeMultiSelectServer;
