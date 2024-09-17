import { ActionIcon, Button, Menu, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconFolder, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IRepoData } from "../types";
import { indexedDBStore } from "../utils";
import { NewProjectDrawer } from "./NewProjectDrawer";

export const Workspace: React.FC = () => {
    const [repositories, setRepositories] = useState<IRepoData[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<IRepoData | null>(null);
    const [selectedFile, setSelectedFile] = useState<{ path: string; content: string } | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();

    useEffect(() => {
        loadRepositories();
    }, []);

    const loadRepositories = async () => {
        try {
            const repos = await indexedDBStore.getRepositories();
            setRepositories(repos);
        } catch (error) {
            console.error("Error loading repositories:", error);
        }
    };

    const handleRepoSelect = async (repoName: string) => {
        try {
            const repo = await indexedDBStore.getRepository(repoName);
            setSelectedRepo(repo || null);
            setSelectedFile(null);
            router.push(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/code-editor/edit/${encodeURIComponent(repoName)}`,
            );
        } catch (error) {
            console.error("Error loading repository:", error);
        }
    };

    const handleDeleteRepo = async (repoName: string) => {
        try {
            await indexedDBStore.deleteRepository(repoName);
            loadRepositories();
            if (selectedRepo && selectedRepo.name === repoName) {
                setSelectedRepo(null);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error("Error deleting repository:", error);
        }
    };

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold capitalize mb-4">recent files</h2>
                <Button onClick={open}>New project</Button>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {repositories.map((repo) => (
                        <div
                            key={repo.name}
                            className="flex items-center justify-between p-4 border border-neutral-400 rounded-md"
                        >
                            <div className="flex flex-col gap-2 items-start w-full">
                                <div className="flex justify-between items-center w-full">
                                    <ThemeIcon variant="transparent" size="xl">
                                        <IconFolder />
                                    </ThemeIcon>
                                    <Menu shadow="md" width={200}>
                                        <Menu.Target>
                                            <ActionIcon variant="subtle">
                                                <IconDotsVertical size={16} />
                                            </ActionIcon>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <Menu.Item
                                                leftSection={<IconTrash size={16} />}
                                                onClick={() => handleDeleteRepo(repo.name)}
                                            >
                                                Delete
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </div>
                                <Text component="button" fz="sm" onClick={() => handleRepoSelect(repo.name)}>
                                    {repo.name}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <NewProjectDrawer onClose={close} opened={opened} onProjectCreated={loadRepositories} />
        </>
    );
};
