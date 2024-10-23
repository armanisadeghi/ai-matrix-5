"use client";

import React, { useEffect, useState } from "react";
import { IconColumns2, IconDots, IconMessage, IconX } from "@tabler/icons-react";

import Link from "next/link";
import {
    ActionIcon,
    Button,
    Editor,
    FileExplorer,
    MiniBrowser,
    Terminal,
} from "@/app/dashboard/code-editor-2/components";
import {
    emitFileChanged,
    getContainerStatus,
    getProjectPreview,
    getProjectProxyUrl,
    readFile,
    writeFile,
} from "@/app/dashboard/code-editor-2/utils";

type OpenTab = {
    fileName: string;
    content: string;
};

const Tabs: React.FC<{
    tabs: OpenTab[];
    activeTab: string | null;
    onTabClick: (fileName: string) => void;
    onTabClose: (fileName: string) => void;
}> = ({ tabs, activeTab, onTabClick, onTabClose }) => (
    <div className="flex border-b">
        {tabs.map((tab) => (
            <div
                key={tab.fileName}
                className={`px-4 py-2 cursor-pointer flex items-center ${
                    activeTab === tab.fileName ? "bg-neutral-900" : ""
                }`}
                onClick={() => onTabClick(tab.fileName)}
            >
                {tab.fileName}
                <ActionIcon
                    className="ml-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        onTabClose(tab.fileName);
                    }}
                >
                    <IconX size={12} />
                </ActionIcon>
            </div>
        ))}
    </div>
);

export default function ProjectPage({ params }: { params: { projectName: string } }) {
    const { projectName } = params;
    const [openTabs, setOpenTabs] = useState<OpenTab[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const name = decodeURIComponent(projectName);

    const handleFileClick = async (fileName: string) => {
        const existingTab = openTabs.find((tab) => tab.fileName === fileName);
        if (existingTab) {
            setActiveTab(fileName);
        } else {
            const content = await readFile(projectName, fileName);
            setOpenTabs((prev) => [...prev, { fileName, content }]);
            setActiveTab(fileName);
        }
    };

    const handleTabClose = (fileName: string) => {
        setOpenTabs((prev) => prev.filter((tab) => tab.fileName !== fileName));
        if (activeTab === fileName) {
            setActiveTab(openTabs.length > 1 ? openTabs[0].fileName : null);
        }
    };

    const handleSave = async (newContent: string) => {
        if (activeTab) {
            try {
                await writeFile(projectName, activeTab, newContent);
                console.log("File saved successfully!");

                // Update the openTabs state with the new content
                setOpenTabs((prev) =>
                    prev.map((tab) => (tab.fileName === activeTab ? { ...tab, content: newContent } : tab)),
                );

                // Emit file changed event for HMR
                emitFileChanged(name, activeTab);
            } catch (error) {
                console.error("Error saving file:", error);
            }
        }
    };

    const handleContentChange = (newContent: string) => {
        setOpenTabs((prev) => prev.map((tab) => (tab.fileName === activeTab ? { ...tab, content: newContent } : tab)));
    };

    // Add handlers for server state
    const handleServerStart = (url: string) => {
        setPreviewUrl(url);
        setIsPreviewVisible(true);
    };

    const handleServerStop = () => {
        setIsPreviewVisible(false);
        setPreviewUrl(null);
    };

    const activeTabContent = openTabs.find((tab) => tab.fileName === activeTab)?.content || "";

    useEffect(() => {
        const fetchProxyUrl = async () => {
            try {
                const { previewUrl, status } = await getProjectProxyUrl(name);

                if (status === "running") {
                    setPreviewUrl(previewUrl);
                    setIsPreviewVisible(true);
                }
            } catch (error) {
                console.error("Error fetching proxy URL:", error);
                setIsPreviewVisible(false);
            }
        };

        void fetchProxyUrl();
    }, [name]);

    // Check initial server status
    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const { status, port } = await getContainerStatus(name);
                if (status === "running") {
                    handleServerStart(`http://localhost:${port}`);
                }
            } catch (error) {
                console.error("Error checking server status:", error);
            }
        };

        void checkServerStatus();
    }, [name]);

    if (typeof projectName !== "string") {
        return <div>Invalid project name</div>;
    }

    return (
        <div>
            {/*header*/}
            <div className="flex justify-between">
                <div className="flex">
                    <Link href="/dashboard/code-editor-2">
                        <Button>Home</Button>
                    </Link>
                    <Button leftSection={<IconMessage />}>Feedback</Button>
                </div>
                <h1>Project: {name}</h1>
                <div className="flex">
                    <ActionIcon>
                        <IconColumns2 />
                    </ActionIcon>
                    <ActionIcon>
                        <IconDots />
                    </ActionIcon>
                </div>
            </div>
            <div className="flex border border-rose-500 h-[85vh]">
                {/* ... file explorer ... */}
                <div className="w-1/6">
                    <FileExplorer projectName={name} onFileClick={handleFileClick} activeFile={activeTab} />
                </div>
                <div className="flex flex-col grow h-full border border-amber-500">
                    {/*tabs*/}
                    <Tabs tabs={openTabs} activeTab={activeTab} onTabClick={setActiveTab} onTabClose={handleTabClose} />
                    {/*editor & preview*/}
                    <div className="grid grid-cols-2 gap-2 h-full border border-fuchsia-500">
                        {/*editor*/}
                        <div className="grow border border-green-500 h-48">
                            {activeTab ? (
                                <div className="flex flex-col">
                                    <Editor
                                        initialValue={activeTabContent}
                                        onSave={handleSave}
                                        fileName={activeTab}
                                        onChange={handleContentChange}
                                    />
                                </div>
                            ) : (
                                <p>Select a file to edit</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-2 border border-blue-500 h-[80vh]">
                            {/* Preview section */}
                            <div className="border border-lime-500">
                                <span>Live Preview</span>
                                {isPreviewVisible && previewUrl ? (
                                    <MiniBrowser initialUrl={previewUrl} />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-500">Run your development server to see the preview</p>
                                    </div>
                                )}
                            </div>
                            {/* Terminal section */}
                            <div className="border border-red-500">
                                <h2>Terminal</h2>
                                <Terminal
                                    projectName={name}
                                    onServerStart={handleServerStart}
                                    onServerStop={handleServerStop}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
