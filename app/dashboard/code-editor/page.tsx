"use client";

import { Button } from "@mantine/core";
import { GitHubImport2, Workspace } from "./components";

export default function CodeEditorLandingPage() {
    const handleRepoCloned = (repoName: string) => {
        alert(`Repository ${repoName} has been cloned and stored!`);
        // You might want to refresh the Workspace component here
    };

    return (
        <>
            <Button
                component="a"
                title="simple editor"
                href="http://localhost:3000/dashboard/code-editor/simple-editor"
            >
                Simple editor
            </Button>
            <Button
                component="a"
                title="complex editor"
                href="http://localhost:3000/dashboard/code-editor/complex-editor"
            >
                Complex editor
            </Button>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">GitHub Repository Cloner</h1>
                <GitHubImport2 onRepoCloned={handleRepoCloned} />
                <div className="mt-8">
                    <Workspace />
                </div>
            </div>
        </>
    );
}
