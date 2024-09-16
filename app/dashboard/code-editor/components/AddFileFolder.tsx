import React, { useState } from "react";
import { Button, TextInput, Select, Stack } from "@mantine/core";
import { indexedDBStore } from "../utils/indexedDB";

export const AddFileFolder: React.FC<{ projectName: string; onAdd: () => void }> = ({ projectName, onAdd }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("file");
    const [content, setContent] = useState("");

    const handleAdd = async () => {
        if (!name) {
            // You might want to show an error message here
            return;
        }

        try {
            const project = await indexedDBStore.getRepository(projectName);
            if (project) {
                if (type === "file") {
                    project.files[name] = btoa(content); // Convert content to base64
                } else {
                    // For folders, we'll just add an empty object
                    project.files[name] = btoa(JSON.stringify({}));
                }
                await indexedDBStore.addRepository(project);
                setName("");
                setContent("");
                onAdd();
            }
        } catch (error) {
            console.error("Error adding file/folder:", error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <TextInput placeholder="Enter name" value={name} onChange={(event) => setName(event.currentTarget.value)} />
            <Select
                data={[
                    { value: "file", label: "File" },
                    { value: "folder", label: "Folder" },
                ]}
                value={type}
                onChange={(value) => setType(value as string)}
            />
            {type === "file" && (
                <TextInput
                    placeholder="Enter content"
                    value={content}
                    onChange={(event) => setContent(event.currentTarget.value)}
                />
            )}
            <Button onClick={handleAdd}>Add {type === "file" ? "File" : "Folder"}</Button>
        </div>
    );
};
