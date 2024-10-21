"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DrawerProps, Modal } from "@mantine/core";
import { ActionIcon, Button, TextInput } from "@/app/dashboard/code-editor-2/components";
import {
    connectSocket,
    createProject,
    listTemplates,
    onProjectCreationComplete,
    onProjectCreationError,
    onProjectCreationProgress,
} from "@/app/dashboard/code-editor-2/utils";
import { IconChevronLeft } from "@tabler/icons-react";
import { TemplateCard } from "@/app/dashboard/code-editor-2/components/cards";
import { generate } from "random-words";

const randomNouns = generate({ exactly: 2, join: "" });

interface CreateProjectProps extends DrawerProps {
    onRefresh: () => Promise<void>;
}

export const CreateProjectModal: React.FC<CreateProjectProps> = ({ opened, onClose, onRefresh }) => {
    const [projectName, setProjectName] = useState("");
    const [templateName, setTemplateName] = useState<string>();
    const [creationStatus, setCreationStatus] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [templates, setTemplates] = useState<{ label: string; value: string }[]>([]);

    const handleCreateProject = async () => {
        setIsCreating(true);
        setCreationStatus("Initiating project creation...");

        try {
            const temp = Boolean(templateName) ? templateName : undefined;

            await createProject(projectName, temp);

            await onRefresh();

            onClose();
        } catch (error) {
            console.error("Error creating project:", error);
            setCreationStatus("Error creating project. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    const content = useMemo(() => {
        return Boolean(templateName) ? (
            <div className="flex gap-2">
                <div className="w-1/4">
                    <p>{templateName}</p>
                </div>
                <div className="w-3/4">
                    <p className="fw-medium text-lg mb-2">Configure</p>
                    <TextInput
                        value={projectName}
                        onChange={(event) => setProjectName(event.currentTarget.value)}
                        placeholder="project Name"
                        className="w-full"
                        label="Name"
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            onClick={handleCreateProject}
                            disabled={isCreating || !projectName || !templateName}
                            variant="primary"
                        >
                            Create Project
                        </Button>
                    </div>
                    {creationStatus && <p>{creationStatus}</p>}
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <p className="fw-medium text-lg">Templates</p>
                    <TextInput placeholder="search templates" onChange={(e) => console.log(e.currentTarget.value)} />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {templates.map((template) => (
                        <TemplateCard
                            key={template.label}
                            template={template}
                            onClick={() => setTemplateName(template.value)}
                        />
                    ))}
                </div>
                <Button onClick={onClose}>Cancel</Button>
            </div>
        );
    }, [templateName, templates, projectName]);

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

            const allTemplates = ["blank", ...fetchedTemplates].map((f: string) => ({
                label: f,
                value: f,
            }));

            setTemplates(allTemplates);

            console.log({ fetchedTemplates });
        };
        void fetchTemplates();
    }, []);

    useEffect(() => {
        setProjectName(randomNouns);
    }, [randomNouns]);

    return (
        <Modal
            title={
                Boolean(templateName) ? (
                    <div className="flex items-center gap-2">
                        <ActionIcon onClick={() => setTemplateName("")}>
                            <IconChevronLeft size={16} />
                        </ActionIcon>
                        <span>Create</span>
                    </div>
                ) : (
                    "Create"
                )
            }
            opened={opened}
            onClose={onClose}
            centered
            size="xl"
        >
            <div>{content}</div>
        </Modal>
    );
};
