import { Group, Radio } from '@mantine/core'
import React from 'react'

interface BrokerRadioGroupProps {
    required: boolean
    value: string
    onChange: any
    error: string
    description: string
    label: string
    placeholder: string
    size: string
    color: string
    data: any
    defaultValue?: any
}

const BrokerRadioGroup = ({ required, value, onChange, error, description, label, placeholder, size, color, data, defaultValue }: BrokerRadioGroupProps) => {
    return (
        <Radio.Group
            name={label}
            label={label}
            description={description}
            required={required}
            defaultValue={defaultValue}
            defaultChecked={defaultValue}
        >
            <Group mt="xs">
                <Radio
                    size={size}
                    value="yes" label="Yes" />
                <Radio
                    size={size}
                    value="np" label="No" />
            </Group>
        </Radio.Group>
    )
}

export default BrokerRadioGroup