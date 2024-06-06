import React, { useEffect } from 'react';
import { Checkbox, CheckboxGroup, Fieldset, FileInput, Group, JsonInput, Radio, RadioGroup, Select, Slider, Space, Switch, SwitchGroup, TextInput, Textarea, Image } from '@mantine/core';
import { BrokerCheckBoxGroup } from '@/components/Brokers/BrokerCheckBoxGroup';
import { BrokerImage } from '@/components/Brokers/BrokerImage';
import { useForm } from '@mantine/form';
import { Component } from '@/types/broker';
import { BrokerSlider } from "@/components/Brokers/BrokerSlider";
import { useBroker } from '@/context/brokerContext';

interface BrokerComponentProps {
    currentComponent: Component;
    type?: string;
    handleDefaultValueChange?: Function;
}

const BrokerComponent: React.FC<BrokerComponentProps> = ({ type, currentComponent, handleDefaultValueChange }) => {
    const { description, componentId, tableData, src, alt, radius, h, w, fit, options, groupOptions, label, placeholderText, defaultValue, displayOrder, validation, dependencies, required, size, color, exampleInputs, group, min, max, step, value, onChange, marks } = currentComponent;

    const currentData = useForm({
        mode: 'uncontrolled',
        initialValues: currentComponent
    });


    if (type) {
        switch (type) {
            case "Input":
                return <TextInput
                    label={label}
                    description={description}
                    placeholder={placeholderText}
                    required={required}
                    size={size}
                    color={color}
                    defaultValue={defaultValue as string}
                    key={currentData.key('label')}
                    onChange={value => handleDefaultValueChange ? handleDefaultValueChange(value.target.value) : currentData.setFieldValue('value', value.target.value)} />;
            case "Textarea":
                return <Textarea
                    label={label}
                    placeholder={placeholderText}
                    required={required}
                    size={size}
                    color={color}
                    defaultValue={defaultValue as string}
                    onChange={value => handleDefaultValueChange ? handleDefaultValueChange(value.target.value) : currentData.setFieldValue('value', value.target.value)} />;
            case "Slider":
                return <BrokerSlider
                    defaultValue={defaultValue as number}
                    label={label}
                    description={description}
                    min={min}
                    max={max}
                    steps={step}
                    size={size}
                    marks={marks}
                    color={color}
                    onChange={value => handleDefaultValueChange ? handleDefaultValueChange(value) : currentData.setFieldValue('value', value)} />;
            case "YesNo":
                return <Radio.Group
                    defaultValue={defaultValue as string}
                    name={label}
                    label={label}
                    description={description}
                    required={required}
                    onChange={value => handleDefaultValueChange ? handleDefaultValueChange(value) : currentData.setFieldValue('value', value)}
                >
                    <Group mt="xs">
                        <Radio value="yes" label="Yes" />
                        <Radio value="no" label="No" />
                    </Group>
                </Radio.Group>
            case "Checkbox":
                return <Checkbox
                    label={label}
                    defaultValue={defaultValue as string}
                    required={required}
                    size={size}
                    color={color}
                    onChange={value => handleDefaultValueChange ? handleDefaultValueChange(value.target.checked) : currentData.setFieldValue('value', value.target.checked)} />;
            case "CheckboxGroup":
                return <>{options && <BrokerCheckBoxGroup
                    defaultValue={defaultValue as string[]}
                    label={label}
                    options={options.map(option => ({ value: option, label: option }))}
                    required={required}
                    onChange={(value) => handleDefaultValueChange ? handleDefaultValueChange(value) : currentData.setFieldValue('value', value)}
                />}</>
            case "Switch":
                return <Switch
                    defaultValue={defaultValue as string}
                    label={label} value={value as string} required={required} size={size} color={color} />;
            case "SwitchGroup":
                return <SwitchGroup
                    label={label}
                    defaultValue={defaultValue as string[]}
                    required={required}
                    size={size}
                    color={color}
                    onChange={(value) => handleDefaultValueChange ? handleDefaultValueChange(value) : currentData.setFieldValue('value', value)}>
                    <Switch value="red" label="Red" mt={"md"} />
                    <Switch value="blue" label="Blue" mt={"md"} />
                    <Switch value="yellow" label="Yellow" mt={"md"} />
                </SwitchGroup>;
            case "Select":
                return <Select
                    defaultValue={defaultValue as string}
                    label={label} data={options} required={required} size={size} color={color} onChange={(value) => handleDefaultValueChange ? handleDefaultValueChange(value as string) : currentData.setFieldValue('value', value as string)} />;
            case "Json":
                return <JsonInput
                    label={label || "Json"}
                    placeholder="Textarea will autosize to fit the content"
                    validationError="Invalid JSON"
                    formatOnBlur
                    autosize
                    minRows={4}
                    required={required}
                    defaultValue={defaultValue as string}
                    onChange={(value) => handleDefaultValueChange ? handleDefaultValueChange(value) : currentData.setFieldValue('value', value)}
                />
            case "SelectWithOther":
                return <Select
                    label={label || "Select"}
                    data={options}
                    required={required}
                    size={size}
                    color={color}
                    defaultValue={defaultValue as string}
                    onChange={(value) => handleDefaultValueChange ? handleDefaultValueChange(value as string) : currentData.setFieldValue('value', value as string)}
                />
            case "AttachmentsVideo":
                return <div>Video</div>
            case "AttachmentsAudio":
                return <div>Audio</div>
            case "AttachmentsFile":
                return <FileInput
                    label={label}
                    description={description}
                    placeholder={placeholderText}
                    required={required}
                    size={size}
                    color={color}
                    onChange={(value: File | null) => handleDefaultValueChange ? handleDefaultValueChange(value as File) : currentData.setFieldValue('value', value as File)}
                />
            case "AttachmentsURL":
                return <div>URL</div>
            case "Image":
                return <BrokerImage
                    src={src}
                    alt={alt}
                    h={200}
                    w="auto"
                    fit="contain"
                    radius={radius}
                    onChange={(value: File | null) => handleDefaultValueChange ? handleDefaultValueChange(value as File) : currentData.setFieldValue('value', value as File)} />
            default:
                return null;
        }
    }

};

export default BrokerComponent;