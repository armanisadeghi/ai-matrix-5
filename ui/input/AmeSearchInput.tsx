import React, { useState, useEffect, CSSProperties } from 'react'
import { rem, TextInput, TextInputProps } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

interface AmeSearchInputProps extends Partial<TextInputProps> {
    width?: number | string
    height?: number | string
    otherStyles?: CSSProperties
}

const AmeSearchInput: React.FC<AmeSearchInputProps> = ({
    width = 450,
    height = 30,
    value,
    onChange,
    otherStyles,
    ...others
}: AmeSearchInputProps) => {
    const [internalValue, setInternalValue] = useState<string>(value ? String(value) : '')
    const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />

    useEffect(() => {
        setInternalValue(value ? String(value) : '')
    }, [value])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setInternalValue(newValue)
        onChange?.(event)
    }

    return (
        <TextInput
            placeholder="search"
            radius="md"
            size="xs"
            leftSection={icon}
            value={internalValue}
            onChange={handleChange}
            aria-label={others.placeholder}
            style={{ width, height, ...otherStyles }}
            {...others}
        />
    )
}

export default AmeSearchInput
