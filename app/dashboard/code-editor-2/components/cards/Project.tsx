"use client";

import { ComponentProps, useEffect, useState } from "react";
import { Button } from "@/app/dashboard/code-editor-2/components";
import { deleteProject, getContainerStatus, startContainer, stopContainer } from "@/app/dashboard/code-editor-2/utils";
import { useDisclosure } from "@mantine/hooks";
import { EditProjectModal } from "@/app/dashboard/code-editor-2/components/modals";
import { IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";

interface ProjectCardProps extends ComponentProps<"div"> {
    project: string;
    onSelect: () => void;
    onRefresh: () => Promise<void>;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onRefresh, onSelect, ...others }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [containerStatus, setContainerStatus] = useState<"running" | "stopped" | "not_found">("stopped");
    const [opened, { open, close }] = useDisclosure(false);

    const fetchContainerStatus = async () => {
        try {
            const response = await getContainerStatus(project);
            setContainerStatus(response.status);
            console.log(`Container status for ${project}:`, response.status); // Debug log
        } catch (error) {
            console.error("Error fetching container status:", error);
            setContainerStatus("not_found");
        }
    };

    // Fetch status initially and set up polling
    useEffect(() => {
        fetchContainerStatus();

        // Poll for status updates every 5 seconds
        const intervalId = setInterval(fetchContainerStatus, 5000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, [project]);

    const handleStartContainer = async () => {
        setIsLoading(true);
        try {
            await startContainer(project);
            await fetchContainerStatus(); // Immediate status update
        } catch (error) {
            console.error("Error starting container:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStopContainer = async () => {
        setIsLoading(true);
        try {
            await stopContainer(project);
            await fetchContainerStatus(); // Immediate status update
        } catch (error) {
            console.error("Error stopping container:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProject = async (projectName: string) => {
        setIsDeleting(true);
        if (!confirm("Are you sure you want to perform this action?")) {
            setIsDeleting(false);
            return;
        }

        try {
            await deleteProject(projectName);
            await onRefresh();
        } catch (error) {
            console.error("Error deleting project:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    // Helper function to determine button state
    const getContainerControls = () => {
        if (containerStatus === "not_found") {
            return (
                <Button
                    leftSection={<IconPlayerPlay size={16} />}
                    loading={isLoading}
                    onClick={handleStartContainer}
                    className="bg-yellow-600 hover:bg-yellow-700"
                >
                    Create & Start
                </Button>
            );
        }

        return containerStatus === "running" ? (
            <Button
                leftSection={<IconPlayerStop size={16} />}
                loading={isLoading}
                onClick={handleStopContainer}
                className="bg-red-600 hover:bg-red-700"
            >
                Stop
            </Button>
        ) : (
            <Button
                leftSection={<IconPlayerPlay size={16} />}
                loading={isLoading}
                onClick={handleStartContainer}
                className="bg-green-600 hover:bg-green-700"
            >
                Start
            </Button>
        );
    };

    return (
        <>
            <div
                className="p-4 border border-neutral-700 shadow rounded cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:border-neutral-300 hover:bg-neutral-900 duration-300"
                {...others}
            >
                <div className="flex justify-between items-center mb-2">
                    <p className="cursor-pointer underline-offset-2 hover:underline" onClick={onSelect}>
                        {project}
                    </p>
                    <span
                        className={`px-2 py-1 rounded-full text-xs ${
                            containerStatus === "running"
                                ? "bg-green-900 text-green-300"
                                : containerStatus === "stopped"
                                  ? "bg-red-900 text-red-300"
                                  : "bg-gray-900 text-gray-300"
                        }`}
                    >
                        {containerStatus}
                    </span>
                </div>
                <div className="flex gap-2">
                    {getContainerControls()}
                    <Button onClick={open}>Rename</Button>
                    <Button
                        loading={isDeleting}
                        onClick={() => handleDeleteProject(project)}
                        className="bg-red-800 hover:bg-red-900"
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <EditProjectModal opened={opened} onClose={close} onRefresh={onRefresh} selectedProject={project} />
        </>
    );
};
