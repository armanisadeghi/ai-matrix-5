"use client";

import React, { ChangeEvent, useState } from "react";

export type File = {
    name: string;
    content: string;
};

type FileExplorerProps = {
    files: File[];
    onFileSelect: (fileName: string) => void;
    onFileDelete: (fileName: string) => void;
    onCreateNewFile: (fileName: string) => void;
};

export const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect, onFileDelete, onCreateNewFile }) => {
    const [newFileName, setNewFileName] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewFileName(e.target.value);
    };

    return (
        <div className="file-explorer">
            <h3>File Explorer</h3>
            <ul>
                {files.map((file) => (
                    <li key={file.name}>
                        <span onClick={() => onFileSelect(file.name)}>{file.name}</span>
                        <button onClick={() => onFileDelete(file.name)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="New file name"
                />
                <button
                    onClick={() => {
                        onCreateNewFile(newFileName);
                        setNewFileName("");
                    }}
                >
                    Create File
                </button>
            </div>
        </div>
    );
};
