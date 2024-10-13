import { ComponentProps } from "react";

interface ProjectCardProps extends ComponentProps<"div"> {
    project: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, ...others }) => {
    return (
        <div
            className="p-4 border border-neutral-700 shadow rounded cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:border-neutral-300 hover:bg-neutral-900 duration-300"
            {...others}
        >
            <p className="mb-0">{project}</p>
        </div>
    );
};
