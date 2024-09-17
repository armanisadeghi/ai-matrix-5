import { Button, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { octokit, indexedDBStore } from "../../utils";
import { RepoCard } from "./RepoCard";

export type IRepository = {
    id: number;
    name: string;
    full_name: string;
};

export const GitHubImport = ({ onRepoCloned }: { onRepoCloned: (files: any) => void }) => {
    const [repositories, setRepositories] = useState<IRepository[]>([]);
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

    const cloneRepository = async (repoName: string) => {
        if (!repoName) {
            alert("Please select a repository");
            return;
        }

        if (!confirm(`Are you sure you want to proceed cloning '${repoName}' repository?`)) {
            return;
        }

        setIsLoading(true);
        try {
            const [owner, repo] = repoName.split("/");
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

            <input type="text" placeholder="search repositories" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repositories.map((repo) => (
                    <RepoCard
                        key={repo.name + repo.full_name}
                        repo={repo}
                        handleCloneRepo={cloneRepository}
                        loading={isLoading}
                    />
                ))}
            </div>

            <Button
                onClick={() => {
                    cloneRepository("");
                }}
                disabled={isLoading || !selectedRepo}
                loading={isLoading}
            >
                {isLoading ? "Cloning..." : "Clone Repository"}
            </Button>
        </div>
    );
};
