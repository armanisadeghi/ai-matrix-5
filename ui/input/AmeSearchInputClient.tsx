// components/AmeSearchInput/AmeSearchInputClient.tsx

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MantineSize, rem, TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';


interface AmeSearchInputProps extends Partial<TextInputProps> {
    width?: number | string;
    height?: number | string;
    otherStyles?: React.CSSProperties;
}

const AmeSearchInputClient: React.FC<AmeSearchInputProps> = React.memo((
    {
        width = 450,
        height = 30,
        value,
        onChange,
        otherStyles,
        size = "xs",
        ...others
    }: AmeSearchInputProps) => {
    const [internalValue, setInternalValue] = useState<string>(value ? String(value) : '');

    const icon = useMemo(() => (
        <IconSearch style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
    ), []);

    useEffect(() => {
        setInternalValue(value ? String(value) : '');
    }, [value]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInternalValue(newValue);
        onChange?.(event);
    }, [onChange]);

    const style = useMemo(() => ({
        width,
        height,
        ...otherStyles
    }), [width, height, otherStyles]);

    return (
        <TextInput
            placeholder="search"
            radius="md"
            size={size}
            leftSection={icon}
            value={internalValue}
            onChange={handleChange}
            aria-label={others.placeholder}
            style={style}
            {...others}
        />
    );
});

export default AmeSearchInputClient;
