"use client";

import {
    IconBolt,
    IconBug,
    IconCloudUpload,
    IconFolder,
    IconPlayerPlay,
    IconSettings,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import Split from "react-split";
import { ActionIcon, Button } from "../../components";
import { IRepoData } from "../../types";

type EditorLayoutProps = {
    children: React.ReactNode;
    selectedRepo: IRepoData | null;
    onRepoClose: () => void;
    onDeleteFromGitHub: () => void;
    onPushToGitHub: () => void;
    isPublishing: boolean;
    sidebar: React.ReactNode;
    fileTree: React.ReactNode;
    onCodeAnalyze: () => void;
};

export default function EditorLayout({
    children,
    selectedRepo,
    onRepoClose,
    onDeleteFromGitHub,
    onPushToGitHub,
    isPublishing,
    sidebar,
    fileTree,
    onCodeAnalyze,
}: EditorLayoutProps) {
    if (!selectedRepo) {
        return <>select a repo to proceed</>;
    }

    return (
        <div className="h-screen flex flex-col gap-2 p-2 bg-neutral-900 rounded border border-neutral-700">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-neutral-800 rounded">
                <p className="text-md font-medium text-white">{selectedRepo.name}</p>
                <div className="flex items-center gap-2">
                    {selectedRepo.githubUrl && (
                        <Button
                            leftSection={<IconTrash size={18} />}
                            onClick={onDeleteFromGitHub}
                            loading={isPublishing}
                            variant="danger"
                        >
                            Delete
                        </Button>
                    )}
                    <Button leftSection={<IconBolt size={18} />} onClick={onCodeAnalyze} loading={isPublishing}>
                        Analyze
                    </Button>
                    <Button
                        leftSection={<IconCloudUpload size={18} />}
                        onClick={onPushToGitHub}
                        loading={isPublishing}
                        variant="primary"
                    >
                        Publish to GitHub
                    </Button>
                    <>|</>
                    <Button onClick={onRepoClose} rightSection={<IconX size={18} />} variant="danger">
                        Close
                    </Button>
                </div>
            </div>

            {/* Main content container */}
            <Split
                sizes={[20, 80]}
                minSize={100}
                expandToMin={false}
                gutterSize={10}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={1}
                direction="horizontal"
                cursor="col-resize"
                className="flex-grow flex overflow-hidden"
            >
                {/* Sidebar */}
                <div className="bg-neutral-800 p-2 flex flex-col rounded">
                    <div className="flex items-center justify-between border-b border-neutral-700 pb-2 mb-2">
                        <ActionIcon>
                            <IconFolder size={18} />
                        </ActionIcon>
                        <ActionIcon>
                            <IconPlayerPlay size={18} />
                        </ActionIcon>
                        <ActionIcon>
                            <IconBug size={18} />
                        </ActionIcon>
                        <ActionIcon>
                            <IconSettings size={18} />
                        </ActionIcon>
                        {sidebar}
                    </div>
                    <div className="flex-grow overflow-auto">{fileTree}</div>
                </div>

                {/* Editor and Footer container */}
                <Split
                    sizes={[75, 25]}
                    minSize={100}
                    expandToMin={false}
                    gutterSize={10}
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    direction="vertical"
                    cursor="row-resize"
                    className="flex flex-col bg-neutral-800"
                >
                    {/* Main content area (children) */}
                    {children}
                </Split>
            </Split>
        </div>
    );
}
