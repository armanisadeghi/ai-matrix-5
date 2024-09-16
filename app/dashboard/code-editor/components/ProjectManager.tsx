import React, { useEffect, useState } from "react";
import { Paper, Title } from "@mantine/core";
import { indexedDBStore } from "../utils/indexedDB";
import { AddFileFolder } from "./AddFileFolder";
import { FileTree, buildTree } from "./FolderStructure";
import { IRepoData } from "./Workspace";

export const ProjectManager: React.FC<{ projectName: string }> = ({ projectName }) => {
    const [project, setProject] = useState<IRepoData | null>(null);

    useEffect(() => {
        loadProject();
    }, [projectName]);

    const loadProject = async () => {
        try {
            const loadedProject = await indexedDBStore.getRepository(projectName);
            setProject(loadedProject || null);
        } catch (error) {
            console.error("Error loading project:", error);
        }
    };

    const handleFileSelect = (path: string, content: string) => {
        // Handle file selection here
        console.log(`Selected file: ${path}`);
        console.log(`Content: ${content}`);
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <Paper p="md">
            <Title order={2}>{project.name}</Title>
            <AddFileFolder projectName={project.name} onAdd={loadProject} />
            <FileTree treeData={buildTree(project)} onFileSelect={handleFileSelect} />
        </Paper>
    );
};
