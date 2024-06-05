// app/samples/json-sample/AmeJsonInput.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { JsonInput, JsonInputProps, Button, Space } from '@mantine/core';

interface AmeJsonInputProps extends Omit<JsonInputProps, 'size' | 'radius' | 'label' | 'placeholder' | 'value' | 'onChange' | 'error'> {
    enabled?: boolean;
    errorMessage?: string;
    label: string;
    value: string;
    onChange?: (value: string) => void;
    showButton?: boolean;
    validateJson?: boolean;
}

const AmeJsonInput: React.FC<AmeJsonInputProps> = ({
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
    const [inputValue, setInputValue] = useState<string>(value);
    const [error, setError] = useState<string | undefined>(errorMessage);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleJsonChange = (value: string) => {
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    const handleBlur = () => {
        if (validateJson) {
            try {
                JSON.parse(inputValue);
                setError(undefined);
            } catch {
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
                onChange={handleJsonChange}
                onBlur={handleBlur}
                {...props}
            />
            {showButton && (
                <>
                    <Space h="md" />
                    <Button onClick={() => setIsEnabled(!isEnabled)}>
                        {isEnabled ? 'Disable' : 'Enable'} Input
                    </Button>
                </>
            )}
        </div>
    );
};

export default AmeJsonInput;
