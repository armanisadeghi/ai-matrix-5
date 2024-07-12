// app/components/AmeSelect/AmeSelect.tsx

import { SelectProps } from '@mantine/core';
import AmeSelectClient from './AmeSelectClient';


interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface AmeSelectProps extends SelectProps {
    label: string;
    data: SelectOption[] | string[];
    placeholder?: string;
    withAsterisk?: boolean;
    error?: string;
    nothingFoundMessage?: string;
}

const AmeSelect: React.FC<AmeSelectProps> = (
    {
        label,
        data,
        placeholder = '',
        withAsterisk = false,
        error = 'This field is required',
        nothingFoundMessage = 'No matches...',
        ...others
    }) => {
    const formattedData = data.map((item) => (typeof item === 'string' ? {value: item, label: item} : item));

    return (
        <AmeSelectClient
            label={label}
            placeholder={placeholder}
            data={formattedData}
            nothingFoundMessage={nothingFoundMessage}
            withAsterisk={withAsterisk}
            error={error}
            {...others}
        />
    );
};

export default AmeSelect;
