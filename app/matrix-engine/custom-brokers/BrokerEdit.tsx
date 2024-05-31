"use client";
type BrokerFormProps = {
    type: string;
    setBrokerComponents: any;
};

import { useEffect, useState } from 'react';
import { Button, CheckboxGroup, Fieldset, Paper, Space, Stack, Switch, TextInput, Text, Checkbox, Group, FileInput, Image } from '@mantine/core';
import { Component } from '@/types/broker';
import BrokerComponent from './BrokerComponent';
import { IconPlus } from '@tabler/icons-react';
import { BrokerSizeSlider } from '@/components/Brokers/BrokerSizeSlider';
import { BrokerCheckBoxGroup } from '@/components/Brokers/BrokerCheckBoxGroup';
import { v4 as uuidv4 } from 'uuid';

export const BrokerEdit = ({ type, setBrokerComponents }: BrokerFormProps) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [currentBroker, setCurrentBroker] = useState<Component>({
        componentId: '',
        type: type,
        label: "new Label",
        description: "new Description",
        tooltip: "new Tooltip",
        maxLength: 10,
        placeholderText: "",
        defaultValue: "",
        displayOrder: 0,
        validation: "",
        dependencies: [],
        required: false,
        options: ["Option 1", "Option 2", "Option 3"],
        groupOptions: [{ value: "Group 1", label: "Group 1" }, { value: "Group 2", label: "Group 2" }],
        size: "md",
        color: "default",
        exampleInputs: [],
        group: "",
        min: 0,
        max: 10,
        step: 1,
        tableData: {
            data: [
                { name: 'John', age: 25 },
                { name: 'Jane', age: 30 },
            ],
            columns: [
                { accessor: 'name', header: 'Name' },
                { accessor: 'age', header: 'Age' },
            ],
        },
        src: "/logo-circle.png",
        alt: "",
        radius: "md",
        h: 0,
        w: 0,
        fit: "cover"
    } as Component);

    useEffect(() => {
        if (uploadedImage) {
            const url = URL.createObjectURL(uploadedImage);
            setImageSrc(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [uploadedImage]);


    const handleImageUpload = (file: File | null) => {
        setImageUploaded(true);
        setUploadedImage(file);

    };

    useEffect(() => {
        setCurrentBroker({ ...currentBroker, type: type, src: imageSrc });
    }, [type, imageSrc]);

    return (
        <Paper style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Stack style={{ width: '100%', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                <Fieldset legend="Add properties" >
                    <TextInput label="Name" onChange={(e) => setCurrentBroker({ ...currentBroker, label: e.target.value })} />
                    <Space h="sm" />
                    <TextInput label="Placeholder" onChange={(e) => setCurrentBroker({ ...currentBroker, placeholderText: e.target.value })} />
                    <Space h="sm" />
                    <TextInput label="Default Value" onChange={(e) => setCurrentBroker({ ...currentBroker, defaultValue: e.target.value })} />
                    <Space h="sm" />
                    <TextInput label="Description" onChange={(e) => setCurrentBroker({ ...currentBroker, description: e.target.value })} />
                    <Space h="sm" />
                    <TextInput label="Options" placeholder="Option 1, Option 2, Option 3" description="Separate options with commas" onChange={(e) => setCurrentBroker({ ...currentBroker, options: (e.target.value).split(",") })} />
                    <Space h="sm" />
                    <Switch label="Required" onChange={(e) => setCurrentBroker({ ...currentBroker, required: e.target.checked })} />
                    <Space h="sm" />
                    <BrokerSizeSlider label="Size" onChange={(e) => setCurrentBroker({ ...currentBroker, size: e as any })} />
                    <FileInput
                        label="Upload an image"
                        description="Upload an image"
                        placeholder="Upload an image"
                        onChange={handleImageUpload}
                    />
                </Fieldset>
                <Space h="sm" />
                <Button variant="primary" onClick={() => {
                    setBrokerComponents((prevComponents: Component[]) => [...prevComponents, currentBroker]);
                }}>
                    Add Component To Broker
                </Button>
            </Stack>
            <Space w="md" />
            <Fieldset legend="Component" radius="md" style={{ width: '100%' }}>
                <BrokerComponent component={currentBroker} type={type} />
            </Fieldset>
        </Paper>
    );
};