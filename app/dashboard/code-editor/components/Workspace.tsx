"use client";

import React, { useState, useEffect } from "react";
import { indexedDBStore } from "../utils/indexedDB";
import { Button } from "@mantine/core";
import { FileTree } from "./RepositoryStructure";

interface RepoData {
    name: string;
    files: { [path: string]: string };
}

export const Workspace: React.FC = () => {
    const [repositories, setRepositories] = useState<RepoData[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
    const [selectedFile, setSelectedFile] = useState<{ path: string; content: string } | null>(null);

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
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Workspace</h2>
            <div className="flex">
                <div className="w-1/3 pr-4">
                    <h3 className="text-xl font-semibold mb-2">Cloned Repositories</h3>
                    {repositories.map((repo) => (
                        <div key={repo.name} className="flex items-center justify-between mb-2">
                            <Button onClick={() => handleRepoSelect(repo.name)} variant="ghost">
                                {repo.name}
                            </Button>
                            <Button onClick={() => handleDeleteRepo(repo.name)} variant="destructive" size="sm">
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="w-2/3">
                    {selectedRepo && (
                        <>
                            <h3 className="text-xl font-semibold mb-2">Repository: {selectedRepo.name}</h3>
                            <FileTree files={selectedRepo.files} onFileSelect={handleFileSelect} />
                        </>
                    )}
                </div>
            </div>
            {selectedFile && (
                <div>
                    <h3 className="text-xl font-semibold mb-2">File: {selectedFile.path}</h3>
                    <pre className="bg-gray-100 p-4 rounded">{selectedFile.content}</pre>
                </div>
            )}
        </div>
    );
};
