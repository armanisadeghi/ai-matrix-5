import React from 'react';
import { Checkbox, FileInput, Group, JsonInput, Select, Switch, TextInput, Textarea, Tooltip, Image } from '@mantine/core';
import { Component } from '@/types/broker';
import { BrokerSlider } from "@/components/Brokers/BrokerSlider";
import BrokerRadioGroup from '@/components/Brokers/BrokerRadioGroup';
import NextImage from 'next/image';
import image from 'next/image';

interface BrokerComponentProps {
    currentComponent: Component;
    type?: string;
    handleDefaultValueChange: Function;
}

const BrokerComponent: React.FC<BrokerComponentProps> = ({ type, currentComponent, handleDefaultValueChange }) => {
    const { description, tooltip, withAsterisk, maxRows, resize, autosize, withArrow, position, maxLength, minRows, tableData, src, alt, radius, h, w, fit, options, groupOptions, label, placeholder, defaultValue, displayOrder, validation, dependencies, required, size, color, exampleInputs, group, min, max, step, value, onChange, marks } = currentComponent;

    if (type) {
        switch (type) {
            case "Input":
                return <Tooltip label={tooltip || "Input"} withArrow={withArrow} position={position}><TextInput
                    withAsterisk={withAsterisk}
                    error={validation}
                    label={label || "Text"}
                    description={description}
                    placeholder={placeholder}
                    size={size}
                    color={color}
                    defaultValue={defaultValue as string}
                    onChange={value => handleDefaultValueChange(value.target.value)} /></Tooltip>;
            case "Textarea":
                return <Tooltip label={tooltip || "Textarea"} withArrow={withArrow} position={position}><Textarea
                    withAsterisk={required}
                    error={validation}
                    label={label || "Text"}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    minRows={minRows}
                    description={description}
                    maxRows={maxRows}
                    resize={resize === true ? "both" : "none"}
                    autosize={autosize}
                    required={required}
                    size={size}
                    color={color}
                    defaultValue={defaultValue as string}
                    onChange={value => handleDefaultValueChange(value.target.value)} /></Tooltip>;
            case "Slider":
                return <Tooltip label={tooltip || "Slider"} withArrow={withArrow} position={position}><BrokerSlider
                    defaultValue={defaultValue as number}
                    label={label || "Slider"}
                    description={description}
                    min={min}
                    max={max}
                    steps={step}
                    size={size}
                    marks={marks}
                    color={color}
                    onChange={value => handleDefaultValueChange(value)} /></Tooltip>;
            case "YesNo":
                return <Tooltip label={tooltip || "Yes/No"} withArrow={withArrow} position={position}>
                    <BrokerRadioGroup
                        defaultValue={defaultValue as string}
                        onChange={(value: any) => handleDefaultValueChange(value)}
                        required={required}
                        value={value as string}
                        description={description}
                        label={label || "Yes/No"}
                        placeholder={placeholder}
                        size={size}
                        color={color} >
                    </BrokerRadioGroup>
                </Tooltip>
            case "Checkbox":
                return <Tooltip label={tooltip || "Checkbox"} withArrow={withArrow} position={position}>
                    <Checkbox
                        label={label || "Checkbox"}
                        description={description}
                        defaultValue={defaultValue as string}
                        size={size}
                        color={color}
                        onChange={value => handleDefaultValueChange(value.target.checked)} />
                </Tooltip>;
            case "CheckboxGroup":
                return <Tooltip label={tooltip || "Checkbox Group"} withArrow={withArrow} position={position}>
                    <Checkbox.Group
                        defaultValue={defaultValue as string[]}
                        label={label || "Checkbox Group"}
                        description={description}
                        required={required}
                        onChange={(value) => handleDefaultValueChange(value)}>
                        <Group p="xs">
                            {options && options.map(option => <Checkbox key={option} value={option} label={option} />)}
                        </Group>
                    </Checkbox.Group></Tooltip>
            case "Switch":
                return <Tooltip label={tooltip || "Switch"} withArrow={withArrow} position={position}>
                    <Switch
                        defaultValue={defaultValue as string}
                        label={label || "Switch"} value={value as string} required={required} size={size} color={color} />
                </Tooltip>;
            case "SwitchGroup":
                return <Tooltip label={tooltip || "Switch Group"} withArrow={withArrow} position={position}>
                    <Switch.Group
                        defaultValue={defaultValue as string[]}
                        label={label || "Switch Group"}
                        description={description}
                        required={required}
                        color={color}
                        size={size}
                        onChange={(value) => handleDefaultValueChange(value)}
                    >
                        <Group mt="xs">
                            {options && options.map(option => <Switch key={option} value={option} label={option} />)}
                        </Group>
                    </Switch.Group>
                </Tooltip>
            case "Select":
                return <Tooltip label={tooltip || "Select"} withArrow={withArrow} position={position}>
                    <Select
                        defaultValue={defaultValue as string}
                        label={label || "Select"} data={options} required={required} size={size} color={color} onChange={(value) => handleDefaultValueChange(value as string)} />
                </Tooltip>;
            case "Json":
                return <Tooltip label={tooltip || "Json"} withArrow={withArrow} position={position}>
                    <JsonInput
                        label={label || "Json"}
                        placeholder="Textarea will autosize to fit the content"
                        validationError="Invalid JSON"
                        formatOnBlur
                        autosize
                        resize={resize === "true" ? "both" : "none"}
                        minRows={minRows}
                        maxRows={maxRows}
                        required={required}
                        defaultValue={defaultValue as string}
                        onChange={(value) => handleDefaultValueChange(value)}
                    /></Tooltip>
            case "SelectWithOther":
                return <Tooltip label={tooltip || "Select"} withArrow={withArrow} position={position}>
                    <Select
                        label={label || "Select"}
                        data={options}
                        required={required}
                        size={size}
                        color={color}
                        defaultValue={defaultValue as string}
                        onChange={(value) => handleDefaultValueChange(value as string)}
                    />
                </Tooltip>
            case "AttachmentsVideo":
                return <Tooltip label={tooltip || "Upload Video"} withArrow={withArrow} position={position}>
                    <FileInput label={label} description={description} placeholder={placeholder} required={required} size={size} color={color} onChange={(value: File | null) => handleDefaultValueChange(value as File)} />

                </Tooltip>
            case "AttachmentsAudio":
                return <Tooltip label={tooltip || "Upload Audio"} withArrow={withArrow} position={position}>
                    <FileInput label={label} description={description} placeholder={placeholder} required={required} size={size} color={color} onChange={(value: File | null) => handleDefaultValueChange(value as File)} />

                </Tooltip>
            case "AttachmentsFile":
                return <Tooltip label={tooltip || "Upload File"} withArrow={withArrow} position={position}>
                    <FileInput
                        label={label}
                        description={description}
                        placeholder={placeholder}
                        required={required}
                        size={size}
                        color={color}
                        onChange={(value: File | null) => handleDefaultValueChange(value as File)}
                    /></Tooltip>
            case "AttachmentsURL":
                return <Tooltip label={tooltip || "Upload URL"} withArrow={withArrow} position={position}>
                    <TextInput label={label} placeholder={placeholder} required={required} size={size} color={color} onChange={(value) => handleDefaultValueChange(value)} />

                </Tooltip>
            case "Image":
                return <Tooltip label={tooltip || "Upload Image"} withArrow={withArrow} position={position}>
                    <Image
                        src={src}
                        alt={alt || "Upload Image"}
                        h={h}
                        w={w}
                        fit={fit}
                        radius={radius}
                        component={NextImage}
                    />
                </Tooltip>
            default:
                return null;
        }
    }

};

export default BrokerComponent;