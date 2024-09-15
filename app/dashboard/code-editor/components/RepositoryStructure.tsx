"use client";

import React, { useState } from "react";
import { Button } from "@mantine/core";
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

interface IFileNode {
    name: string;
    content?: string;
    children?: IFileNode[];
}

interface TreeNodeProps {
    node: IFileNode;
    onFileSelect?: (path: string, content: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onFileSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const hasChildren = node.children && node.children.length > 0;

    const decodeBase64 = (content: string) => atob(content);

    const handleFileSelect = () => {
        const content = node.content ? decodeBase64(node.content) : "";
        onFileSelect(node.name, content);
    };

    return (
        <div style={{ marginLeft: "20px" }}>
            {hasChildren ? (
                <div>
                    <div onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: "pointer" }}>
                        {isExpanded ? "▼" : "►"} {node.name}
                    </div>
                    {isExpanded && node.children?.map((child) => <TreeNode key={child.name} node={child} />)}
                </div>
            ) : (
                <div onClick={() => onFileSelect(node.name, decodeBase64(node?.content ?? ""))}>{node.name}</div>
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
        <div>
            {treeData.map((node) => (
                <TreeNode key={node.name} node={node} onFileSelect={onFileSelect} />
            ))}
        </div>
    );
};
