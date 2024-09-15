"use client";

import { Button, Input, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

type GitHubImportProps = {
    onImportSuccess: (owner: string, repo: string) => void;
};

export const GitHubImport: React.FC<GitHubImportProps> = ({ onImportSuccess }) => {
    const [importType, setImportType] = useState<"project" | "url" | string>("project");
    const [projectList, setProjectList] = useState<string[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [repoUrl, setRepoUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (importType === "project") {
            fetchProjects();
        }
    }, [importType]);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/github/user/repos");
            setProjectList(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            alert("Failed to fetch projects. Please check your GitHub authentication.");
        }
        setIsLoading(false);
    };

    const handleImport = async () => {
        setIsLoading(true);
        try {
            if (importType === "project") {
                if (!selectedProject) {
                    throw new Error("Please select a project");
                }
                const [owner, repo] = selectedProject.split("/");
                onImportSuccess(owner, repo);
            } else {
                if (!repoUrl) {
                    throw new Error("Please enter a valid repository URL");
                }
                const urlParts = repoUrl.split("/");
                const owner = urlParts[urlParts.length - 2];
                const repo = urlParts[urlParts.length - 1].replace(".git", "");
                onImportSuccess(owner, repo);
            }
        } catch (error) {
            console.error("Error importing:", error);
            alert(error.message || "Failed to import. Please try again.");
        }
        setIsLoading(false);
    };

    console.log({ importType });
    console.log({ projectList });

    return (
        <div className="space-y-4">
            <Select
                value={importType}
                onChange={setImportType}
                data={[
                    { value: "project", label: "Import from My Projects" },
                    { value: "url", label: "Import from URL" },
                ]}
            />

            {importType === "project" ? (
                <Select
                    value={selectedProject}
                    onChange={setSelectedProject}
                    placeholder="Select a project"
                    data={projectList.map((project) => project)}
                />
            ) : (
                <Input
                    type="text"
                    placeholder="Enter repository URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                />
            )}

            <Button onClick={handleImport} loading={isLoading}>
                {isLoading ? "Importing..." : "Import"}
            </Button>
        </div>
    );
};
