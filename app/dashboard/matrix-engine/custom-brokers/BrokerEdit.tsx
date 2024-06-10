"use client";
type BrokerFormProps = {
    setCurrentComponent: Function;
    currentComponent: Component,
};

import { useEffect, useState } from 'react';
import { Button, CheckboxGroup, Fieldset, Paper, Space, Stack, Switch, TextInput, Text, Checkbox, Group, FileInput, Image, Grid } from '@mantine/core';
import BrokerComponent from './BrokerComponent';
import { IconPlus } from '@tabler/icons-react';
import { BrokerSizeSlider } from '@/components/Brokers/BrokerSizeSlider';
import { Component } from '@/types/broker';
import { createBrokerManager } from '@/services/brokerService';
import { currentBrokerAtom } from '../../../../context/atoms/brokerAtoms';
import { useRecoilValue } from 'recoil';

export const BrokerEdit = () => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const currentBrokerAtomValue = useRecoilValue(currentBrokerAtom);
    const brokerManager = createBrokerManager();

    const handleChange = (property: string, value: any) => {
        const updatedBroker = {
            ...currentBrokerAtomValue,
            component: {
                ...currentBrokerAtomValue.component,
                [property]: value
            }
        }
        brokerManager.updateBroker(updatedBroker);
    };


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

    const handleUpdate = () => {
        const updatedBroker = {
            ...currentBrokerAtomValue,
        }
        brokerManager.updateBroker(updatedBroker);
    };

    // useEffect(() => {
    //     setCurrentComponent((prev: Component) => ({
    //         ...prev,
    //         src: imageSrc,
    //     }));
    // }, [imageSrc]);

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties" >
                    {currentBrokerAtomValue.component.type === "Slider" && <>
                        <Switch label="Marks" onChange={(e) => handleChange("isMarks", e.target.checked)} />
                        <Space h="sm" />
                    </>}
                    {currentBrokerAtomValue.component.type === "Image" && <>
                        <FileInput
                            label="Upload an image"
                            description="Upload an image"
                            placeholder="Upload an image"
                            onChange={handleImageUpload}
                        /></>}
                    <TextInput label="Name" onChange={(e) => handleChange("label", e.target.value)} />
                    <Space h="sm" />
                    <TextInput label="Placeholder" onChange={(e) => handleChange("placeholderText", e.target.value)} />
                    <Space h="sm" />
                    <TextInput label="Default Value" onChange={(e) => handleChange("defaultValue", e.target.value)} />
                    <Space h="sm" />
                    <TextInput label="Description" onChange={(e) => handleChange("description", e.target.value)} />
                    <Space h="sm" />
                    {currentBrokerAtomValue.component.type === "Select" && <>
                        <TextInput label="Options" placeholder="Option 1, Option 2, Option 3" description="Separate options with commas" onChange={(e) => handleChange("options", (e.target.value).split(","))} />
                    </>}
                    <Space h="sm" />
                    <Switch label="Required" onChange={(e) => handleChange("required", e.target.checked)} />
                    <Space h="sm" />
                    <BrokerSizeSlider label="Size" onChange={(e) => handleChange("size", e as any)} />
                </Fieldset>
                <Space h="sm" />
                <Button variant="primary" w="100%" onClick={handleUpdate}>
                    Add Component To Broker
                </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Component" radius="md">
                    <BrokerComponent currentComponent={currentBrokerAtomValue.component} type={currentBrokerAtomValue.component.type} />
                </Fieldset>
            </Grid.Col>
        </Grid>
    );
};