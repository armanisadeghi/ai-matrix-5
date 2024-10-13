"use client";

import React, { useEffect, useState } from "react";
import {
    connectSocket,
    createProject,
    listTemplates,
    onProjectCreationComplete,
    onProjectCreationError,
    onProjectCreationProgress,
} from "../utils";
import { TextInput } from "app/dashboard/code-editor-2/components/inputs";
import { Button } from "app/dashboard/code-editor-2/components/buttons";

type ProjectCreatorProps = {
    onRefresh: () => Promise<void>;
};

export const ProjectCreator: React.FC<ProjectCreatorProps> = ({ onRefresh }) => {
    const [projectName, setProjectName] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [creationStatus, setCreationStatus] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [isBlankProject, setIsBlankProject] = useState(false);
    const [templates, setTemplates] = useState<string[]>([]);

    useEffect(() => {
        const socket = connectSocket();

        const progressHandler = (data: { message: string }) => {
            console.log("Progress:", data.message);
            setCreationStatus(data.message);
        };

        const completeHandler = (data: { message: string }) => {
            console.log("Complete:", data.message);
            setCreationStatus(data.message);
            setIsCreating(false);
        };

        const errorHandler = (data: { message: string }) => {
            console.error("Error:", data.message);
            setCreationStatus(`Error: ${data.message}`);
            setIsCreating(false);
        };

        onProjectCreationProgress(progressHandler);
        onProjectCreationComplete(completeHandler);
        onProjectCreationError(errorHandler);

        return () => {
            socket.off("projectCreationProgress", progressHandler);
            socket.off("projectCreationComplete", completeHandler);
            socket.off("projectCreationError", errorHandler);
        };
    }, []);

    useEffect(() => {
        const fetchTemplates = async () => {
            const fetchedTemplates = await listTemplates();
            setTemplates(fetchedTemplates);
            if (fetchedTemplates.length > 0) {
                setTemplateName(fetchedTemplates[0]);
            }
        };
        void fetchTemplates();
    }, []);

    const handleCreateProject = async () => {
        setIsCreating(true);
        setCreationStatus("Initiating project creation...");
        try {
            await createProject(projectName, isBlankProject ? undefined : templateName);

            await onRefresh();
        } catch (error) {
            console.error("Error creating project:", error);
            setCreationStatus("Error creating project. Please try again.");
            setIsCreating(false);
        }
    };

    return (
        <div>
            <TextInput
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
            />
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isBlankProject}
                        onChange={(e) => setIsBlankProject(e.target.checked)}
                    />
                    Create blank project
                </label>
            </div>
            {!isBlankProject && (
                <select value={templateName} onChange={(e) => setTemplateName(e.target.value)} required>
                    {templates.map((template) => (
                        <option key={template} value={template}>
                            {template}
                        </option>
                    ))}
                </select>
            )}
            <Button
                onClick={handleCreateProject}
                disabled={isCreating || !projectName || (!isBlankProject && !templateName)}
            >
                Create Project
            </Button>
            {creationStatus && <p>{creationStatus}</p>}
        </div>
    );
};
