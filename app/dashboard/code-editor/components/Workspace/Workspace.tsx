"use client";

import { useDisclosure } from "@mantine/hooks";
import { IconFolderPlus, IconReload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IRepoData } from "../../types";
import { indexedDBStore } from "../../utils";
import { Button } from "../Buttons";
import { NewProjectDrawer } from "../NewProjectDrawer";
import { ProjectCard } from "./ProjectCard";

const store = indexedDBStore;

export const Workspace: React.FC = () => {
    const [repositories, setRepositories] = useState<IRepoData[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<IRepoData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();

    // let syncManagerInstance = null; // Declare this variable outside the useEffect

    /*    // start supabase sync
    useEffect(() => {
        const setupAndStartSync = async () => {
            try {
                // Initialize the sync manager
                syncManagerInstance = await setupSyncManager();

                // Assume setupSyncManager returns an instance setup correctly for use
                syncManagerInstance.startPeriodicSync();
                console.log("Periodic sync started");

                // Cleanup function to stop the sync
                return () => {
                    if (syncManagerInstance) {
                        syncManagerInstance.stopPeriodicSync();
                        console.log("Periodic sync stopped");
                    }
                };
            } catch (error) {
                console.error("Failed to setup SyncManager:", error);
            }
        };

        // Declare a variable to store the cleanup function
        let executeCleanup: (() => void) | undefined;

        (async () => {
            executeCleanup = await setupAndStartSync();
        })();

        return () => {
            if (executeCleanup) {
                executeCleanup();
            }
        };
    }, []);*/

    useEffect(() => {
        loadRepositories();
    }, []);

    const loadRepositories = async () => {
        try {
            setIsLoading(true);
            const repos = await store.getRepositories();
            setRepositories(repos);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading repositories:", error);
            setIsLoading(false);
        }
    };

    console.log({ repositories });

    const handleRepoSelect = async (repoName: string) => {
        try {
            const repo = await store.getRepository(repoName);
            setSelectedRepo(repo || null);
            router.push(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/code-editor/workspace/${encodeURIComponent(repoName)}`,
            );
        } catch (error) {
            console.error("Error loading repository:", error);
        }
    };

    const handleDeleteRepo = async (repoName: string) => {
        try {
            await store.deleteRepository(repoName);
            loadRepositories();
            if (selectedRepo && selectedRepo.name === repoName) {
                setSelectedRepo(null);
            }
        } catch (error) {
            console.error("Error deleting repository:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2 items-center">
                <IconReload />
                <p className="text-md">loading</p>
            </div>
        );
    }

    if (!repositories || repositories.length === 0) {
        return (
            <>
                <div className="px-4 py-8 flex flex-col items-center gap-4 border border-neutral-700 rounded">
                    <IconFolderPlus size={48} />
                    <p className="text-2xl font-normal">No recent files added.</p>
                    <Button onClick={open} leftSection={<IconFolderPlus size={16} />} variant="primary">
                        New project
                    </Button>
                </div>
                <NewProjectDrawer onClose={close} opened={opened} onProjectCreated={loadRepositories} />
            </>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-700">
                <h2 className="text-xl font-semibold capitalize">recent files</h2>
                <div className="flex gap-2 items-center">
                    <Button onClick={open} leftSection={<IconFolderPlus size={16} />} variant="primary">
                        New project
                    </Button>
                    <Button onClick={loadRepositories} leftSection={<IconReload size={16} />} variant="subtle">
                        Refresh
                    </Button>
                </div>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {repositories.map((repo) => (
                        <ProjectCard
                            key={repo.name}
                            repo={repo}
                            handleDelete={handleDeleteRepo}
                            handleSelect={handleRepoSelect}
                        />
                    ))}
                </div>
            </div>
            <NewProjectDrawer onClose={close} opened={opened} onProjectCreated={loadRepositories} />
        </>
    );
};
