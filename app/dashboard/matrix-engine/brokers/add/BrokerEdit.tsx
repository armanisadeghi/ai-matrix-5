"use client";
import { useEffect, useState } from 'react';
import { Fieldset, Space, Switch, TextInput, Group, FileInput, Grid, NumberInput, Flex, ColorPicker } from '@mantine/core';
import AmeSlider from '@/ui/slider/AmeSlider';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { componentAtom, componentsAtom, componentSelector } from '@/context/atoms';

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface BrokerEditProps {
    id: string;
}

export const BrokerEdit = ({ id }: BrokerEditProps) => {
    const [components, setComponents] = useRecoilState(componentsAtom);
    const [currentComponent, setCurrentComponent] = useRecoilState(componentAtom);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [fileSrc, seFileSrc] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isMarks, setIsMarks] = useState(false);
    const { size, radius }: { size: Size, radius: string } = {
        size: "xs" as Size,
        radius: "xs" as Size
    };

    const handleChange = (property: string, value: any) => {
        setCurrentComponent({ ...currentComponent, [property]: value });
        setComponents([...components.filter(comp => comp.id !== id), { ...currentComponent, [property]: value }]);
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
        const prevComponents = components.filter(comp => comp.id !== id);
        setCurrentComponent({ ...currentComponent, src: imageSrc, file: fileSrc });
    }, [imageSrc, fileSrc]);

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Fieldset legend="Validation Rules" >
                    <Group>
                        <Switch size="xs" label="Required" onChange={(e) => handleChange("required", e.target.checked)} checked={currentComponent.required || false} />
                        <Space w="sm" />
                        <Switch size="xs" label="With Asterisk" onChange={(e) => handleChange("withAsterisk", e.target.checked)} checked={currentComponent.withAsterisk || false} />
                    </Group>
                    <Space h="sm" />
                    {currentComponent.type === "Textarea" && <>
                        <NumberInput size="xs" placeholder="Max Length" label="Max Length" onChange={(e) => handleChange("maxLength", e)} value={currentComponent.maxLength || 0} />
                        <Space h="sm" />
                        <NumberInput size="xs" placeholder="Min rows" label="Min Rows" onChange={(e) => handleChange("minRows", e)} value={currentComponent.minRows || 0} />
                        <Space h="sm" />
                        <NumberInput size="xs" placeholder="Max rows" label="Max Rows" onChange={(e) => handleChange("maxRows", e)} value={currentComponent.maxRows || 0} /></>
                    }
                    <Space h="sm" />
                    <TextInput
                        size='xs'
                        label="Validation Message"
                        placeholder="Validation Message"
                        onChange={(e) => handleChange("error", e.target.value)}
                    />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Fieldset legend="Additional properties" >
                    {currentComponent.type === "Textarea" && <Flex justify="flex-start" wrap={"wrap"} align="center" w="100%" gap={20}>
                        <Switch size="xs" label="Autosize" onChange={(e) => handleChange("autosize", e.target.checked)} checked={currentComponent.autosize || false} />
                        <Switch size="xs" label="Resize" onChange={(e) => handleChange("resize", e.target.checked)} checked={currentComponent.resize || false} />
                        <Switch size="xs" label="Submit on Enter" onChange={(e) => handleChange("submitOnEnter", e.target.checked)} checked={currentComponent.submitOnEnter || false} />
                        <Switch size="xs" label="Expandable" onChange={(e) => handleChange("expandable", e.target.checked)} checked={currentComponent.expandable || false} />
                        <Space h="sm" />
                    </Flex>}
                    {currentComponent.options && <TextInput size="xs" label="Options" placeholder="Option 1, Option 2, Option 3" description="Separate options with commas" onChange={(e) => handleChange("options", (e.target.value).split(","))} value={currentComponent.options || []} />}
                    <TextInput size="xs" label="Tooltip" placeholder="Tooltip" onChange={(e) => handleChange("tooltip", e.target.value)} value={currentComponent.tooltip || ""} />
                    <Space h="sm" />
                    <Switch size="xs" label="With Arrow" onChange={(e) => handleChange("withArrow", e.target.checked)} checked={currentComponent.withArrow || false} />
                    <Space h="sm" />
                    <TextInput size='xs' label="Placeholder" placeholder="Placeholder" onChange={(e) => handleChange("placeholder", e.target.value)} value={currentComponent.placeholder || ""} />
                    <Space h="sm" />
                    {/* <Switch size="xs" label="Marks" onChange={() => setIsMarks(!isMarks)} checked={currentComponent.isMarks} />
                    <Space h="xs" /> */}
                    {/* {isMarks && (
                        <TextInput
                            size='xs'
                            label="Marks"
                            placeholder="Mark 1, Mark 2, Mark 3"
                            description="Separate marks with commas"
                            onChange={(e) => handleChange("marks", (e.target.value).split(","))}
                            value={[currentComponent.marks].join(",")}
                        />
                    )} */}
                    <Space h="sm" />
                    {currentComponent.type === "Slider" && (
                        <Group>
                            <NumberInput label="Min" size="xs" onChange={(e) => handleChange("min", e)} value={currentComponent.min || 0} />
                            <NumberInput label="Max" size="xs" onChange={(e) => handleChange("max", e)} value={currentComponent.max || 0} />
                            <NumberInput label="Step" size="xs" onChange={(e) => handleChange("step", e)} value={currentComponent.step || 0} />
                        </Group>
                    )}
                    <Space h="sm" />
                    <TextInput size="xs" label="Display Order" placeholder="Display Order" onChange={(e) => handleChange("displayOrder", e.target.value)} value={currentComponent.displayOrder || ""} />
                    <Space h="sm" />
                    <TextInput size="xs" label="Dependencies" description="Separate dependencies with commas" placeholder="Dependencies" onChange={(e) => handleChange("dependencies", e.target.value)} value={currentComponent.dependencies || ""} />
                    {currentComponent.type === "Image" || currentComponent.type === "File" || currentComponent.type === "URL" && <>
                        <FileInput
                            size='xs'
                            label="Upload an image"
                            description="Upload an image"
                            placeholder="Upload an image"
                            onChange={handleImageUpload}
                            value={currentComponent.src || ""}
                        />
                        <Space h="sm" />
                        <FileInput
                            size='xs'
                            label="Upload a file"
                            description="Upload a file"
                            placeholder="Upload a file"
                            onChange={handleFileUpload}
                            value={currentComponent.src || ""}
                        /></>}
                    <Space h="sm" />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Fieldset legend="Appearance" >
                    <AmeSlider name={'Size'} onChange={(e) => handleChange("size", e)} value={currentComponent.size || 0} />
                    <Space h="sm" />
                    <AmeSlider name={'Radius'} onChange={(e) => handleChange("radius", e)} value={currentComponent.radius || 0} />
                    <Space h="md" />
                    <ColorPicker size="xs" w={"100%"} onChange={(e) => handleChange("color", e)} value={currentComponent.color || ""} />
                </Fieldset>
            </Grid.Col>
        </Grid>
    );
};