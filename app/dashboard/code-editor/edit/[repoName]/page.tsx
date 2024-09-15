"use client";

import { Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import { Editor, FileTree, type IRepoData, buildTree } from "../../components";
import { indexedDBStore } from "../../utils/indexedDB";
import { IFileSystemNode } from "../../types";

type IFile = {
    path: string;
    content: string;
};

export default function Page({ params }: { params: { repoName: string } }) {
    const [selectedRepo, setSelectedRepo] = useState<IRepoData | null>(null);
    const [selectedFile, setSelectedFile] = useState<IFile | null>(null);
    const [fileSystem, setFileSystem] = useState<IFile[] | null>([]);
    const [openFiles, setOpenFiles] = useState<IFile[]>([]); // Opened files in tabs
    const [activeFile, setActiveFile] = useState<IFile | null>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            if (params.repoName) {
                const repoName = decodeURIComponent(params.repoName);
                const repo = await indexedDBStore.getRepository(repoName);
                setSelectedRepo(repo || null);
                setSelectedFile(null);
            }
        };

        fetchData();

        return () => {
            //
        };
    }, [params.repoName]);

    const handleFileSelect = async (path: string) => {
        if (selectedRepo) {
            try {
                const file = await indexedDBStore.getFile(selectedRepo.name, path);
                if (file) {
                    setSelectedFile({ path: file.path, content: atob(file.content) });
                    const fileAlreadyOpen = openFiles.find((openFile) => openFile.path === path);
                    if (!fileAlreadyOpen) {
                        setOpenFiles([...openFiles, file]);
                    }
                    setActiveFile(file); // Set as active file for editing
                }
            } catch (error) {
                console.error("Error loading file:", error);
            }
        }
    };

    // Handle closing a tab
    const handleCloseTab = (fileToClose: IFile) => {
        setOpenFiles(openFiles.filter((openFile) => openFile.path !== fileToClose.path));
        if (activeFile === fileToClose) {
            setActiveFile(openFiles.length > 1 ? openFiles[0] : null); // Set new active file after closing
        }
    };

    const handleEditorChange = (newValue: string) => {
        if (selectedFile) {
            selectedFile.content = newValue;
            setFileSystem([...fileSystem]); // Trigger state update
        }
    };

    const treeData = buildTree(selectedRepo);

    return (
        <div className="space-y-4">
            <Grid>
                <Grid.Col span={3}>
                    {selectedRepo && (
                        <>
                            <h3 className="text-xl font-semibold mb-2">Repository: {selectedRepo.name}</h3>
                            <FileTree treeData={treeData} onFileSelect={handleFileSelect} />
                        </>
                    )}
                </Grid.Col>
                <Grid.Col span={9}>
                    <div style={{ flexGrow: 1, padding: "10px", display: "flex", flexDirection: "column" }}>
                        {/* Tabs */}
                        <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
                            {openFiles.map((file, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                        backgroundColor: activeFile === file ? "#f0f0f0" : "#fff",
                                        borderRight: "1px solid #ddd",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    onClick={() => setActiveFile(file)}
                                >
                                    {file.path}
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCloseTab(file);
                                        }}
                                        style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                            color: "red",
                                        }}
                                    >
                                        &times;
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* Editor */}
                        <div style={{ flexGrow: 1 }}>
                            {selectedFile && (
                                <>
                                    <h3 className="text-xl font-semibold mb-2">File: {selectedFile.path}</h3>
                                    <Editor value={selectedFile.content} onChange={handleEditorChange} />
                                </>
                            )}

                            {!selectedFile && <div>Select a file to edit</div>}
                        </div>
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    );
}
