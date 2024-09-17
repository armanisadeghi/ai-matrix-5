import { Drawer, DrawerProps } from "@mantine/core";
import { CreateProject } from "./CreateProject";
import { GitHubImport } from "./GitHubImport";

type NewProjectDrawerProps = DrawerProps & {
    onProjectCreated: () => void;
};

export const NewProjectDrawer: React.FC<NewProjectDrawerProps> = ({ opened, onClose, onProjectCreated }) => {
    const handleRepoCloned = (repoName: string) => {
        alert(`Repository ${repoName} has been cloned and stored!`);
        // You might want to refresh the Workspace component here
    };

    return (
        <Drawer opened={opened} onClose={onClose} title="Create a project" position="right" size="xl">
            <p className="text-xl font-semibold mb-2">Create a blank project</p>
            <CreateProject onProjectCreated={onProjectCreated} />
            <hr className="border border-neutral-700 my-4" />
            <GitHubImport onRepoCloned={handleRepoCloned} />
        </Drawer>
    );
};
