import { TextInput } from '@mantine/core'

type BrokerTextInputProps = {
    label: string
    description: string
    placeholder: string
    required: boolean
    size: string
    value: string
    onChange: (value: any) => void
    error: string
    disabled: boolean
}

export const BrokerTextInput = ({
    label,
    description,
    placeholder,
    required,
    size,
    value,
    onChange,
    error,
    disabled
}: BrokerTextInputProps) => {
    return (
        <TextInput
            label={label}
            description={description}
            placeholder={placeholder}
            size={size}
            required={required}
            value={value}
            onChange={onChange}
            error={error}
            disabled={disabled}
        />
    )
}
