import { Group, Radio } from '@mantine/core'
import React from 'react'

interface BrokerRadioGroupProps {
    required?: boolean
    value?: string
    onChange?: any
    error?: string
    description?: string
    label?: string
    placeholder?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    color?: string
    defaultValue?: any
}

const BrokerRadioGroup = ({ required, value, onChange, error, description, label, placeholder, size = 'sm', color, defaultValue }: BrokerRadioGroupProps) => {
    return (
        <Radio.Group
            defaultValue={defaultValue}
            size={size}
            name={label}
            label={label}
            description={description}
            required={required}
            onChange={onChange}
        >
            <Group mt="xs">
                <Radio
                    size={size}
                    value="yes" label="Yes" />
                <Radio
                    size={size}
                    value="no" label="No" />
            </Group>
        </Radio.Group>
    )
}

export default BrokerRadioGroup