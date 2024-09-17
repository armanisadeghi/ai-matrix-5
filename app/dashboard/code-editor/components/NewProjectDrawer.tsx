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
        <Drawer opened={opened} onClose={onClose} title="Github repos cloner">
            <CreateProject onProjectCreated={onProjectCreated} />

            <GitHubImport onRepoCloned={handleRepoCloned} />
        </Drawer>
    );
};
