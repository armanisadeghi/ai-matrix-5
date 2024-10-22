"use client";

import {
    ActionIcon,
    Button,
    Editor,
    FileExplorer,
    MiniBrowser,
    Terminal,
} from "@/app/dashboard/code-editor-2/components";
import React, { useEffect, useRef, useState } from "react";
import {
    connectSocket,
    disconnectSocket,
    emitFileChanged,
    getProjectProxyUrl,
    onReload,
    readFile,
    writeFile,
} from "@/app/dashboard/code-editor-2/utils";
import { IconColumns2, IconDots, IconMessage, IconX } from "@tabler/icons-react";
import Link from "next/link";

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
    const [proxyUrl, setProxyUrl] = useState<string>();

    const name = decodeURIComponent(projectName);
    // Construct preview URL directly
    const previewUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preview/${encodeURIComponent(name)}/`;

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

    const activeTabContent = openTabs.find((tab) => tab.fileName === activeTab)?.content || "";

    useEffect(() => {
        const fetchProxyUrl = async () => {
            try {
                const fetchedProjectProxy = await getProjectProxyUrl(name);

                setProxyUrl(fetchedProjectProxy.previewUrl);
            } catch (error) {
                console.error("Error fetching proxy URL:", error);
            }
        };

        void fetchProxyUrl();

        return () => {};
    }, [name, openTabs]);

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
            {/*main*/}
            <div className="flex">
                <div className="w-1/6">
                    <FileExplorer projectName={name} onFileClick={handleFileClick} activeFile={activeTab} />
                </div>
                <div className="flex flex-col grow">
                    {/*tabs*/}
                    <Tabs tabs={openTabs} activeTab={activeTab} onTabClick={setActiveTab} onTabClose={handleTabClose} />
                    {/*editor & preview*/}
                    <div className="grid grid-cols-2 gap-2">
                        {/*editor*/}
                        <div className="grow">
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
                        {/*preview*/}
                        <div>
                            <span>Live Preview</span>
                            <MiniBrowser initialUrl={proxyUrl} />
                        </div>
                    </div>
                    {/*footer*/}
                    <div>
                        <h2>Terminal</h2>
                        <Terminal projectName={name} />
                    </div>
                </div>
            </div>
        </div>
    );
}