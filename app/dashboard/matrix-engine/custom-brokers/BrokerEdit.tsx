"use client";
type BrokerFormProps = {
    type: string;
};

import { useEffect, useState } from 'react';
import { Button, CheckboxGroup, Fieldset, Paper, Space, Stack, Switch, TextInput, Text, Checkbox, Group, FileInput, Image, Grid } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { IconPlus } from '@tabler/icons-react';
import { BrokerSizeSlider } from '@/components/Brokers/BrokerSizeSlider';
import { BrokerCheckBoxGroup } from '@/components/Brokers/BrokerCheckBoxGroup';
import { useBroker } from '@/context/brokerContext';
import { uuid } from 'uuidv4';
import { currentChatAtom } from '@/org/atoms/ChatAtoms';
import { Component } from '@/types/broker';

export const BrokerEdit = ({ type }: BrokerFormProps) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const { setCurrentBroker } = useBroker();
    const [currentComponent, setCurrentComponent] = useState<Component>({
        componentId: '',
        type: '',
        label: 'new label',
        tooltip: 'new tooltip',
        description: 'description',
        maxLength: 200,
        placeholderText: 'placeholder',
        defaultValue: undefined,
        displayOrder: undefined,
        validation: '',
        dependencies: [],
        required: false,
        options: [],
        groupOptions: [],
        size: 'md',
        color: '',
        exampleInputs: [],
        group: '',
        min: 1,
        max: 10,
        step: 1,
        value: '',
        onChange: () => { },
        tableData: undefined,
        src: '',
        alt: '',
        radius: 'md',
        h: 'auto',
        w: 'auto',
        fit: 'fill',
        marks: [],
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
        setCurrentComponent((prev) => ({
            ...prev,
            type,
            src: imageSrc,
        }));
    }, [type, imageSrc]);

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties" >
                    {type === "Slider" && <>
                        <Switch label="Marks" onChange={(e) => setCurrentComponent((prev) => ({ ...prev, isMarks: e.target.checked }))} />
                        <Space h="sm" />
                    </>
                    }
                    {type === "Image" && <>
                        <FileInput
                            label="Upload an image"
                            description="Upload an image"
                            placeholder="Upload an image"
                            onChange={handleImageUpload}
                        /></>}
                    <TextInput label="Name" onChange={(e) => setCurrentComponent((prev) => ({ ...prev, label: e.target.value }))} />
                    <Space h="sm" />
                    <TextInput label="Placeholder" onChange={(e) => setCurrentComponent((prev) => ({ ...prev, placeholderText: e.target.value }))} />
                    <Space h="sm" />
                    <TextInput label="Default Value" onChange={(e) => setCurrentComponent((prev) => ({ ...prev, defaultValue: e.target.value }))} />
                    <Space h="sm" />
                    <TextInput label="Description" onChange={(e) => setCurrentComponent((prev) => ({ ...prev, description: e.target.value }))} />
                    <Space h="sm" />
                    {type === "Select" && <>
                        <TextInput label="Options" placeholder="Option 1, Option 2, Option 3" description="Separate options with commas" onChange={(e) => setCurrentComponent((prev) => ({ ...prev, options: (e.target.value).split(",") }))} />
                    </>}
                    <Space h="sm" />
                    <Switch label="Required" onChange={(e) => setCurrentComponent((prev) => ({ ...prev, required: e.target.checked }))} />
                    <Space h="sm" />
                    <BrokerSizeSlider label="Size" onChange={(e) => setCurrentComponent((prev) => ({ ...prev, size: e as any }))} />
                </Fieldset>
                <Space h="sm" />
                <Button variant="primary" w="100%" onClick={() => {
                    const newComponent = {
                        ...currentComponent,
                        componentId: uuid(),
                    };
                    setCurrentBroker((prevBroker) => ({
                        ...prevBroker,
                        components: [...prevBroker.components, newComponent]
                    }));
                }}>
                    Add Component To Broker
                </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Component" radius="md">
                    <BrokerComponent type={type} currentComponent={currentComponent} />
                </Fieldset>
            </Grid.Col>
        </Grid>
    );
};