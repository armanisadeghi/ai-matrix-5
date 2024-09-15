"use client";

import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

export const ImportedFiles: React.FC = () => {
    const [files, setFiles] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const importedFiles = JSON.parse(localStorage.getItem("importedFiles") || "{}");
        setFiles(importedFiles);
    }, []);

    const handleDelete = (fileName: string) => {
        const updatedFiles = { ...files };
        delete updatedFiles[fileName];
        setFiles(updatedFiles);
        localStorage.setItem("importedFiles", JSON.stringify(updatedFiles));
    };

    const handleView = (fileName: string, content: string) => {
        // You can implement a modal or a new page to display the file content
        console.log(`Viewing file: ${fileName}`);
        console.log(content);
        alert(`Content of ${fileName}:\n\n${content}`);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Imported Files</h2>
            {Object.entries(files).length === 0 ? (
                <p>No files imported yet.</p>
            ) : (
                <ul className="space-y-2">
                    {Object.entries(files).map(([fileName, content]) => (
                        <li key={fileName} className="flex items-center space-x-2">
                            <span>{fileName}</span>
                            <Button onClick={() => handleView(fileName, content)}>View</Button>
                            <Button onClick={() => handleDelete(fileName)} variant="destructive">
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
