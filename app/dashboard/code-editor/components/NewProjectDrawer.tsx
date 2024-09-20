import { Drawer, DrawerProps } from "@mantine/core";
import { CreateProject } from "./CreateProject";
import { GitHubImport } from "./GitHubImport";
import { IRepoData } from "../types";

type NewProjectDrawerProps = DrawerProps & {
    onProjectCreated: () => void;
};

export const NewProjectDrawer: React.FC<NewProjectDrawerProps> = ({ opened, onClose, onProjectCreated }) => {
    const handleRepoCloned = (repo: IRepoData) => {
        alert(`Repository ${repo.name} has been cloned and stored!`);
        // You might want to refresh the Workspace component here
    };

    const handleCloseDrawer = () => {
        onProjectCreated();
        onClose();
    };

    return (
        <Drawer opened={opened} onClose={onClose} title="Create a project" position="right" size="xl">
            <CreateProject onProjectCreated={handleCloseDrawer} />
            <hr className="border border-neutral-700 my-4" />
            <GitHubImport onRepoCloned={handleCloseDrawer} />
        </Drawer>
    );
};
