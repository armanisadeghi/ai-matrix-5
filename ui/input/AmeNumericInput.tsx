import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@mantine/core';

interface AmeNumericInputProps {
    value?: number;
    onChange?: (value: number) => void;
    width?: string;
}

const AmeNumericInput: React.FC<AmeNumericInputProps> = ({ value = 0, onChange, width = 'auto' }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [displayValue, setDisplayValue] = useState<string>('');

    useEffect(() => {
        setDisplayValue(new Intl.NumberFormat().format(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = e.target.value.replace(/[^0-9]/g, '');
        const numericValue = parseInt(cleaned, 10);
        onChange?.(isNaN(numericValue) ? 0 : numericValue);
    };

    const handleFocus = () => {
        inputRef.current?.select();
    };

    return (
        <Input
            ref={inputRef}
            variant="filled"
            size="xs"
            radius="lg"
            placeholder="Input component"
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            style={{ width: width, minWidth: '100px' }}
        />
    );
};

export default AmeNumericInput;
