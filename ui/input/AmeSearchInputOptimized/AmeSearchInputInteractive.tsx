// components/AmeSearchInputOptimized/AmeSearchInputInteractive.tsx

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { rem, TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';


interface AmeSearchInputInteractiveProps extends Partial<TextInputProps> {
    width?: number | string;
    height?: number | string;
    otherStyles?: React.CSSProperties;
}

const AmeSearchInputInteractive: React.FC<AmeSearchInputInteractiveProps> = React.memo((
    {
        width = 450,
        height = 30,
        value,
        onChange,
        otherStyles,
        ...others
    }) => {
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
            size="xs"
            leftSection={icon}
            value={internalValue}
            onChange={handleChange}
            aria-label={others.placeholder}
            style={style}
            {...others}
        />
    );
});

export default AmeSearchInputInteractive;
