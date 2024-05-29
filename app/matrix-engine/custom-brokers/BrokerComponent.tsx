import React, { useEffect } from 'react';
import { Component, ComponentType } from '@/types/broker';
import { Checkbox, CheckboxGroup, Fieldset, Group, JsonInput, Radio, RadioGroup, Select, Slider, Space, Switch, SwitchGroup, TextInput, Textarea } from '@mantine/core';

interface BrokerComponentProps {
    component: Component;
    type?: string;
}

const BrokerComponent: React.FC<BrokerComponentProps> = ({ component }) => {
    const { type, label, tooltip, maxLength, placeholderText, defaultValue, displayOrder, validation, dependencies, required, options, size, color, exampleInputs, group, min, max, step, value, onChange, description } = component;

    if (type) {
        switch (type) {
            case "Input":
                return <TextInput
                    label={label}
                    description={description}
                    placeholder={placeholderText}
                    required={required}
                    size={size}
                />;
            case "Textarea":
                return <Textarea label={label} placeholder={placeholderText} required={required} size={size} color={color} />;
            case "Slider":
                return <Slider label={label} min={min} max={max} step={step} value={value} size={size} color={color} />;
            case "YesNo":
                return <Radio.Group
                    name={label}
                    label={label}
                    description={description}
                    required={required}
                >
                    <Group mt="xs">
                        <Radio value="yes" label="Yes" />
                        <Radio value="np" label="No" />
                    </Group>
                </Radio.Group>
            case "Checkbox":
                return <Checkbox label={label} value={value} required={required} size={size} color={color} />;
            case "CheckboxGroup":
                return <Checkbox.Group
                    defaultValue={['1']}
                    label="Select your answer"
                    description="This is anonymous"
                    withAsterisk
                >
                    <Group mt="xs">
                        <Checkbox value="1" label="1" />
                        <Checkbox value="2" label="2" />
                        <Checkbox value="3" label="3" />
                        <Checkbox value="4" label="4" />
                    </Group>
                </Checkbox.Group>;
            case "Switch":
                return <Switch label={label} value={value} required={required} size={size} color={color} />;
            case "Switchgroup":
                return <SwitchGroup label={label} required={required} size={size} color={color} children={undefined} />;
            case "Select":
                return <Select label={label} data={options} required={required} size={size} color={color} />;
            case "Json":
                return <JsonInput
                    label="Your package.json"
                    placeholder="Textarea will autosize to fit the content"
                    validationError="Invalid JSON"
                    formatOnBlur
                    autosize
                    minRows={4}
                    required={required}
                />
            default:
                return null;
        }
    }

};

export default BrokerComponent;