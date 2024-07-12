// ui/input/AmeActionTextInput.tsx
'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import useColorUtils from '@/utils/colorUtils';


interface AmeActionTextInputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
    initialValue?: string;
    editable?: boolean;
    variant?: 'default' | 'filled' | 'unstyled';
    highlightOnClick?: boolean;
    onChange?: (value: string) => void;
}

const AmeActionTextInput: React.FC<AmeActionTextInputProps> = React.memo((
    {
        initialValue = '',
        editable = true,
        highlightOnClick = true,
        onChange,
        ...others
    }) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const {getModerateTextColor} = useColorUtils();

    const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        if (highlightOnClick) {
            event.target.select();
        }
    }, [highlightOnClick]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange?.(newValue);
    }, [onChange]);

    const inputStyles = useMemo(() => ({
        input: {
            cursor: editable ? 'text' : 'pointer',
            color: getModerateTextColor(),
        },
    }), [getModerateTextColor, editable]);

    return (
        <TextInput
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            ref={inputRef}
            variant="default"
            size="sm"
            readOnly={!editable}
            placeholder="Enter text here..."
            styles={inputStyles}
            {...others}
        />
    );
});

AmeActionTextInput.displayName = 'AmeActionTextInput';

export default AmeActionTextInput;
