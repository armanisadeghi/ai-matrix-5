import { Drawer, DrawerProps } from "@mantine/core";
import { GitHubImport2 } from "./GitHubImport2";
import { CreateProject } from "./CreateProject";

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

            <GitHubImport2 onRepoCloned={handleRepoCloned} />
        </Drawer>
    );
};
