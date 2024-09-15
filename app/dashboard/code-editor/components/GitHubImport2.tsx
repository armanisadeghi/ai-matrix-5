import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import { Button, Select } from "@mantine/core";
import { indexedDBStore } from "../utils/indexedDB";

interface Repository {
    id: number;
    name: string;
    full_name: string;
}

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });

export const GitHubImport2 = ({ onRepoCloned }: { onRepoCloned: (files: any) => void }) => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchRepositories();
    }, []);

    const fetchRepositories = async () => {
        setIsLoading(true);
        try {
            const response = await octokit.repos.listForAuthenticatedUser();
            setRepositories(
                response.data.map((repo) => ({
                    id: repo.id,
                    name: repo.name,
                    full_name: repo.full_name,
                })),
            );
        } catch (error) {
            console.error("Error fetching repositories:", error);
            alert("Failed to fetch repositories. Please check your GitHub token.");
        }
        setIsLoading(false);
    };

    const cloneRepository = async () => {
        if (!selectedRepo) {
            alert("Please select a repository");
            return;
        }

        setIsLoading(true);
        try {
            const [owner, repo] = selectedRepo.split("/");
            const files = await fetchAllFiles(owner, repo);
            await indexedDBStore.addRepository({ name: selectedRepo, files });
            onRepoCloned(files);
        } catch (error) {
            console.error("Error cloning repository:", error);
            alert("Failed to clone repository. Please try again.");
        }
        setIsLoading(false);
    };

    const fetchAllFiles = async (owner: string, repo: string, path: string = ""): Promise<any> => {
        const response = await octokit.repos.getContent({
            owner,
            repo,
            path,
        });

        if (Array.isArray(response.data)) {
            const files: any = {};
            for (const item of response.data) {
                if (item.type === "file") {
                    const content = await octokit.repos.getContent({
                        owner,
                        repo,
                        path: item.path,
                    });
                    files[item.path] = (content.data as any).content;
                } else if (item.type === "dir") {
                    const subFiles = await fetchAllFiles(owner, repo, item.path);
                    Object.assign(files, subFiles);
                }
            }
            return files;
        } else {
            return { [path]: (response.data as any).content };
        }
    };

    return (
        <div className="space-y-4">
            <Select
                value={selectedRepo}
                onChange={setSelectedRepo}
                placeholder="Select a repository"
                data={repositories.map((repo) => ({ label: repo.name, value: repo.full_name }))}
            />

            <Button onClick={cloneRepository} disabled={isLoading || !selectedRepo} loading={isLoading}>
                {isLoading ? "Cloning..." : "Clone Repository"}
            </Button>
        </div>
    );
};
