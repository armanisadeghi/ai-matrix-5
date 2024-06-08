"use client";
type BrokerFormProps = {
    type: string;
    setCurrentComponent: Function;
    currentComponent: Component,
};

import { useEffect, useState } from 'react';
import { Button, CheckboxGroup, Fieldset, Paper, Space, Stack, Switch, TextInput, Text, Checkbox, Group, FileInput, Image, Grid } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { IconPlus } from '@tabler/icons-react';
import { BrokerSizeSlider } from '@/components/Brokers/BrokerSizeSlider';
import { useBroker } from '@/context/brokerContext';
import { uuid } from 'uuidv4';
import { Component } from '@/types/broker';

export const BrokerEdit = ({ type, setCurrentComponent, currentComponent }: BrokerFormProps) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const { setCurrentBroker } = useBroker();


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
        setCurrentComponent((prev: Component) => ({
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
                        <Switch label="Marks" onChange={(e) => setCurrentComponent((prev: Component) => ({ ...prev, isMarks: e.target.checked }))} />
                        <Space h="sm" />
                    </>}
                    {type === "Image" && <>
                        <FileInput
                            label="Upload an image"
                            description="Upload an image"
                            placeholder="Upload an image"
                            onChange={handleImageUpload}
                        /></>}
                    <TextInput label="Name" onChange={(e) => setCurrentComponent((prev: Component) => ({ ...prev, label: e.target.value }))} />
                    <Space h="sm" />
                    <TextInput label="Placeholder" onChange={(e) => setCurrentComponent((prev: Component) => ({ ...prev, placeholderText: e.target.value }))} />
                    <Space h="sm" />
                    <TextInput label="Default Value" onChange={(e) => setCurrentComponent((prev: Component) => ({ ...prev, defaultValue: e.target.value }))} />
                    <Space h="sm" />
                    <TextInput label="Description" onChange={(e) => setCurrentComponent((prev: Component) => ({ ...prev, description: e.target.value }))} />
                    <Space h="sm" />
                    {type === "Select" && <>
                        <TextInput label="Options" placeholder="Option 1, Option 2, Option 3" description="Separate options with commas" onChange={(e) => setCurrentComponent((prev: Component) => ({ ...prev, options: (e.target.value).split(",") }))} />
                    </>}
                    <Space h="sm" />
                    <Switch label="Required" onChange={(e) => setCurrentComponent((prev: Component) => ({ ...prev, required: e.target.checked }))} />
                    <Space h="sm" />
                    <BrokerSizeSlider label="Size" onChange={(e) => setCurrentComponent((prev: Component) => ({ ...prev, size: e as any }))} />
                </Fieldset>
                <Space h="sm" />
                <Button variant="primary" w="100%" onClick={() => {
                    setCurrentBroker((prev) => ({ ...prev, components: [...prev.components, { ...currentComponent, componentId: uuid() }] }));
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