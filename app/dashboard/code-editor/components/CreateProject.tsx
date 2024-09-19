import React, { useState } from "react";
import { Button } from "../components";
import { indexedDBStore } from "../utils/indexedDB";
import { TextInput } from "./Inputs";

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
        <div className="flex items-center gap-2">
            <TextInput
                className="flex-grow"
                placeholder="Enter project name"
                value={projectName}
                onChange={(event) => setProjectName(event.currentTarget.value)}
            />
            <Button onClick={handleCreateProject} variant="primary">
                Create Blank Project
            </Button>
        </div>
    );
};
