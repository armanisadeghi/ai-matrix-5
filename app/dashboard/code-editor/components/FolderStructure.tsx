"use client";

import { Button } from "@mantine/core";
import { IconFileDots, IconFolder, IconFolderOpen } from "@tabler/icons-react";
import React, { useState } from "react";
import { type IRepoData } from "./Workspace";

export function buildTree(repoData: IRepoData): IFileNode[] {
    const root: IFileNode[] = [];

    if (repoData?.files) {
        for (const [key, value] of Object.entries(repoData.files)) {
            const parts = key.split("/");
            let currentLevel = root;

            parts.forEach((part, index) => {
                if (part === "") return; // Skip empty parts (e.g., trailing slashes)

                let existingNode = currentLevel.find((node) => node.name === part);

                if (!existingNode) {
                    existingNode = { name: part, content: value };
                    currentLevel.push(existingNode);
                }

                if (index < parts.length - 1) {
                    if (!existingNode.children) {
                        existingNode.children = [];
                    }
                    currentLevel = existingNode.children;
                }
            });
        }
    }

    return root;
}

type IFileNode = {
    name: string;
    content?: string;
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

    return (
        <div {...others}>
            {hasChildren ? (
                <div>
                    <Button
                        fullWidth
                        justify="space-between"
                        onClick={handleFolderClick}
                        variant={isActive ? "filled" : isExpanded ? "light" : "subtle"}
                        fw={isExpanded ? "semibold" : "normal"}
                    >
                        {isExpanded ? <IconFolderOpen size={14} /> : <IconFolder size={14} />}&nbsp;{node.name}
                    </Button>
                    {isExpanded &&
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
            ) : (
                <Button
                    fullWidth
                    justify="space-between"
                    onClick={() => onFileSelect(fullPath, decodeBase64(node?.content ?? ""))}
                    variant="subtle"
                    fw="normal"
                >
                    <IconFileDots size={14} />
                    &nbsp;{node.name}
                </Button>
            )}
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
            <p className="text-xs font-normal py-1.5 uppercase">Folder Structure</p>
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
