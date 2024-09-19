"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { ActionIconProps } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AddFileFolder, Editor, FileTree, Footer, buildTree } from "../../components";
import { IRepoData } from "../../types";
import {
    deleteGitHubRepo,
    getIconFromExtension,
    indexedDBStore,
    publishToGitHubRepo,
    updateGitHubRepo,
} from "../../utils";

import EditorLayout from "./EditorLayout";
import "./style.css";

export type IFile = {
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
    const [isPublishing, setIsPublishing] = useState(false);
    const router = useRouter();
    const { user, isLoading } = useUser();

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

    const treeData = buildTree(selectedRepo);

    /**
     *
     * @param repoName
     * @returns
     */
    const loadProject = async (repoName?: string) => {
        if (!repoName) return;
        console.log("renaming");
        try {
            const loadedProject = await indexedDBStore.getRepository(repoName);
            setSelectedRepo(loadedProject || null);
            setSelectedFile(null);
            setActiveFolder("");

            // Load opened files
            try {
                const openedFiles = await indexedDBStore.getOpenedFiles(repoName);
                const loadedOpenFiles = await Promise.all(
                    openedFiles.map(async (file) => {
                        try {
                            const fileData = await indexedDBStore.getFile(repoName, file.path);
                            return fileData ? { path: fileData.path, content: atob(fileData.content) } : null;
                        } catch (error) {
                            console.error(`Error loading file ${file.path}:`, error);
                            return null;
                        }
                    }),
                );
                setOpenFiles(loadedOpenFiles.filter((file): file is IFile => file !== null));
                setActiveFile(loadedOpenFiles.filter((file): file is IFile => file !== null)[0]);
                setSelectedFile(loadedOpenFiles.filter((file): file is IFile => file !== null)[0]);
            } catch (error) {
                console.error("Error loading opened files:", error);
                setOpenFiles([]);
            }
        } catch (error) {
            console.error("Error loading project:", error);
        }
    };

    /**
     *
     * @param path
     */
    const handleFileSelect = async (path: string) => {
        if (selectedRepo) {
            try {
                const file = await indexedDBStore.getFile(selectedRepo.name, path);
                if (file) {
                    const decodedFile = { path: file.path, content: atob(file.content) };
                    setSelectedFile(decodedFile);
                    const fileAlreadyOpen = openFiles.find((openFile) => openFile.path === path);
                    if (!fileAlreadyOpen) {
                        const newOpenFiles = [...openFiles, decodedFile];
                        setOpenFiles(newOpenFiles);
                        try {
                            await indexedDBStore.saveOpenedFiles(
                                selectedRepo.name,
                                newOpenFiles.map((f) => ({ repoName: selectedRepo.name, path: f.path })),
                            );
                        } catch (error) {
                            console.error("Error saving opened files:", error);
                        }
                    }
                    setActiveFile(decodedFile);
                }
            } catch (error) {
                console.error("Error loading file:", error);
            }
        }
    };

    /**
     *
     * @param path
     */
    const handleFolderSelect = (path: string) => {
        setActiveFolder(path);
    };

    //
    /**
     * Handle closing a tab
     * @param fileToClose
     */
    const handleCloseTab = async (fileToClose: IFile) => {
        const newOpenFiles = openFiles.filter((openFile) => openFile.path !== fileToClose.path);
        setOpenFiles(newOpenFiles);
        if (selectedRepo) {
            await indexedDBStore.saveOpenedFiles(
                selectedRepo.name,
                newOpenFiles.map((f) => ({ repoName: selectedRepo.name, path: f.path })),
            );
        }
        if (activeFile && activeFile.path === fileToClose.path) {
            const newActiveFile = newOpenFiles.length > 0 ? newOpenFiles[0] : null;
            setSelectedFile(newActiveFile);
            setActiveFile(newActiveFile);
        }
    };

    /**
     *
     */
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

    /**
     *
     */
    const handleRepoClose = () => {
        if (!confirm(`Are you sure you want to proceed closing this '${selectedRepo.name}' repository?`)) {
            return;
        }
        try {
            setSelectedRepo(null);
            setSelectedFile(null);
            setActiveFolder("");
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/code-editor`);
        } catch (error) {
            console.error("Error closing repository:", error);
        }
    };

    /**
     *
     * @param path
     * @param isFile
     */
    const handleAddFolderFile = async (path: string, isFile: boolean) => {
        if (selectedRepo) {
            await loadProject(selectedRepo.name);
            if (isFile) {
                handleFileSelect(path);
            }
        }
    };

    /**
     * publish local repo to github
     * @returns
     */
    const handlePushToGitHub = async () => {
        if (!selectedRepo || !fileSystem || !user) return;

        if (!confirm(`Are you sure you want to proceed pushing this '${selectedRepo.name}' repository to GitHub?`)) {
            return;
        }

        setIsPublishing(true);

        const REPO_NAME = selectedRepo.name; // Name of the repository to create
        const REPO_IS_PUBLISHED = selectedRepo?.githubUrl;

        try {
            if (REPO_IS_PUBLISHED) {
                await updateGitHubRepo(REPO_NAME);
            } else {
                await publishToGitHubRepo(REPO_NAME);
            }

            alert("Repository created and pushed to GitHub successfully!");
            setIsPublishing(false);
        } catch (error) {
            console.error("Error pushing to GitHub:", error);
            alert("Failed to push project to GitHub.");

            setIsPublishing(false);
        }
    };

    /**
     * delete repo from github
     * @returns
     */
    const handleDeleteFromGitHub = async () => {
        if (!selectedRepo || !fileSystem || !user) return;

        if (!confirm(`Are you sure you want to proceed deleting this '${selectedRepo.name}' repository from GitHub?`)) {
            return;
        }

        setIsPublishing(true);

        const REPO_NAME = selectedRepo.name; // Name of the repository to create

        try {
            await deleteGitHubRepo(REPO_NAME);

            setIsPublishing(false);
        } catch (error) {
            console.error("Error deleting to GitHub:", error);
            alert("Failed to delete project from GitHub.");

            setIsPublishing(false);
        }
    };

    const actionIconProps: ActionIconProps = {
        variant: "subtle",
    };

    if (!selectedRepo) {
        return <>select a repo to proceed</>;
    }

    const sidebarContent = (
        <>
            <AddFileFolder
                projectName={selectedRepo?.name || ""}
                activeFolder={activeFolder}
                onAdd={handleAddFolderFile}
                actionIconProps={actionIconProps}
            />
        </>
    );

    const fileTreeContent = (
        <>
            <FileTree
                activeFolder={activeFolder}
                onFileSelect={handleFileSelect}
                onFolderSelect={handleFolderSelect}
                onUpdate={() => {
                    loadProject(selectedRepo?.name || "");
                }}
                repoName={selectedRepo?.name || ""}
                treeData={treeData}
                selectedFile={selectedFile}
            />
        </>
    );

    return (
        <EditorLayout
            selectedRepo={selectedRepo}
            onRepoClose={handleRepoClose}
            onDeleteFromGitHub={handleDeleteFromGitHub}
            onPushToGitHub={handlePushToGitHub}
            isPublishing={isPublishing}
            sidebar={sidebarContent}
            fileTree={fileTreeContent}
        >
            {/* Editor area */}
            <div className="flex flex-col overflow-hidden py-2 pr-2 rounded">
                {/* Tabs */}
                <div className="flex gap-1 px-1 mb-2 overflow-x-auto rounded">
                    {openFiles.map((file, idx) => {
                        const FileIcon = getIconFromExtension(file.path ?? "");
                        return (
                            <div
                                key={idx}
                                className={`px-2 py-1 text-sm rounded text-white cursor-pointer flex items-center gap-2 hover:bg-neutral-700 ${selectedFile?.path === file?.path ? "bg-neutral-900 font-medium" : "bg-neutral-800 font-normal"}`}
                                onClick={() => setSelectedFile(file)}
                            >
                                <FileIcon size={16} />
                                <span>{file.path}</span>
                                <button
                                    className="ml-4 cursor-pointer text-rose-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCloseTab(file);
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Editor */}
                <div className="flex-grow overflow-hidden">
                    {selectedFile ? (
                        <Editor
                            repoName={selectedRepo.name}
                            filename={selectedFile.path}
                            value={selectedFile.content}
                            onChange={handleEditorChange}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-white rounded">
                            Select a file to edit
                        </div>
                    )}
                </div>
            </div>
            {/* Footer */}
            <div className="bg-neutral-800 overflow-auto rounded w-full">
                <Footer />
            </div>
        </EditorLayout>
    );
}
