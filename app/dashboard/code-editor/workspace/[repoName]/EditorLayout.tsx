"use client";

import Split from "react-split";
import { Button, Header, Sidebar, Textarea, TextInput } from "../../components";
import { IRepoData } from "../../types";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCloudUpload, IconDeviceFloppy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

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
    selectedFile: { path: string; content: string } | null;
    onRunCode: () => Promise<void>;
    isExecuting: boolean;
    onRepoUpdate: (oldName: string, newName: string, description: string) => Promise<void>;
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
    selectedFile,
    onRunCode,
    isExecuting,
    onRepoUpdate,
}: EditorLayoutProps) {
    const [detailsOpened, { open: detailsOpen, close: detailsClose }] = useDisclosure(false);
    const [verticalSizes, setVerticalSizes] = useState([70, 30]);
    const initialSidebarSize = 20;
    const [horizontalSizes, setHorizontalSizes] = useState([initialSidebarSize, 100 - initialSidebarSize]);
    const [newName, setNewName] = useState<string>();
    const [newDesc, setNewDesc] = useState<string>();

    const toggleSidebar = () => {
        setHorizontalSizes((prevSizes) => {
            if (prevSizes[0] === 0) {
                // If sidebar is currently hidden, restore it to the original size
                return [initialSidebarSize, 100 - initialSidebarSize];
            } else {
                // If sidebar is visible, hide it by setting its size to 0
                return [0, 100];
            }
        });
    };

    const resetHorizontalView = () => {
        setHorizontalSizes([20, 80]);
    };

    const resetVerticalView = () => {
        setVerticalSizes([30, 70]);
    };

    useEffect(() => {
        setNewName(selectedRepo.name);
        setNewDesc(selectedRepo.description);
    }, [detailsOpened]);

    if (!selectedRepo) {
        return <>select a repo to proceed</>;
    }

    return (
        <>
            <div className="h-screen flex flex-col gap-2 bg-neutral-900">
                {/* Header */}
                <Header
                    selectedRepo={selectedRepo}
                    onRepoClose={onRepoClose}
                    onCodeAnalyze={onCodeAnalyze}
                    onDeleteFromGitHub={onDeleteFromGitHub}
                    isPublishing={isPublishing}
                    onPushToGitHub={onPushToGitHub}
                    detailsOpen={detailsOpen}
                    toggleSidebar={toggleSidebar}
                    selectedFile={selectedFile}
                    onRunCode={onRunCode}
                    isExecuting={isExecuting}
                />

                {/* Main content container */}
                <Split
                    sizes={horizontalSizes}
                    minSize={[0, 100]}
                    expandToMin={true}
                    gutterSize={10}
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    direction="horizontal"
                    cursor="col-resize"
                    className="flex-grow flex overflow-hidden"
                >
                    {/* Sidebar */}
                    <Sidebar
                        fileTree={fileTree}
                        addFileFolder={sidebar}
                        className={horizontalSizes[0] <= 0 ? "hidden" : ""}
                    />

                    {/* Editor and Footer container */}
                    <Split
                        sizes={verticalSizes}
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
            <Modal opened={detailsOpened} onClose={detailsClose} title="Project details" centered size="lg">
                <div className="flex flex-col gap-4">
                    <TextInput
                        label="Name"
                        placeholder="Default name:"
                        className="w-full"
                        value={newName}
                        onChange={(evt) => setNewName(evt.currentTarget.value)}
                    />
                    <Textarea
                        label="Description"
                        placeholder="What does this project do?"
                        className="w-full"
                        value={newDesc}
                        onChange={(evt) => setNewDesc(evt.currentTarget.value)}
                    />
                    <div className="flex gap-2">
                        <Button
                            leftSection={<IconDeviceFloppy size={16} />}
                            onClick={() => {
                                void onRepoUpdate(selectedRepo.name, newName, newDesc);
                            }}
                            loading={isPublishing}
                            variant="light"
                            className="justify-center flex-auto"
                        >
                            Save your changes
                        </Button>
                        <Button
                            leftSection={<IconCloudUpload size={16} />}
                            onClick={onPushToGitHub}
                            loading={isPublishing}
                            variant="primary"
                            className="justify-center flex-auto"
                        >
                            Publish to GitHub
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
