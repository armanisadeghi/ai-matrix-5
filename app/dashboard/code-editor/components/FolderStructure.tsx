"use client";

import { Button } from "@mantine/core";
import { IconFileDots, IconFolder, IconFolderOpen } from "@tabler/icons-react";
import React, { useState } from "react";
import { getIconFromExtension } from "../utils";

import { IRepoData } from "../types";

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
    onFileSelect?: (path: string, content: string) => void;
    onFolderSelect: (path: string) => void;
    activeFolder: string;
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, path, onFileSelect, onFolderSelect, activeFolder, ...others }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    const fullPath = path ? `${path}/${node.name}` : node.name;
    const isActive = fullPath === activeFolder;

    const handleFolderClick = () => {
        setIsExpanded(!isExpanded);
        onFolderSelect(fullPath);
    };

    const decodeBase64 = (content: string) => atob(content);

    const FileIcon = node.isFolder ? (isExpanded ? IconFolderOpen : IconFolder) : getIconFromExtension(node.name);

    return (
        <div {...others}>
            <button
                className={`w-full p-1 flex items-center gap-2 text-md rounded transition ease-in-out delay-150 border border-transparent hover:border-neutral-600 ${node.isFolder && isExpanded ? "font-medium" : "font-normal"} node.isFolder ? (isActive ? "filled" : isExpanded ? "light" : "subtle") : "subtle" `}
                onClick={
                    node.isFolder ? handleFolderClick : () => onFileSelect!(fullPath, decodeBase64(node?.content ?? ""))
                }
            >
                <FileIcon size={16} />
                <span>{node.name}</span>
            </button>
            {node.isFolder &&
                isExpanded &&
                node.children?.map((child) => (
                    <TreeNode
                        key={child.name}
                        node={child}
                        path={fullPath}
                        onFileSelect={onFileSelect}
                        onFolderSelect={onFolderSelect}
                        activeFolder={activeFolder}
                        style={{ marginLeft: 12 }}
                    />
                ))}
        </div>
    );
};

type FileTreeProps = {
    treeData: IFileNode[];
    onFileSelect: (path: string, content: string) => void;
    onFolderSelect: (path: string) => void;
    activeFolder: string;
};

export const FileTree: React.FC<FileTreeProps> = ({ treeData, onFileSelect, onFolderSelect, activeFolder }) => {
    return (
        <div className="h-full">
            <p className="text-xs font-normal py-2 uppercase">Explorer</p>
            {treeData.map((node) => (
                <TreeNode
                    key={node.name}
                    node={node}
                    path=""
                    onFileSelect={onFileSelect}
                    onFolderSelect={onFolderSelect}
                    activeFolder={activeFolder}
                />
            ))}
        </div>
    );
};
