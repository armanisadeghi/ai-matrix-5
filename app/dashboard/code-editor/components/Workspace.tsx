"use client";

import { ActionIcon, Button, Flex, Menu, Paper, Text, ThemeIcon } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconFolder, IconTrash } from "@tabler/icons-react";
import { indexedDBStore } from "../utils/indexedDB";
import { NewProjectDrawer } from "./NewProjectDrawer";
import { FileTree } from "./RepositoryStructure";

export interface IRepoData {
    name: string;
    files: { [path: string]: string };
}

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
            router.push(`http://localhost:3000/dashboard/code-editor/edit/${encodeURIComponent(repoName)}`);
        } catch (error) {
            console.error("Error loading repository:", error);
        }
    };

    const handleFileSelect = async (path: string) => {
        if (selectedRepo) {
            try {
                const file = await indexedDBStore.getFile(selectedRepo.name, path);
                if (file) {
                    setSelectedFile({ path: file.path, content: atob(file.content) });
                }
            } catch (error) {
                console.error("Error loading file:", error);
            }
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
                <div className="flex">
                    {repositories.map((repo) => (
                        <div key={repo.name} className="flex items-center justify-between mb-2">
                            <Paper withBorder p="sm">
                                <Flex justify="space-between" align="center" mb="sm">
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
                                </Flex>
                                <Text component="button" fz="sm" onClick={() => handleRepoSelect(repo.name)}>
                                    {repo.name}
                                </Text>
                            </Paper>
                        </div>
                    ))}
                </div>
            </div>
            <NewProjectDrawer onClose={close} opened={opened} />
        </>
    );
};
