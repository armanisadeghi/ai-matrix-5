// ui/json/AmeJsonInput.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { JsonInput, JsonInputProps, Button, Space } from '@mantine/core';

interface AmeJsonInputProps extends Omit<JsonInputProps, 'size' | 'radius' | 'label' | 'placeholder' | 'value' | 'onChange' | 'error'> {
    enabled?: boolean;
    errorMessage?: string;
    label?: string;
    value: Record<string, any>;
    onChange?: (value: Record<string, any>) => void;
    showButton?: boolean;
    validateJson?: boolean;
}

const AmeJsonInput: React.FC<AmeJsonInputProps> = (
    {
        enabled = true,
        errorMessage,
        label,
        value,
        onChange,
        showButton = false,
        validateJson = true,
        ...props
    }) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(enabled);
    const [inputValue, setInputValue] = useState<string>(JSON.stringify(value, null, 2));
    const [error, setError] = useState<string | undefined>(errorMessage);

    useEffect(() => {
        setInputValue(JSON.stringify(value, null, 2));
    }, [value]);

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
        setError(undefined); // Clear error on new input
    };

    const handleBlur = () => {
        if (validateJson) {
            try {
                const parsedValue = JSON.parse(inputValue);
                if (onChange) {
                    onChange(parsedValue);
                }
                setError(undefined);
            } catch (e) {
                setError('Invalid JSON');
            }
        }
    };

    return (
        <div>
            <JsonInput
                label={label}
                placeholder="Input JSON here"
                size="sm"
                radius="sm"
                minRows={6}
                formatOnBlur
                autosize
                disabled={!isEnabled}
                error={error}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                {...props}
            />
            {showButton && (
                <>
                    <Space h="md"/>
                    <Button onClick={() => setIsEnabled(!isEnabled)}>
                        {isEnabled ? 'Disable' : 'Enable'} Input
                    </Button>
                </>
            )}
        </div>
    );
};

export default AmeJsonInput;
