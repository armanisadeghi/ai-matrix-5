import { Button, Group, Image, Stack, Text, rem, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";
import React, { useRef, useState } from "react";

interface ImageUploaderProps {
    onUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
    const [file, setFile] = useState<FileWithPath | null>(null);
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const openRef = useRef<() => void>(null);

    const handleDrop = (files: FileWithPath[]) => {
        setFile(files[0]);
    };

    const handleUpload = () => {
        if (file) {
            onUpload(file);
        }
    };

    const handleRemove = () => {
        setFile(null);
    };

    return (
        <Stack gap="md">
            <Dropzone
                openRef={openRef}
                onDrop={handleDrop}
                activateOnClick={false}
                accept={["image/*"]}
                styles={{ inner: { pointerEvents: "all" } }}
            >
                <Group align="center" gap="xl" style={{ minHeight: rem(220), pointerEvents: "none" }}>
                    {file ? (
                        <Image
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            style={{ maxWidth: "100%", maxHeight: rem(200) }}
                        />
                    ) : (
                        <Dropzone.Accept>
                            <IconUpload
                                size="3.2rem"
                                stroke={1.5}
                                color={theme.colors[theme.primaryColor][colorScheme === "dark" ? 4 : 6]}
                            />
                        </Dropzone.Accept>
                    )}

                    <div>
                        <Text size="xl" inline>
                            Drag image here or click to select
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach a single image file
                        </Text>
                    </div>
                </Group>
            </Dropzone>

            {file && (
                <Group align="apart">
                    <Text>{file.name}</Text>
                    <Group>
                        <Button onClick={handleUpload}>Upload</Button>
                        <Button onClick={handleRemove} color="red">
                            <IconX size={18} />
                        </Button>
                    </Group>
                </Group>
            )}

            <Button onClick={() => openRef.current?.()}>Select Image</Button>
        </Stack>
    );
};

export default ImageUploader;
