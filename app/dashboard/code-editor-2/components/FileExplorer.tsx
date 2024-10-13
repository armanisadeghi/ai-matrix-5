"use client";

import React, { useEffect, useState } from "react";
import { listFiles, readFile, writeFile } from "../utils/api";

interface Props {
    projectName: string;
}

export const FileExplorer: React.FC<Props> = ({ projectName }) => {
    const [files, setFiles] = useState<{ name: string; isDirectory: boolean }[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string>("");

    useEffect(() => {
        const fetchFiles = async () => {
            const fetchedFiles = await listFiles(projectName);
            setFiles(fetchedFiles);
        };
        fetchFiles();
    }, [projectName]);

    const handleFileClick = async (fileName: string) => {
        setSelectedFile(fileName);
        const content = await readFile(projectName, fileName);
        setFileContent(content);
    };

    const handleSave = async () => {
        if (selectedFile) {
            await writeFile(projectName, selectedFile, fileContent);
            alert("File saved successfully!");
        }
    };

    return (
        <div>
            <div>
                {files.map((file) => (
                    <div key={file.name} onClick={() => !file.isDirectory && handleFileClick(file.name)}>
                        {file.name} {file.isDirectory ? "(Directory)" : ""}
                    </div>
                ))}
            </div>
            {selectedFile && (
                <div>
                    <h3>{selectedFile}</h3>
                    <textarea
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        rows={20}
                        cols={80}
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
};
