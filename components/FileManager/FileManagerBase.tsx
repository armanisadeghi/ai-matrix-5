"use client";
// components/FileManager/FileManagerBase.tsx

import React, { useEffect, useState } from "react";
import { useFileManager } from "@/hooks/useFileManager";
import { Button, Group, MultiSelect, Stack, Switch, Text } from "@mantine/core";

interface FileManagerBaseProps {
    onClose?: () => void;
}

export const FileManagerBase: React.FC<FileManagerBaseProps> = ({ onClose }) => {
    const { uploadFile, deleteFile, updateSharingSettings, listFiles, storageType, setStorageType } = useFileManager();

    const [files, setFiles] = useState<any[]>([]);
    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [isPublic, setIsPublic] = useState(false);
    const [shareWithAll, setShareWithAll] = useState(false);
    const [sharedWithUsers, setSharedWithUsers] = useState<string[]>([]);

    useEffect(() => {
        void loadFiles();
    }, [storageType]);

    const loadFiles = async () => {
        const fileList: any = await listFiles();
        setFiles(fileList);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            await uploadFile(file);
            await loadFiles();
        }
    };

    const handleFileDelete = async (fileName: string) => {
        await deleteFile(fileName);
        await loadFiles();
    };

    const handleFileSelect = async (file: any) => {
        setSelectedFile(file);
        // Load sharing settings if it's a cloud file
        if (storageType === "cloud") {
            // Implement this function to get sharing settings from Supabase
            // const sharingSettings = await getSharingSettings(file.id);
            // setIsPublic(sharingSettings.isPublic);
            // setShareWithAll(sharingSettings.shareWithAll);
            // setSharedWithUsers(sharingSettings.sharedWithUsers);
        }
    };

    const handleUpdateSharingSettings = async () => {
        if (selectedFile && storageType === "cloud") {
            await updateSharingSettings(selectedFile.id, isPublic, shareWithAll, sharedWithUsers);
        }
    };

    return (
        <Stack>
            <Group justify="space-between">
                <Text size="xl">File Manager</Text>
                <Switch
                    label="Storage Type"
                    checked={storageType === "cloud"}
                    onChange={() => setStorageType(storageType === "cloud" ? "local" : "cloud")}
                />
            </Group>

            <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="fileUpload" />
            <Button component="label" htmlFor="fileUpload">
                Upload File
            </Button>

            {files.map((file) => (
                <Group key={file.id} justify="space-between">
                    <Text>{file.name}</Text>
                    <Group>
                        <Button onClick={() => handleFileSelect(file)}>Select</Button>
                        <Button color="red" onClick={() => handleFileDelete(file.name)}>
                            Delete
                        </Button>
                    </Group>
                </Group>
            ))}

            {selectedFile && storageType === "cloud" && (
                <Stack>
                    <Text size="lg">Sharing Settings</Text>
                    <Switch
                        label="Public"
                        checked={isPublic}
                        onChange={(event) => setIsPublic(event.currentTarget.checked)}
                    />
                    <Switch
                        label="Share with All"
                        checked={shareWithAll}
                        onChange={(event) => setShareWithAll(event.currentTarget.checked)}
                    />
                    <MultiSelect
                        data={[]} // Add user list here
                        value={sharedWithUsers}
                        onChange={setSharedWithUsers}
                        label="Share with specific users"
                    />
                    <Button onClick={handleUpdateSharingSettings}>Update Sharing Settings</Button>
                </Stack>
            )}

            {onClose && <Button onClick={onClose}>Close</Button>}
        </Stack>
    );
};
