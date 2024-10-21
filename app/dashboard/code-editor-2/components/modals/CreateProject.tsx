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

const generateRandomWords = () => {
    return generate({ exactly: 2, join: "" });
};

interface CreateProjectProps extends DrawerProps {
    onRefresh: () => Promise<void>;
}

export const CreateProjectModal: React.FC<CreateProjectProps> = ({ opened, onClose, onRefresh }) => {
    const [projectName, setProjectName] = useState("");
    const [templateName, setTemplateName] = useState<string>();
    const [creationStatus, setCreationStatus] = useState<string[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [templates, setTemplates] = useState<{ label: string; value: string }[]>([]);
    const [disableButton, setDisableButton] = useState(false);

    const handleCreateProject = async () => {
        setIsCreating(true);
        setCreationStatus(["Initiating project creation..."]);

        try {
            const temp = Boolean(templateName) ? templateName : undefined;

            await createProject(projectName, temp);

            await onRefresh();

            setDisableButton(true);
        } catch (error) {
            console.error("Error creating project:", error);
            setCreationStatus([...creationStatus, "Error creating project. Please try again."]);
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
                    <div className="flex items-end gap-2">
                        <TextInput
                            value={projectName}
                            onChange={(event) => setProjectName(event.currentTarget.value)}
                            placeholder="project Name"
                            className="w-full"
                            label="Name"
                        />
                        <Button onClick={() => setProjectName(generateRandomWords)}>Generate</Button>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            onClick={handleCreateProject}
                            disabled={isCreating || !projectName || !templateName || disableButton}
                            loading={isCreating}
                            variant="primary"
                        >
                            Create Project
                        </Button>
                    </div>
                    {creationStatus && creationStatus.length > 0 && (
                        <div className="flex flex-col max-h-48 overflow-y-auto">
                            {creationStatus.map((c, i) => (
                                <p key={i + c} className="mb-0 text-sm">
                                    {c}
                                </p>
                            ))}
                        </div>
                    )}
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
    }, [templateName, templates, projectName, creationStatus]);

    useEffect(() => {
        const socket = connectSocket();

        const progressHandler = (data: { message: string }) => {
            console.log("Progress:", data.message);
            setCreationStatus((prevStatus) => [...prevStatus, data.message]);
        };

        const completeHandler = (data: { message: string }) => {
            console.log("Complete:", data.message);
            setCreationStatus((prevStatus) => [...prevStatus, data.message]);
            setIsCreating(false);
        };

        const errorHandler = (data: { message: string }) => {
            console.error("Error:", data.message);
            setCreationStatus((prevStatus) => [...prevStatus, `Error: ${data.message}`]);
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

            const allTemplates = fetchedTemplates.map((f: string) => ({
                label: f,
                value: f,
            }));

            setTemplates(allTemplates);
            setCreationStatus([]);
        };
        void fetchTemplates();
    }, []);

    useEffect(() => {
        let name = generateRandomWords;
        if (!opened) {
            setCreationStatus([]);
            setIsCreating(false);
        }

        setProjectName(name);
    }, [opened, generateRandomWords]);

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
