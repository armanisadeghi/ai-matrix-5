"use client";

import React, { useState } from "react";
import { DrawerProps, Modal } from "@mantine/core";
import { Button, TextInput } from "@/app/dashboard/code-editor-2/components";
import { editProject } from "@/app/dashboard/code-editor-2/utils";

interface EditProjectProps extends DrawerProps {
    selectedProject: string;
    onRefresh: () => Promise<void>;
}

export const EditProjectModal: React.FC<EditProjectProps> = ({ opened, onClose, onRefresh, selectedProject }) => {
    const [projectName, setProjectName] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleEditProject = async () => {
        setIsEditing(true);
        console.log("Initiating project editing...");

        try {
            await editProject(selectedProject, projectName);

            await onRefresh();
        } catch (error) {
            console.error("Error creating project:", error);
            console.log("Error creating project. Please try again.");
            setIsEditing(false);
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <Modal title={`Rename project - ${selectedProject}`} opened={opened} onClose={onClose} centered size="xl">
            <div className="flex flex-col">
                <TextInput
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.currentTarget.value)}
                    placeholder="Project Name"
                    className="w-full"
                    label="Name"
                />
                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleEditProject} disabled={isEditing || !projectName} variant="primary">
                        Rename Project
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
