"use client";

import { Button } from "@mantine/core";
import React, { useState } from "react";

interface FileTreeProps {
    files: any;
    onFileSelect: (path: string, content: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ files, onFileSelect }) => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = (path: string) => {
        const newExpandedFolders = new Set(expandedFolders);
        if (newExpandedFolders.has(path)) {
            newExpandedFolders.delete(path);
        } else {
            newExpandedFolders.add(path);
        }
        setExpandedFolders(newExpandedFolders);
    };

    const renderFileTree = (fileObj: any, path: string = "") => {
        return Object.entries(fileObj).map(([key, value]) => {
            const fullPath = path ? `${path}/${key}` : key;
            if (typeof value === "object") {
                // It's a folder
                return (
                    <div key={fullPath}>
                        <Button onClick={() => toggleFolder(fullPath)} className="text-left w-full">
                            {expandedFolders.has(fullPath) ? "📂 " : "📁 "}
                            {key}
                        </Button>
                        {expandedFolders.has(fullPath) && <div className="ml-4">{renderFileTree(value, fullPath)}</div>}
                    </div>
                );
            } else {
                // It's a file
                return (
                    <div key={fullPath}>
                        <Button
                            onClick={() => onFileSelect(fullPath, atob(value as string))}
                            className="text-left w-full"
                        >
                            📄 {key}
                        </Button>
                    </div>
                );
            }
        });
    };

    return <div>{renderFileTree(files)}</div>;
};
