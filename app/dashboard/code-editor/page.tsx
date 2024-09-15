"use client";

import { Box, Button, Flex, Title } from "@mantine/core";
import { GitHubImport2, Workspace } from "./components";

export default function CodeEditorLandingPage() {
    return (
        <>
            <div className="container mx-auto p-4">
                
                <div className="mt-8">
                    <Workspace />
                </div>
            </div>
        </>
    );
}
