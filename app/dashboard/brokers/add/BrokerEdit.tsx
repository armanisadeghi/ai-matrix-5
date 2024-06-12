"use client";
import { useEffect, useState } from 'react';
import { Button, CheckboxGroup, Fieldset, Paper, Space, Stack, Switch, TextInput, Text, Checkbox, Group, FileInput, Image, Grid } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { BrokerSizeSlider } from '@/components/Brokers/BrokerSizeSlider';
import { Broker } from '@/types/broker';

interface BrokerFormProps {
    currentData: Broker;
    setCurrentData: Function;
}

export const BrokerEdit = ({ setCurrentData, currentData }: BrokerFormProps) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    const handleChange = (property: string, value: any) => {
        const updatedBroker = {
            ...currentData,
            component: {
                ...currentData.component,
                [property]: value
            }
        }
        setCurrentData(updatedBroker);
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

    // useEffect(() => {
    //     setCurrentData((prev: Component) => ({
    //         ...prev,
    //         src: imageSrc,
    //     }));
    // }, [imageSrc]);

    return (
        <Fieldset legend="Additional properties" >
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Switch label="Required" onChange={(e) => handleChange("required", e.target.checked)} />
                    <Space h="sm" />
                    <BrokerSizeSlider label="Size" onChange={(e) => handleChange("size", e as any)} />
                    <Space h="sm" />
                    <TextInput label="Options" placeholder="Option 1, Option 2, Option 3" description="Separate options with commas" onChange={(e) => handleChange("options", (e.target.value).split(","))} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Switch label="Marks" onChange={(e) => handleChange("isMarks", e.target.checked)} />
                    <Space h="sm" />
                    <FileInput
                        label="Upload an image"
                        description="Upload an image"
                        placeholder="Upload an image"
                        onChange={handleImageUpload}
                    />
                </Grid.Col>
            </Grid>
        </Fieldset>
    );
};