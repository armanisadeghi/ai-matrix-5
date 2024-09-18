"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { ActionIcon, ActionIconProps } from "@mantine/core";
import {
    IconBell,
    IconBug,
    IconCloudUpload,
    IconFolder,
    IconInfoCircle,
    IconPlayerPlay,
    IconSettings,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AddFileFolder, Editor, FileTree, buildTree } from "../../components";
import { IRepoData } from "../../types";
import {
    deleteGitHubRepo,
    getIconFromExtension,
    indexedDBStore,
    publishToGitHubRepo,
    updateGitHubRepo,
} from "../../utils";

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

    const loadProject = async (repoName?: string) => {
        if (!repoName) return;
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

    /**
     * publish local repo to github
     * @returns
     */
    const handlePushToGitHub = async () => {
        if (!selectedRepo || !fileSystem || !user) return;

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

    /**
     *
     * @param repoName
     * @param oldPath
     * @param newPath
     * @param content
     */
    const handleFileUpdate = async (repoName: string, oldPath: string, newPath: string, content: string) => {
        try {
            await indexedDBStore.updateFile(repoName, oldPath, newPath, content);
            // Update your UI or state as needed
        } catch (error) {
            console.error("Error updating file:", error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    //
    /**
     * In your folder renaming component
     * @param repoName
     * @param oldPath
     * @param newPath
     */
    const handleFolderRename = async (repoName: string, oldPath: string, newPath: string) => {
        try {
            await indexedDBStore.updateFolder(repoName, oldPath, newPath);
            // Update your UI or state as needed
        } catch (error) {
            console.error("Error renaming folder:", error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    const actionIconProps: ActionIconProps = {
        variant: "subtle",
    };

    if (!selectedRepo) {
        return <>select a repo to proceed</>;
    }

    return (
        <div className="space-y-2 p-2 bg-neutral-900 rounded-md">
            <div className="flex justify-between px-3 py-1.5 rounded bg-neutral-800">
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
                    <ActionIcon onClick={handleDeleteFromGitHub} loading={isPublishing} {...actionIconProps}>
                        <IconTrash size={18} />
                    </ActionIcon>
                    <ActionIcon onClick={handlePushToGitHub} loading={isPublishing} {...actionIconProps}>
                        <IconCloudUpload size={18} />
                    </ActionIcon>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 min-h-screen">
                <div className="col-span-2 lg:col-span-2.5 p-2 rounded bg-neutral-800">
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
                        activeFolder={activeFolder}
                        onFileSelect={handleFileSelect}
                        onFolderSelect={handleFolderSelect}
                        onUpdate={loadProject}
                        repoName={selectedRepo.name}
                        treeData={treeData}
                    />
                </div>
                <div className="col-span-10 lg:col-span-9.5">
                    <div className="flex flex-col grow">
                        {/* Tabs */}
                        <div className="flex gap-1">
                            {openFiles.map((file, idx) => {
                                const FileIcon = getIconFromExtension(file.path ?? "");

                                return (
                                    <div
                                        key={idx}
                                        className={`px-2 py-1 text-sm rounded text-white cursor-pointer flex items-center gap-2 hover:bg-neutral-700 ${selectedFile === file ? "bg-neutral-700 font-medium" : "bg-neutral-900 font-normal"}`}
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
                        <div className="grow rounded bg-neutral-800 mt-2">
                            {selectedFile && (
                                <>
                                    <p className="text-xs font-semibold m-2">{selectedFile.path}</p>
                                    <Editor
                                        repoName={selectedRepo.name}
                                        filename={selectedFile.path}
                                        value={selectedFile.content}
                                        onChange={handleEditorChange}
                                    />
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
