import { Button } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { getOctokit, indexedDBStore } from "../../utils";
import { RepoCard } from "./RepoCard";
import { IRepoData } from "../../types";
import { TextInput } from "../Inputs";

export type IRepository = {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
};

export const GitHubImport = ({ onRepoCloned }: { onRepoCloned: (repo: IRepoData) => void }) => {
    const [repositories, setRepositories] = useState<IRepository[]>([]);
    const [filteredRepositories, setFilteredRepositories] = useState<IRepository[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkGitHubAuth();
    }, []);

    const checkGitHubAuth = async () => {
        try {
            const response = await fetch("/api/auth/github-status");
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
            if (data.isAuthenticated) {
                await fetchRepositories();
            }
        } catch (error) {
            console.error("Error checking GitHub auth status:", error);
        }
    };

    const handleGitHubLogin = () => {
        window.location.href = "/api/auth/github";
    };

    const fetchRepositories = async () => {
        setIsLoading(true);
        try {
            const octokit = await getOctokit();
            const response = await octokit.repos.listForAuthenticatedUser();
            setRepositories(
                response.data.map((repo) => ({
                    id: repo.id,
                    name: repo.name,
                    full_name: repo.full_name,
                    html_url: repo.html_url,
                })),
            );
        } catch (error) {
            console.error("Error fetching repositories:", error);
            alert("Failed to fetch repositories. Please check your GitHub token.");
        }
        setIsLoading(false);
    };

    const handleCloneRepository = async (repository: IRepository) => {
        if (!repository.name) {
            alert("Please select a repository");
            return;
        }

        if (!confirm(`Are you sure you want to proceed cloning '${repository.name}' repository?`)) {
            return;
        }

        setIsLoading(true);
        try {
            const [owner, repo] = repository.full_name.split("/");
            const octokit = await getOctokit();
            const files = await fetchAllFiles(octokit, owner, repo);
            await indexedDBStore.addRepository({ name: repository.name, files, githubUrl: repository.html_url });
            onRepoCloned({ name: repository.name, files, githubUrl: repository.html_url });
        } catch (error) {
            console.error("Error cloning repository:", error);
            alert("Failed to clone repository. Please try again.");
        }
        setIsLoading(false);
    };

    const fetchAllFiles = async (octokit: any, owner: string, repo: string, path: string = ""): Promise<any> => {
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
                    const subFiles = await fetchAllFiles(octokit, owner, repo, item.path);
                    Object.assign(files, subFiles);
                }
            }
            return files;
        } else {
            return { [path]: (response.data as any).content };
        }
    };

    const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
        const value = evt.currentTarget.value.toLowerCase();
        const filtered = repositories.filter(
            (repo) => repo.name.toLowerCase().includes(value) || repo.full_name.toLowerCase().includes(value),
        );
        setSearchText(value);
        setFilteredRepositories(filtered);
    };

    return (
        <div className="space-y-4">
            <p className="text-xl font-semibold mb-2">Import project from GitHub</p>

            {!isAuthenticated ? (
                <Button onClick={handleGitHubLogin} loading={isLoading}>
                    {isLoading ? "Logging in..." : "Login with GitHub"}
                </Button>
            ) : (
                <>
                    <TextInput
                        type="text"
                        placeholder="Search repositories"
                        value={searchText}
                        onChange={handleSearchInput}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(searchText ? filteredRepositories : repositories).map((repo) => (
                            <RepoCard
                                key={repo.id}
                                repo={repo}
                                handleCloneRepo={handleCloneRepository}
                                loading={isLoading}
                            />
                        ))}
                    </div>

                    <Button onClick={fetchRepositories} loading={isLoading}>
                        {isLoading ? "Refreshing..." : "Refresh Repositories"}
                    </Button>
                </>
            )}
        </div>
    );
};
