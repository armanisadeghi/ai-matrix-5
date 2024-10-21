import { ComponentProps, useState } from "react";
import { Button } from "@/app/dashboard/code-editor-2/components";
import { deleteProject, editProject } from "@/app/dashboard/code-editor-2/utils";
import { useDisclosure } from "@mantine/hooks";
import { EditProjectModal } from "@/app/dashboard/code-editor-2/components/modals";

interface ProjectCardProps extends ComponentProps<"div"> {
    project: string;
    onSelect: () => void;
    onRefresh: () => Promise<void>;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onRefresh, onSelect, ...others }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    const handleDeleteProject = async (projectName: string) => {
        setIsDeleting(true);
        console.log("Initiating project deletion...");

        if (!confirm("Are you sure you want to perform this action?")) {
            return;
        }

        try {
            await deleteProject(projectName);

            await onRefresh();
        } catch (error) {
            console.error("Error creating project:", error);
            console.log("Error creating project. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div
                className="p-4 border border-neutral-700 shadow rounded cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:border-neutral-300 hover:bg-neutral-900 duration-300"
                {...others}
            >
                <p className="mb-2 cursor-pointer w-full underline-offset-2 hover:underline" onClick={onSelect}>
                    {project}
                </p>
                <div className="flex gap-2">
                    <Button onClick={open}>Rename</Button>
                    <Button loading={isDeleting} onClick={() => handleDeleteProject(project)}>
                        Delete
                    </Button>
                </div>
            </div>
            <EditProjectModal opened={opened} onClose={close} onRefresh={onRefresh} selectedProject={project} />
        </>
    );
};
