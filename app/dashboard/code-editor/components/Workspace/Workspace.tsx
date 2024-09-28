import { useDisclosure } from "@mantine/hooks";
import { IconFolderPlus, IconReload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IRepoData } from "../../types";
import { indexedDBStore } from "../../utils";
import { Button } from "../Buttons";
import { NewProjectDrawer } from "../NewProjectDrawer";
import { ProjectCard } from "./ProjectCard";

export const Workspace: React.FC = () => {
    const [repositories, setRepositories] = useState<IRepoData[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<IRepoData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();

    useEffect(() => {
        loadRepositories();
    }, []);

    const loadRepositories = async () => {
        try {
            setIsLoading(true);
            const repos = await indexedDBStore.getRepositories();
            setRepositories(repos);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading repositories:", error);
            setIsLoading(false);
        }
    };

    const handleRepoSelect = async (repoName: string) => {
        try {
            const repo = await indexedDBStore.getRepository(repoName);
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
            await indexedDBStore.deleteRepository(repoName);
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
