"use client";

import { ActionIcon, ActionIconProps } from "@mantine/core";
import {
    IconBell,
    IconBug,
    IconCloudUpload,
    IconFolder,
    IconInfoCircle,
    IconPlayerPlay,
    IconSettings,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import Split from "react-split";

type EditorLayoutProps = {
    children: React.ReactNode;
    selectedRepo: string | null;
    onRepoClose: () => void;
    onDeleteFromGitHub: () => void;
    onPushToGitHub: () => void;
    isPublishing: boolean;
    sidebar: React.ReactNode;
    fileTree: React.ReactNode;
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
}: EditorLayoutProps) {
    const actionIconProps: ActionIconProps = {
        variant: "subtle",
    };

    if (!selectedRepo) {
        return <>select a repo to proceed</>;
    }

    return (
        <div className="h-screen flex flex-col bg-neutral-900">
            {/* Header */}
            <div className="flex justify-between px-3 py-2 bg-neutral-800">
                <p className="text-md font-semibold text-white">Repository: {selectedRepo}</p>
                <div className="flex gap-2">
                    <ActionIcon {...actionIconProps}>
                        <IconBell size={18} />
                    </ActionIcon>
                    <ActionIcon {...actionIconProps}>
                        <IconInfoCircle size={18} />
                    </ActionIcon>
                    <ActionIcon onClick={onRepoClose} {...actionIconProps}>
                        <IconX size={18} />
                    </ActionIcon>
                    <ActionIcon onClick={onDeleteFromGitHub} loading={isPublishing} {...actionIconProps}>
                        <IconTrash size={18} />
                    </ActionIcon>
                    <ActionIcon onClick={onPushToGitHub} loading={isPublishing} {...actionIconProps}>
                        <IconCloudUpload size={18} />
                    </ActionIcon>
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
                <div className="bg-neutral-800 p-2 flex flex-col">
                    <div className="flex justify-between border-b border-neutral-700 pb-2 mb-2">
                        <ActionIcon {...actionIconProps}>
                            <IconFolder size={18} />
                        </ActionIcon>
                        <ActionIcon {...actionIconProps}>
                            <IconPlayerPlay size={18} />
                        </ActionIcon>
                        <ActionIcon {...actionIconProps}>
                            <IconBug size={18} />
                        </ActionIcon>
                        <ActionIcon {...actionIconProps}>
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
                    className="flex flex-col"
                >
                    {/* Main content area (children) */}
                    {children}
                </Split>
            </Split>
        </div>
    );
}
