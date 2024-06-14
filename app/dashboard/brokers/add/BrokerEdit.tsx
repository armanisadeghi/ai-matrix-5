"use client";
import { useEffect, useState } from 'react';
import { Fieldset, Space, Switch, TextInput, Group, FileInput, Grid, NumberInput, ColorInput, Flex, ColorPicker } from '@mantine/core';
import { Broker } from '@/types/broker';
import AmeSlider from '@/ui/slider/AmeSlider';
import AmeNumericInput from '@/ui/input/AmeNumericInput';

interface BrokerFormProps {
    currentData: Broker;
    setCurrentData: Function;
}

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export const BrokerEdit = ({ setCurrentData, currentData }: BrokerFormProps) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [fileSrc, seFileSrc] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isMarks, setIsMarks] = useState(false);
    const [validation, setValidation] = useState<string | null>(null);
    const { size, radius }: { size: Size, radius: string } = {
        size: "xs" as Size,
        radius: "xs" as Size
    };

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
    const handleFileUpload = (file: File | null) => {
        setUploadedFile(file);
        setFileUploaded(true);
    };

    useEffect(() => {
        setCurrentData((prev: Broker) => ({
            ...prev,
            component: {
                ...prev.component,
                src: imageSrc,
                file: fileSrc
            }
        }));
    }, [imageSrc, fileSrc]);

    return (
        <Fieldset legend="Additional properties" >
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Flex justify="flex-start" wrap={"wrap"} align="center" w="100%" gap={20}>
                        <Switch size="xs" label="Required" onChange={(e) => handleChange("required", e.target.checked)} />
                        <Switch size="xs" label="With Asterisk" onChange={(e) => handleChange("withAsterisk", e.target.checked)} />
                        <Switch size="xs" label="Autosize" onChange={(e) => handleChange("autosize", e.target.checked)} />
                        <Switch size="xs" label="Resize" onChange={(e) => handleChange("resize", e.target.checked)} />
                        <Switch size="xs" label="Submit on Enter" onChange={(e) => handleChange("submitOnEnter", e.target.checked)} />
                        <Switch size="xs" label="Expandable" onChange={(e) => handleChange("expandable", e.target.checked)} />
                    </Flex>
                    <Space h="sm" />
                    <TextInput size="xs" label="Options" placeholder="Option 1, Option 2, Option 3" description="Separate options with commas" onChange={(e) => handleChange("options", (e.target.value).split(","))} />
                    <Space h="sm" />
                    <TextInput size="xs" label="Tooltip" placeholder="Tooltip" onChange={(e) => handleChange("tooltip", e.target.value)} />
                    <Space h="sm" />
                    <Switch size="xs" label="With Arrow" onChange={(e) => handleChange("withArrow", e.target.checked)} />
                    <Space h="sm" />
                    <TextInput size='xs' label="Placeholder" placeholder="Placeholder" onChange={(e) => handleChange("placeholder", e.target.value)} />
                    <Space h="sm" />
                    <NumberInput size="xs" placeholder="Max Length" label="Max Length" onChange={(e) => handleChange("maxLength", e)} />
                    <Space h="sm" />
                    <NumberInput size="xs" placeholder="Min rows" label="Min Rows" onChange={(e) => handleChange("minRows", e)} />
                    <Space h="sm" />
                    <NumberInput size="xs" placeholder="Max rows" label="Max Rows" onChange={(e) => handleChange("maxRows", e)} />
                    <Space h="sm" />

                    <TextInput size="xs" label="Dependencies" description="Separate dependencies with commas" placeholder="Dependencies" onChange={(e) => handleChange("dependencies", e.target.value)} />
                    <Space h="sm" />

                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Switch size="xs" label="Marks" onChange={() => setIsMarks(!isMarks)} />
                    <Space h="xs" />
                    {isMarks && (
                        <TextInput
                            size='xs'
                            label="Marks"
                            placeholder="Mark 1, Mark 2, Mark 3"
                            description="Separate marks with commas"
                            onChange={(e) => handleChange("marks", (e.target.value).split(","))}
                        />
                    )}
                    <Space h="sm" />
                    <Group>
                        <NumberInput label="Min" size="xs" onChange={(e) => handleChange("min", e)} />
                        <NumberInput label="Max" size="xs" onChange={(e) => handleChange("max", e)} />
                        <NumberInput label="Step" size="xs" onChange={(e) => handleChange("step", e)} />
                    </Group>
                    <Space h="sm" />
                    <Switch size="xs" label="Validation" onChange={(e) => setValidation(e.target.checked ? 'required' : null)} />
                    <Space h="xs" />
                    {validation === 'required' && (
                        <TextInput
                            size='xs'
                            label="Validation Message"
                            placeholder="Validation Message"
                            onChange={(e) => handleChange("validationMessage", e.target.value)}
                        />
                    )}
                    <Space h="sm" />
                    <TextInput size="xs" label="Display Order" placeholder="Display Order" onChange={(e) => handleChange("displayOrder", e.target.value)} />
                    <Space h="sm" />

                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <FileInput
                        size='xs'
                        label="Upload an image"
                        description="Upload an image"
                        placeholder="Upload an image"
                        onChange={handleImageUpload}
                    />
                    <Space h="sm" />
                    <FileInput
                        size='xs'
                        label="Upload a file"
                        description="Upload a file"
                        placeholder="Upload a file"
                        onChange={handleFileUpload}
                    />
                    <Space h="sm" />
                    <Fieldset legend="Appearance" >
                        <AmeSlider name={'Size'} value={size as string} onChange={(e) => handleChange("size", e)} />
                        <Space h="sm" />
                        <AmeSlider name={'Radius'} value={radius as string} onChange={(e) => handleChange("radius", e)} />
                        <Space h="md" />
                        <ColorPicker size="xs" w={"100%"} onChange={(e) => handleChange("color", e)} />
                    </Fieldset>
                </Grid.Col>
            </Grid>
        </Fieldset>
    );
};