"use client";

import { Menu } from "@mantine/core";
import { IconDotsVertical, IconFolder, IconFolderOpen, IconPencil, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

import { IFile } from "../edit/[repoName]/page";
import { IRepoData } from "../types";
import { getIconFromExtension, indexedDBStore } from "../utils";

export function buildTree(repoData: IRepoData): IFileNode[] {
    const root: IFileNode[] = [];

    if (repoData?.files) {
        // Get sorted keys before processing
        const sortedKeys = Object.keys(repoData.files).sort((a, b) => a.localeCompare(b));

        sortedKeys.forEach((key) => {
            const value = repoData.files[key];
            const parts = key.split("/");
            let currentLevel = root;

            parts.forEach((part, index) => {
                if (part === "") return; // Skip empty parts (e.g., trailing slashes)

                let existingNode = currentLevel.find((node) => node.name === part);

                if (!existingNode) {
                    existingNode = {
                        name: part,
                        content: value,
                        isFolder: value === null || index < parts.length - 1, // Folder if value is `null`
                    };
                    currentLevel.push(existingNode);
                }

                if (existingNode.isFolder && !existingNode.children) {
                    existingNode.children = [];
                }

                if (index < parts.length - 1) {
                    currentLevel = existingNode.children!;
                }
            });
        });
    }

    return root;
}

type IFileNode = {
    name: string;
    isFolder: boolean;
    content?: string | null;
    children?: IFileNode[];
};

type TreeNodeProps = React.HTMLAttributes<HTMLDivElement> & {
    node: IFileNode;
    path: string;
    repoName: string;
    onFileSelect?: (path: string, content: string) => void;
    onFolderSelect: (path: string) => void;
    onUpdate: () => void;
    activeFolder: string;
    selectedFile: IFile;
};

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    path,
    repoName,
    onFileSelect,
    onFolderSelect,
    onUpdate,
    activeFolder,
    selectedFile,
    ...others
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(node.name);
    const fullPath = path ? `${path}/${node.name}` : node.name;
    const isActive = fullPath === activeFolder;

    const handleFolderClick = () => {
        setIsExpanded(!isExpanded);
        onFolderSelect(fullPath);
    };

    const decodeBase64 = (content: string) => atob(content);

    const FileIcon = node.isFolder ? (isExpanded ? IconFolderOpen : IconFolder) : getIconFromExtension(node.name);

    const handleRename = async () => {
        if (isRenaming) {
            const oldPath = fullPath;
            const newPath = path ? `${path}/${newName}` : newName;

            try {
                if (node.isFolder) {
                    await indexedDBStore.updateFolder(repoName, oldPath, newPath);
                } else {
                    const content = node.content ? decodeBase64(node.content) : "";
                    await indexedDBStore.updateFile(repoName, oldPath, newPath, content);
                }
                onUpdate();
            } catch (error) {
                console.error("Error renaming:", error);
                // Handle error (e.g., show error message to user)
            }

            setIsRenaming(false);
        } else {
            setIsRenaming(true);
        }
    };

    const handleDelete = async () => {
        try {
            if (node.isFolder) {
                await indexedDBStore.deleteFolder(repoName, fullPath);
            } else {
                await indexedDBStore.deleteFile(repoName, fullPath);
            }
            onUpdate();
        } catch (error) {
            console.error("Error deleting:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    const activeFolderClass = node.isFolder
        ? isActive
            ? "bg-neutral-700 font-medium"
            : isExpanded
              ? "bg-neutral-700 font-medium"
              : "font-normal"
        : "subtle";
    const activeFileClass = !node.isFolder && selectedFile?.path === fullPath ? "bg-neutral-700" : "bg-neutral-0";

    useEffect(() => {
        setIsExpanded(node.isFolder && node.name === fullPath && selectedFile?.path.split("/").includes(fullPath));
    }, [selectedFile]);

    return (
        <div {...others}>
            <div className="flex items-center gap-2">
                {isRenaming ? (
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleRename}
                        autoFocus
                    />
                ) : (
                    <button
                        className={`flex-grow p-1 flex items-center gap-2 text-sm text-white rounded transition ease-in-out delay-150 border border-transparent hover:border-neutral-500
                             ${activeFolderClass} ${activeFileClass}
                             `}
                        onClick={
                            node.isFolder
                                ? handleFolderClick
                                : () => onFileSelect!(fullPath, decodeBase64(node?.content ?? ""))
                        }
                    >
                        <FileIcon size={16} />
                        <span>{node.name}</span>
                    </button>
                )}
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <button className="">
                            <IconDotsVertical size={16} />
                        </button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconPencil size={16} />} onClick={handleRename}>
                            Rename
                        </Menu.Item>
                        <Menu.Item leftSection={<IconTrash size={16} />} onClick={handleDelete}>
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            {node.isFolder &&
                isExpanded &&
                node.children?.map((child) => (
                    <TreeNode
                        key={child.name}
                        node={child}
                        path={fullPath}
                        repoName={repoName}
                        onFileSelect={onFileSelect}
                        onFolderSelect={onFolderSelect}
                        onUpdate={onUpdate}
                        activeFolder={activeFolder}
                        style={{ marginLeft: 12 }}
                        selectedFile={selectedFile}
                    />
                ))}
        </div>
    );
};

type FileTreeProps = {
    treeData: IFileNode[];
    repoName: string;
    onFileSelect: (path: string, content: string) => void;
    onFolderSelect: (path: string) => void;
    onUpdate: () => Promise<void> | void;
    activeFolder: string;
    selectedFile: IFile;
};

export const FileTree: React.FC<FileTreeProps> = ({
    treeData,
    repoName,
    onFileSelect,
    onFolderSelect,
    onUpdate,
    activeFolder,
    selectedFile,
}) => {
    return (
        <div className="h-full">
            <p className="text-xs font-normal py-2 uppercase">Explorer</p>
            {treeData.map((node) => (
                <TreeNode
                    key={node.name}
                    node={node}
                    path=""
                    repoName={repoName}
                    onFileSelect={onFileSelect}
                    onFolderSelect={onFolderSelect}
                    onUpdate={onUpdate}
                    activeFolder={activeFolder}
                    selectedFile={selectedFile}
                />
            ))}
        </div>
    );
};
