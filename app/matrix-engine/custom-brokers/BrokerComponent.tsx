import React, { useEffect } from 'react';
import { Component, ComponentType } from '@/types/broker';
import { Checkbox, CheckboxGroup, Fieldset, FileInput, Group, JsonInput, Radio, RadioGroup, Select, Slider, Space, Switch, SwitchGroup, TextInput, Textarea, Image } from '@mantine/core';
import { BrokerCheckBoxGroup } from '@/components/Brokers/BrokerCheckBoxGroup';
import { BrokerImage } from '@/components/Brokers/BrokerImage';

interface BrokerComponentProps {
    component: Component;
    type?: string;
}

interface ColorOption {
    value: string;
    label: string;
    color: string;
}

const BrokerComponent: React.FC<BrokerComponentProps> = ({ component }) => {
    const { type, label, tooltip, maxLength, placeholderText, defaultValue, displayOrder, validation, dependencies, required, options, size, color, exampleInputs, group, min, max, step, value, onChange, description, src, alt, radius, h, w } = component;

    const customColorOptions: ColorOption[] = [
        { value: 'yellow', label: 'Yellow', color: '#FFFF00' },
        { value: 'purple', label: 'Purple', color: '#800080' },
    ];

    console.log(src)

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
                return <BrokerCheckBoxGroup
                    defaultValue={['red', 'blue']}
                    label="Select your favorite colors"
                    options={customColorOptions}
                />
            case "Switch":
                return <Switch label={label} value={value} required={required} size={size} color={color} />;
            case "Switchgroup":
                return <SwitchGroup label={label} required={required} size={size} color={color} children={undefined} />;
            case "Select":
                return <Select label={label} data={options} required={required} size={size} color={color} />;
            case "Json":
                return <JsonInput
                    label={label || "Json"}
                    placeholder="Textarea will autosize to fit the content"
                    validationError="Invalid JSON"
                    formatOnBlur
                    autosize
                    minRows={4}
                    required={required}
                />
            case "SelectWithOther":
                return <Select
                    label={label || "Select"}
                    data={options}
                    required={required}
                    size={size}
                    color={color}
                />
            case "AttachmentsImage":
                return <div>Image</div>
            case "AttachmentsVideo":
                return <div>Video</div>
            case "AttachmentsAudio":
                return <div>Audio</div>
            case "AttachmentsFile":
                return <FileInput
                    label={label}
                    description={description}
                    placeholder={placeholderText}
                />
            case "AttachmentsURL":
                return <div>URL</div>
            case "AttachmentsMore":
                return <div>More</div>
            case "Image":
                return <BrokerImage src={src} alt={alt} h={200} w="auto" fit="contain" radius={radius} />
            default:
                return null;
        }
    }

};

export default BrokerComponent;