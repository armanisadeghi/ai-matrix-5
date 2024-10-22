"use client";

import React, { useState } from "react";
import { DrawerProps, Group, Modal, Radio } from "@mantine/core";
import { Button, TextInput } from "@/app/dashboard/code-editor-2/components";

interface CreateItemDialogProps extends Omit<DrawerProps, "onSubmit"> {
    currentPath: string;
    onSubmit: (type: "file" | "folder", name: string, path: string) => void;
}

export const CreateItemDialog: React.FC<CreateItemDialogProps> = ({ currentPath, onSubmit, onClose, opened }) => {
    const [itemName, setItemName] = useState("");
    const [itemType, setItemType] = useState<"file" | "folder">("file");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (itemName.trim()) {
            onSubmit(itemType, itemName.trim(), currentPath);
            setItemName("");
            onClose();
        }
    };

    return (
        <Modal title={`Create New ${itemType === "file" ? "File" : "Folder"}`} opened={opened} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Radio.Group
                    name="fileType"
                    label="Add a file/folder"
                    value={itemType}
                    onChange={(value) => setItemType(value as string as "file" | "folder")}
                >
                    <Group mt="xs">
                        <Radio value="file" label="File" />
                        <Radio value="folder" label="Folder" />
                    </Group>
                </Radio.Group>
                <TextInput
                    value={itemName}
                    onChange={(e) => setItemName(e.currentTarget.value)}
                    placeholder={`Enter ${itemType} name`}
                />
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="subtle" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </Modal>
    );
};
