"use client";

import { ActionIcon, ActionIconProps } from "@mantine/core";
import {
    IconBell,
    IconBug,
    IconFolder,
    IconInfoCircle,
    IconPlayerPlay,
    IconSettings,
    IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AddFileFolder, Editor, FileTree, type IRepoData, buildTree } from "../../components";
import { indexedDBStore } from "../../utils/indexedDB";

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
    const [activeFolder, setActiveFolder] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            if (params?.repoName) {
                const repoName = decodeURIComponent(params.repoName);
                loadProject(repoName);
            }
        };

        fetchData();

        return () => {
            //
        };
    }, [params?.repoName]);

    const loadProject = async (repoName: string) => {
        try {
            const loadedProject = await indexedDBStore.getRepository(repoName);
            setSelectedRepo(loadedProject || null);
            setSelectedFile(null);
            setActiveFolder("");
        } catch (error) {
            console.error("Error loading project:", error);
        }
    };

    const handleFileSelect = async (path: string) => {
        if (selectedRepo) {
            try {
                const file = await indexedDBStore.getFile(selectedRepo.name, path);
                if (file) {
                    const decodedFile = { path: file.path, content: atob(file.content) };
                    setSelectedFile(decodedFile);
                    const fileAlreadyOpen = openFiles.find((openFile) => openFile.path === path);
                    if (!fileAlreadyOpen) {
                        setOpenFiles([...openFiles, decodedFile]);
                    }
                    setActiveFile(decodedFile); // Set as active file for editing
                }
            } catch (error) {
                console.error("Error loading file:", error);
            }
        }
    };

    const handleFolderSelect = (path: string) => {
        setActiveFolder(path);
    };

    // Handle closing a tab
    const handleCloseTab = (fileToClose: IFile) => {
        setOpenFiles(openFiles.filter((openFile) => openFile.path !== fileToClose.path));
        if (activeFile && activeFile.path === fileToClose.path) {
            const newActiveFile = openFiles.length > 1 ? openFiles[0] : null;
            setSelectedFile(newActiveFile);
            setActiveFile(newActiveFile);
        }
    };

    const handleEditorChange = (newValue: string) => {
        if (selectedFile) {
            const updatedFile = { ...selectedFile, content: newValue };
            setSelectedFile(updatedFile);
            setActiveFile(updatedFile);
            setOpenFiles(openFiles.map((file) => (file.path === updatedFile.path ? updatedFile : file)));
            setFileSystem((prevFileSystem) =>
                prevFileSystem
                    ? prevFileSystem.map((file) => (file.path === updatedFile.path ? updatedFile : file))
                    : null,
            );
        }
    };

    const treeData = buildTree(selectedRepo);

    const handleRepoClose = () => {
        try {
            setSelectedRepo(null);
            setSelectedFile(null);
            setActiveFolder("");
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/code-editor`);
        } catch (error) {
            console.error("Error closing repository:", error);
        }
    };

    const handleAddFolderFile = async (path: string, isFile: boolean) => {
        if (selectedRepo) {
            await loadProject(selectedRepo.name);
            if (isFile) {
                handleFileSelect(path);
            }
        }
    };

    const actionIconProps: ActionIconProps = {
        variant: "subtle",
    };

    if (!selectedRepo) {
        return <>select a repo to proceed</>;
    }

    return (
        <div className="space-y-2 bg-neutral-900 rounded-md">
            <div className="flex justify-between px-3 py-1.5">
                <p className="text-md font-semibold">Repository: {selectedRepo?.name}</p>
                <div className="flex gap-2">
                    <ActionIcon {...actionIconProps}>
                        <IconBell size={18} />
                    </ActionIcon>
                    <ActionIcon {...actionIconProps}>
                        <IconInfoCircle size={18} />
                    </ActionIcon>
                    <ActionIcon onClick={handleRepoClose} {...actionIconProps}>
                        <IconX size={18} />
                    </ActionIcon>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 min-h-screen">
                <div className="col-span-2 lg:col-span-2.5 rounded-md p-2 border border-white">
                    <div className="flex justify-between border-b border-white">
                        <ActionIcon {...actionIconProps}>
                            <IconFolder size={18} />
                        </ActionIcon>
                        <ActionIcon {...actionIconProps}>
                            <IconPlayerPlay size={18} />
                        </ActionIcon>
                        <ActionIcon {...actionIconProps}>
                            <IconBug size={18} />
                        </ActionIcon>
                        <ActionIcon {...actionIconProps}>
                            <IconSettings size={18} />
                        </ActionIcon>
                        <AddFileFolder
                            projectName={selectedRepo.name}
                            activeFolder={activeFolder}
                            onAdd={handleAddFolderFile}
                            actionIconProps={actionIconProps}
                        />
                    </div>
                    <FileTree
                        treeData={treeData}
                        onFileSelect={handleFileSelect}
                        onFolderSelect={handleFolderSelect}
                        activeFolder={activeFolder}
                    />
                </div>
                <div className="col-span-10 lg:col-span-9.5">
                    <div style={{ flexGrow: 1, padding: "10px", display: "flex", flexDirection: "column" }}>
                        {/* Tabs */}
                        <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
                            {openFiles.map((file, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                        backgroundColor: selectedFile === file ? "#f0f0f0" : "#fff",
                                        borderRight: "1px solid #ddd",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    onClick={() => setSelectedFile(file)}
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
                </div>
            </div>
        </div>
    );
}
