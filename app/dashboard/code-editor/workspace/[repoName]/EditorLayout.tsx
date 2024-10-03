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
import { ActionIcon, Button, Header, Sidebar } from "../../components";
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
        <div className="h-screen flex flex-col gap-2 bg-neutral-900">
            {/* Header */}
            <Header
                selectedRepo={selectedRepo}
                onRepoClose={onRepoClose}
                onCodeAnalyze={onCodeAnalyze}
                onDeleteFromGitHub={onDeleteFromGitHub}
                isPublishing={isPublishing}
                onPushToGitHub={onPushToGitHub}
            />

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
                <Sidebar fileTree={fileTree} addFileFolder={sidebar} />

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
