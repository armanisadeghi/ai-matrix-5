import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconFolder, IconTrash } from "@tabler/icons-react";

import { HTMLAttributes } from "react";
import { IRepoData } from "../../types";

type ProjectCardProps = HTMLAttributes<HTMLDivElement> & {
    repo: IRepoData;
    handleDelete: (repoName: string) => void;
    handleSelect: (repoName: string) => Promise<void>;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ repo, handleDelete, handleSelect, ...others }) => {
    return (
        <div className="flex items-center justify-between p-4 border border-neutral-600 rounded-md" {...others}>
            <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex justify-between items-center w-full">
                    <IconFolder />
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="subtle">
                                <IconDotsVertical size={16} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconTrash size={16} />} onClick={() => handleDelete(repo.name)}>
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
                <p
                    className="w-full transition ease-in-out delay-150 hover:underline cursor-pointer"
                    onClick={() => handleSelect(repo.name)}
                >
                    {repo.name}
                </p>
            </div>
        </div>
    );
};
