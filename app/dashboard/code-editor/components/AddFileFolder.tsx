import React, { useState } from "react";
import { ActionIcon, ActionIconProps, Tooltip } from "@mantine/core";
import { IconFilePlus, IconFolderPlus } from "@tabler/icons-react";
import { indexedDBStore } from "../utils/indexedDB";

type AddFileFolderProps = {
    projectName: string;
    activeFolder: string;
    onAdd: (path: string, isFile: boolean) => void;
    actionIconProps?: ActionIconProps;
};

export const AddFileFolder: React.FC<AddFileFolderProps> = ({ projectName, activeFolder, onAdd, actionIconProps }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async (isFile: boolean) => {
        setIsAdding(true);
        const itemType = isFile ? "file" : "folder";
        const name = prompt(`Enter ${itemType} name:`);
        if (name) {
            try {
                const project = await indexedDBStore.getRepository(projectName);
                if (project) {
                    const newPath = activeFolder ? `${activeFolder}/${name}` : name;

                    if (isFile) {
                        project.files[newPath] = btoa(""); // Empty file content
                    } else {
                        // Just add the folder without any content, no trailing slash or content
                        project.files[newPath] = null;
                    }

                    await indexedDBStore.addRepository(project);
                    onAdd(newPath, isFile);
                }
            } catch (error) {
                console.error(`Error adding ${itemType}:`, error);
                alert(`Failed to add ${itemType}. Please try again.`);
            }
        }
        setIsAdding(false);
    };

    return (
        <>
            <Tooltip label="New File">
                <ActionIcon onClick={() => handleAdd(true)} disabled={isAdding} {...actionIconProps}>
                    <IconFilePlus size={18} />
                </ActionIcon>
            </Tooltip>
            <Tooltip label="New Folder">
                <ActionIcon onClick={() => handleAdd(false)} disabled={isAdding} {...actionIconProps}>
                    <IconFolderPlus size={18} />
                </ActionIcon>
            </Tooltip>
        </>
    );
};
