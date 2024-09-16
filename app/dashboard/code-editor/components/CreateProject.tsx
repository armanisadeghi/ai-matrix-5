import React, { useState } from "react";
import { Button, TextInput, Stack } from "@mantine/core";
import { indexedDBStore } from "../utils/indexedDB";

export const CreateProject: React.FC<{ onProjectCreated: () => void }> = ({ onProjectCreated }) => {
    const [projectName, setProjectName] = useState("");

    const handleCreateProject = async () => {
        if (!projectName) {
            // You might want to show an error message here
            return;
        }

        const newProject = {
            name: projectName,
            files: {},
        };

        try {
            await indexedDBStore.addRepository(newProject);
            setProjectName("");
            onProjectCreated();
        } catch (error) {
            console.error("Error creating project:", error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <Stack>
            <TextInput
                placeholder="Enter project name"
                value={projectName}
                onChange={(event) => setProjectName(event.currentTarget.value)}
            />
            <Button onClick={handleCreateProject}>Create Blank Project</Button>
        </Stack>
    );
};
