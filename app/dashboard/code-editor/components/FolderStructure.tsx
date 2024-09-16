"use client";

import { Button } from "@mantine/core";
import { IconFileDots, IconFolder, IconFolderOpen } from "@tabler/icons-react";
import React, { HTMLAttributes, useState } from "react";
import { type IRepoData } from "./Workspace";

type FileStructure = {
    [key: string]: string | FileStructure;
};

export function buildTree(repoData: IRepoData): IFileNode[] {
    const root: IFileNode[] = [];

    if (repoData?.files) {
        for (const [key, value] of Object.entries(repoData.files)) {
            const parts = key.split("/");
            let currentLevel = root;

            parts.forEach((part, index) => {
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

type TreeNodeProps = HTMLAttributes<HTMLDivElement> & {
    node: IFileNode;
    onFileSelect?: (path: string, content: string) => void;
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, onFileSelect, ...others }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const hasChildren = node.children && node.children.length > 0;

    const decodeBase64 = (content: string) => atob(content);

    return (
        <div {...others}>
            {hasChildren ? (
                <div>
                    <Button
                        fullWidth
                        justify="space-between"
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant={isExpanded ? "light" : "subtle"}
                        fw={isExpanded ? "semibold" : "normal"}
                    >
                        {isExpanded ? <IconFolderOpen size={14} /> : <IconFolder size={14} />}&nbsp;{node.name}
                    </Button>
                    {isExpanded &&
                        node.children?.map((child) => (
                            <TreeNode key={child.name} node={child} style={{ marginLeft: 12 }} />
                        ))}
                </div>
            ) : (
                <Button
                    fullWidth
                    justify="space-between"
                    onClick={() => onFileSelect(node.name, decodeBase64(node?.content ?? ""))}
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

// interface FileTreeProps {
//     files: FileStructure;
//     onFileSelect: (path: string, content: string) => void;
// }

interface FileTreeProps {
    treeData: IFileNode[];
    onFileSelect: (path: string, content: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ treeData, onFileSelect }) => {
    return (
        <div className="h-full">
            <p className="text-xs font-normal py-1.5 uppercase">Folder Structure</p>
            {treeData.map((node) => (
                <TreeNode key={node.name} node={node} onFileSelect={onFileSelect} />
            ))}
        </div>
    );
};
