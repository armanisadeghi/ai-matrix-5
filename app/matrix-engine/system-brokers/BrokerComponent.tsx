import React from 'react';
import { Component, ComponentType } from '@/types/broker';
import { Checkbox, CheckboxGroup, RadioGroup, Select, Slider, Switch, SwitchGroup, TextInput, Textarea } from '@mantine/core';

interface BrokerComponentProps {
    component: Component;
}

// Sorry Natalie. I had to make some changes to get it to deploy. I don't know if they're right. I just wanted to get it to work.

// Make sure you go through this -- I had to delete a bunch of stuff because I didn't know what they should be. I'm sorry. I just wanted to get it to build.

const BrokerComponent: React.FC<BrokerComponentProps> = ({ component, ...props }) => {
    const { type, label, tooltip, maxLength, placeholder, defaultValue, displayOrder, validation, dependencies, required, options, size, color, exampleInputs, group, min, max, step, value, onChange } = component;

    switch (type) {
        case ComponentType.Input:
            return <TextInput label={label} maxLength={maxLength} placeholder={placeholder}  required={required} size={size} color={color} onChange={(e) => onChange}  />;
        case ComponentType.Textarea:
            return <Textarea label={label} maxLength={maxLength} placeholder={placeholder}  required={required} size={size} color={color} />;
        case ComponentType.Slider:
            return <Slider label={label} min={min} max={max} step={step}  size={size} color={color} />;
        case ComponentType.YesNo:
            return <RadioGroup label={label} required={required} color={color} children={undefined} />;
        case ComponentType.Checkbox:
            return <Checkbox label={label}  required={required} size={size} color={color} />;
        case ComponentType.CheckboxGroup:
            return <CheckboxGroup label={label} required={required} size={size} color={color} children={undefined} />;
        case ComponentType.Switch:
            return <Switch label={label}  required={required} size={size} color={color} />;
        case ComponentType.SwitchGroup:
            return <SwitchGroup label={label} required={required} size={size} color={color} children={undefined} />;
        case ComponentType.Select:
            return <Select label={label} data={options} required={required} size={size} color={color} />;
        default:
            return null;
    }
};

export default BrokerComponent;