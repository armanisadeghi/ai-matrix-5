import React, { useEffect, useState } from 'react';
import { Checkbox, FileInput, Group, JsonInput, Select, Switch, TextInput, Textarea, Tooltip, Image, NumberInput, Space } from '@mantine/core';
import { Component, Broker } from '@/types/broker';
import { BrokerSlider } from "@/components/Brokers/BrokerSlider";
import BrokerRadioGroup from '@/components/Brokers/BrokerRadioGroup';
import NextImage from 'next/image';
import image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { componentAtom, componentSelector, selectedBroker } from '@/context/atoms/brokerAtoms';

interface BrokerComponentProps {
    id: string;
    type?: string;
    handleDefaultValueChange: Function;
}

const BrokerComponent: React.FC<BrokerComponentProps> = ({ type, id, handleDefaultValueChange }) => {
    const currentBroker = useRecoilValue(selectedBroker);
    const currentComponent = useRecoilValue(componentSelector(id)) || {}
    const { displayName } = currentBroker as Broker || currentComponent || "test";
    const { tooltip, description } = currentComponent as Component || currentBroker as Broker || "test";
    const { withAsterisk, maxRows, resize, autosize, withArrow, position, maxLength, minRows, tableData, src, alt, radius, h, w, fit, options, groupOptions, label, placeholder, defaultValue, displayOrder, validation, dependencies, required, size, color, exampleInputs, group, min, max, step, value, onChange, marks } = currentComponent as Component
    const [otherCheck, setOtherCheck] = useState(false)
    const [otherSwitch, setOtherSwitch] = useState(false)
    const [otherSelect, setOtherSelect] = useState(false)

    if (type) {
        switch (type) {
            case "Input":
                return <Tooltip label={tooltip || "Input"} withArrow={withArrow} position={position}><TextInput
                    withAsterisk={withAsterisk || required}
                    error={validation}
                    label={label || displayName || "Text"}
                    description={description}
                    placeholder={placeholder}
                    size={size}
                    color={color}
                    defaultValue={defaultValue as string}
                    onChange={value => handleDefaultValueChange(value.target.value)} /></Tooltip>;
            case "NumberInput":
                return <Tooltip label={tooltip || "Number Input"} withArrow={withArrow} position={position}>
                    <NumberInput
                        withAsterisk={withAsterisk || required}
                        error={validation}
                        label={label || displayName || "Number"}
                        description={description}
                        placeholder={placeholder}
                        size={size}
                        color={color}
                        defaultValue={defaultValue as number}
                        onChange={value => handleDefaultValueChange(value)}
                    />
                </Tooltip>;
            case "Textarea":
                return <Tooltip label={tooltip || "Textarea"} withArrow={withArrow} position={position}><Textarea
                    withAsterisk={required || withAsterisk}
                    error={validation}
                    label={label || displayName || "Text"}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    minRows={minRows}
                    description={description}
                    maxRows={maxRows}
                    resize={resize === true ? "both" : "none"}
                    autosize={autosize}
                    required={required || withAsterisk}
                    size={size}
                    color={color}
                    defaultValue={defaultValue as string}
                    onChange={value => handleDefaultValueChange(value.target.value)} /></Tooltip>;
            case "Slider":
                return <Tooltip label={tooltip || "Slider"} withArrow={withArrow} position={position}><BrokerSlider
                    defaultValue={defaultValue as number}
                    label={label || displayName || "Slider"}
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
                        label={label || displayName || "Yes/No"}
                        placeholder={placeholder}
                        size={size}
                        color={color} >
                    </BrokerRadioGroup>
                </Tooltip>
            case "Checkbox":
                return <Tooltip label={tooltip || "Checkbox"} withArrow={withArrow} position={position}>
                    <Checkbox
                        label={label || displayName || "Checkbox"}
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
                        label={label || displayName || "Checkbox Group"}
                        description={description}
                        required={required || withAsterisk}
                        onChange={(value) => handleDefaultValueChange(value)}>
                        <Group p="xs">
                            {options && options.map(option => <Checkbox key={option} value={option} label={option} />)}
                        </Group>
                    </Checkbox.Group></Tooltip>
            case "CheckboxGroupWithOther":
                return <><Tooltip label={tooltip || "Checkbox Group With Other Option"} withArrow={withArrow} position={position}>
                    <Checkbox.Group
                        defaultValue={defaultValue as string[]}
                        label={label || displayName || "Checkbox Group With Other Option"}
                        description={description}
                        required={required || withAsterisk}
                        onChange={(value) => handleDefaultValueChange(value)}>
                        <Group p="xs">
                            {options && options.map(option => <Checkbox key={option} value={option} label={option} />)}
                            <Checkbox key="Other" value="Other" label="Other" checked={otherCheck} onChange={() => setOtherCheck(!otherCheck)} />
                        </Group>
                    </Checkbox.Group></Tooltip>
                    {otherCheck && <TextInput onChange={(value) => handleDefaultValueChange(value.target.value)} />}</>
            case "Switch":
                return <Tooltip label={tooltip || "Switch"} withArrow={withArrow} position={position}>
                    <Switch
                        defaultValue={defaultValue as string}
                        label={label || displayName || "Switch"}
                        value={value as string}
                        required={required || withAsterisk}
                        size={size}
                        color={color} />
                </Tooltip>;
            case "SwitchGroup":
                return <Tooltip label={tooltip || "Switch Group"} withArrow={withArrow} position={position}>
                    <Switch.Group
                        defaultValue={defaultValue as string[]}
                        label={label || displayName || "Switch Group"}
                        description={description}
                        required={required || withAsterisk}
                        color={color}
                        size={size}
                        onChange={(value) => handleDefaultValueChange(value)}
                    >
                        <Group mt="xs">
                            {options && options.map(option => <Switch key={option} value={option} label={option} />)}
                        </Group>
                    </Switch.Group>
                </Tooltip>
            case "SwitchGroupWithOther":
                return <><Tooltip label={tooltip || "Switch Group With Other Option"} withArrow={withArrow} position={position}>
                    <Switch.Group
                        defaultValue={defaultValue as string[]}
                        label={label || displayName || "Switch Group With Other Option"}
                        description={description}
                        required={required || withAsterisk}
                        color={color}
                        size={size}
                        onChange={(value) => handleDefaultValueChange(value)}
                    >
                        <Group mt="xs">
                            {options && options.map(option => <Switch key={option} value={option} label={option} />)}
                            <Switch key="Other" value="Other" label="Other" checked={otherSwitch} onChange={() => setOtherSwitch(!otherSwitch)} />
                        </Group>
                    </Switch.Group>
                </Tooltip>
                    {otherSwitch && <TextInput onChange={(value) => handleDefaultValueChange(value.target.value)} />}</>
            case "Select":
                return <Tooltip label={tooltip || "Select"} withArrow={withArrow} position={position}>
                    <Select
                        label={label || displayName || "Select"}
                        data={options}
                        required={required || withAsterisk}
                        size={size}
                        color={color}
                        defaultValue={defaultValue as string}
                        onChange={(value) => handleDefaultValueChange(value as string)}
                    />
                </Tooltip>
            case "SelectWithOther":
                return <><Tooltip label={tooltip || "Select With Other Option"} withArrow={withArrow} position={position}>
                    <Select
                        defaultValue={(options || [])[0] || ""}
                        label={label || displayName || "Select With Other Option"}
                        data={[...(options || []), { value: "Other", label: "Other" }]}
                        required={required || withAsterisk}
                        size={size}
                        color={color}
                        onChange={(value) => {
                            if (value === "Other") {
                                setOtherSelect(true);
                            } else {
                                setOtherSelect(false);
                                handleDefaultValueChange(value as string);
                            }
                        }} />
                </Tooltip>
                    <Space h="md" />
                    {otherSelect && <TextInput onChange={(value) => handleDefaultValueChange(value.target.value)} />}
                </>
            case "Json":
                return <Tooltip label={tooltip || "Json"} withArrow={withArrow} position={position}>
                    <JsonInput
                        label={label || displayName || "Json"}
                        placeholder="Textarea will autosize to fit the content"
                        validationError="Invalid JSON"
                        formatOnBlur
                        autosize
                        resize={resize === "true" ? "both" : "none"}
                        minRows={minRows}
                        maxRows={maxRows}
                        required={required || withAsterisk}
                        defaultValue={defaultValue as string}
                        onChange={(value) => handleDefaultValueChange(value)} />
                </Tooltip>
            case "AttachmentsVideo":
                return <Tooltip label={tooltip || "Upload Video"} withArrow={withArrow} position={position}>
                    <FileInput label={label || displayName || "Upload Video"}
                        description={description}
                        placeholder={placeholder}
                        required={required || withAsterisk}
                        size={size}
                        color={color}
                        onChange={(value: File | null) => handleDefaultValueChange(value as File)} />
                </Tooltip>
            case "AttachmentsAudio":
                return <Tooltip label={tooltip || "Upload Audio"} withArrow={withArrow} position={position}>
                    <FileInput
                        label={label || displayName || "Upload Audio"}
                        description={description}
                        placeholder={placeholder}
                        required={required || withAsterisk}
                        size={size}
                        color={color}
                        onChange={(value: File | null) => handleDefaultValueChange(value as File)} />
                </Tooltip>
            case "AttachmentsFile":
                return <Tooltip label={tooltip || "Upload File"} withArrow={withArrow} position={position}>
                    <FileInput
                        label={label || displayName || "Upload File"}
                        description={description}
                        placeholder={placeholder}
                        required={required || withAsterisk}
                        size={size}
                        color={color}
                        onChange={(value: File | null) => handleDefaultValueChange(value as File)} />
                </Tooltip>
            case "AttachmentsURL":
                return <Tooltip label={tooltip || "Upload URL"} withArrow={withArrow} position={position}>
                    <TextInput
                        label={label || displayName || "Upload URL"}
                        description={description}
                        placeholder={placeholder}
                        required={required || withAsterisk}
                        size={size}
                        color={color}
                        onChange={(value) => handleDefaultValueChange(value)} />
                </Tooltip>
            case "Image":
                return <Tooltip label={tooltip || "Upload Image"} withArrow={withArrow} position={position}>
                    <Image
                        src={src}
                        alt={alt || displayName || "Upload Image"}
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