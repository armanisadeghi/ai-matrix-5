"use client";

import { useEffect, useRef, useState } from "react";
import {
    IconBrandGithub,
    IconCode,
    IconCommand,
    IconFiles,
    IconFolder,
    IconPlayerPlay,
    IconSearch,
    IconSettings,
    IconX,
    IconRefresh,
    IconGitBranch,
    IconBell,
} from "@tabler/icons-react";
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
    getProjectProxyUrl,
    readFile,
    writeFile,
} from "@/app/dashboard/code-editor-2/utils";
import { CommandPalette, SearchPanel, SettingsPanel } from "../../editor-components";

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

interface ResizeHandleProps {
    onResize: any;
    direction?: "vertical" | "horizontal";
}

// Resize handle component
const ResizeHandle: React.FC<ResizeHandleProps> = ({ onResize, direction = "horizontal" }) => {
    const handleRef = useRef(null);
    const isResizing = useRef(false);
    const lastPosition = useRef(0);

    useEffect(() => {
        const handle = handleRef.current;
        if (!handle) return;

        const onMouseDown = (e) => {
            isResizing.current = true;
            lastPosition.current = direction === "horizontal" ? e.clientX : e.clientY;
            document.body.style.cursor = direction === "horizontal" ? "ew-resize" : "ns-resize";
        };

        const onMouseUp = () => {
            isResizing.current = false;
            document.body.style.cursor = "";
        };

        const onMouseMove = (e) => {
            if (!isResizing.current) return;

            const newPosition = direction === "horizontal" ? e.clientX : e.clientY;
            const delta = newPosition - lastPosition.current;
            lastPosition.current = newPosition;

            onResize(delta);
        };

        handle.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            handle.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [onResize, direction]);

    return (
        <div
            ref={handleRef}
            className={`${
                direction === "horizontal" ? "w-1 cursor-ew-resize" : "h-1 cursor-ns-resize"
            } bg-transparent hover:bg-blue-500 transition-colors`}
        />
    );
};

interface TabHeaderProps {
    tab: any;
    isActive: boolean;
    onClick: any;
    onClose: any;
}

// Enhanced Tab Header
const TabHeader: React.FC<TabHeaderProps> = ({ tab, isActive, onClick, onClose }) => (
    <div
        className={`flex items-center h-9 px-3 gap-2 cursor-pointer border-t-2 group
      ${
          isActive
              ? "bg-neutral-800 border-t-blue-500 text-white"
              : "border-t-transparent text-gray-400 hover:text-gray-200"
      }`}
        onClick={onClick}
    >
        <IconFolder size={14} className="opacity-50" />
        <span className="truncate max-w-[120px]">{tab.fileName}</span>
        <IconX
            size={14}
            className={`opacity-0 group-hover:opacity-50 hover:opacity-100
        ${isActive ? "opacity-50" : ""}`}
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        />
    </div>
);

export default function ProjectPage({ params }: { params: { projectName: string } }) {
    // Core state
    const [sidebarWidth, setSidebarWidth] = useState(240);
    const [rightPanelWidth, setRightPanelWidth] = useState(480);
    const [previewHeight, setPreviewHeight] = useState(400);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [openTabs, setOpenTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // UI state
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const [activeSidebarPanel, setActiveSidebarPanel] = useState("files"); // files, search, git, extensions
    const [notifications, setNotifications] = useState([]);
    const [gitBranch, setGitBranch] = useState("main");
    const [isTerminalVisible, setTerminalVisible] = useState(true);

    const name = decodeURIComponent(params.projectName);

    const handleFileClick = async (fileName: string) => {
        const existingTab = openTabs.find((tab) => tab.fileName === fileName);
        if (existingTab) {
            setActiveTab(fileName);
        } else {
            const content = await readFile(params.projectName, fileName);
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
                await writeFile(params.projectName, activeTab, newContent);
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

    // Activity Bar Items
    const activityBarItems = [
        { icon: IconFiles, id: "files", label: "Explorer" },
        { icon: IconSearch, id: "search", label: "Search" },
        { icon: IconBrandGithub, id: "git", label: "Source Control" },
        { icon: IconCode, id: "extensions", label: "Extensions" },
    ];

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.metaKey || e.ctrlKey) {
                switch (e.key.toLowerCase()) {
                    case "p":
                        e.preventDefault();
                        setCommandPaletteOpen(true);
                        break;
                    case ",":
                        e.preventDefault();
                        setSettingsOpen(true);
                        break;
                    case "f":
                        e.preventDefault();
                        setSearchOpen(true);
                        break;
                    case "b":
                        e.preventDefault();
                        setSidebarCollapsed((prev) => !prev);
                        break;
                    case "j":
                        e.preventDefault();
                        setTerminalVisible((prev) => !prev);
                        break;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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

    if (typeof name !== "string") {
        return <div>Invalid project name</div>;
    }

    return (
        <div className="h-screen flex flex-col bg-neutral-900 text-gray-100">
            {/* Modals */}
            <SettingsPanel isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />
            <SearchPanel isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} projectName={name} />
            <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

            {/* Top Bar */}
            <div className="h-12 bg-neutral-800 flex items-center justify-between px-4 border-b border-neutral-700">
                <div className="flex items-center gap-2">
                    <Button
                        variant="subtle"
                        // size="sm"
                        leftSection={<IconCommand size={16} />}
                        onClick={() => setCommandPaletteOpen(true)}
                    >
                        Command Palette
                    </Button>
                    <span className="text-gray-400">|</span>
                    <Button
                        variant="subtle"
                        // size="sm"
                        leftSection={<IconBrandGithub size={16} />}
                    >
                        {name}
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="subtle"
                        // size="sm"
                        leftSection={<IconSearch size={16} />}
                        onClick={() => setSearchOpen(true)}
                    >
                        Search
                    </Button>
                    <ActionIcon onClick={() => setSettingsOpen(true)} className="hover:bg-neutral-700 rounded">
                        <IconSettings size={20} />
                    </ActionIcon>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Activity Bar */}
                <div className="w-12 bg-neutral-800 border-r border-neutral-700 flex flex-col items-center py-2">
                    {activityBarItems.map((item) => (
                        <ActionIcon
                            key={item.id}
                            onClick={() => {
                                setActiveSidebarPanel(item.id);
                                setSidebarCollapsed(false);
                            }}
                            className={`mb-2 p-2 hover:bg-neutral-700 rounded ${
                                activeSidebarPanel === item.id ? "bg-neutral-700" : ""
                            }`}
                            title={item.label}
                        >
                            <item.icon size={24} />
                        </ActionIcon>
                    ))}
                </div>

                {/* Sidebar */}
                <div
                    style={{ width: isSidebarCollapsed ? 0 : sidebarWidth }}
                    className="border-r border-neutral-700 transition-all duration-200 overflow-hidden"
                >
                    <div className="h-full bg-neutral-900">
                        {activeSidebarPanel === "files" && (
                            <FileExplorer projectName={name} onFileClick={handleFileClick} activeFile={activeTab} />
                        )}
                        {/* Add other sidebar panels here */}
                    </div>
                    {!isSidebarCollapsed && (
                        <ResizeHandle
                            onResize={(delta) =>
                                setSidebarWidth((width) => Math.max(160, Math.min(800, width + delta)))
                            }
                        />
                    )}
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex">
                    <div className="flex-1 flex flex-col">
                        {/* Tabs */}
                        <div className="bg-neutral-900 flex border-b border-neutral-700">
                            {openTabs.map((tab) => (
                                <TabHeader
                                    key={tab.fileName}
                                    tab={tab}
                                    isActive={activeTab === tab.fileName}
                                    onClick={() => setActiveTab(tab.fileName)}
                                    onClose={() => handleTabClose(tab.fileName)}
                                />
                            ))}
                        </div>

                        {/* Editor Content */}
                        <div className="flex-1 overflow-hidden">
                            {activeTab ? (
                                <Editor
                                    initialValue={openTabs.find((tab) => tab.fileName === activeTab)?.content || ""}
                                    onSave={handleSave}
                                    fileName={activeTab}
                                    onChange={handleContentChange}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <IconFolder size={48} className="mb-4" />
                                    <span>Select a file to edit</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel */}
                    <ResizeHandle
                        onResize={(delta) =>
                            setRightPanelWidth((width) => Math.max(300, Math.min(1000, width - delta)))
                        }
                    />
                    <div style={{ width: rightPanelWidth }} className="border-l border-neutral-700 flex flex-col">
                        {/* Preview Panel */}
                        <div style={{ height: previewHeight }} className="border-b border-neutral-700">
                            <div className="h-9 bg-neutral-800 px-3 flex items-center justify-between">
                                <span className="text-sm font-medium">Preview</span>
                                <div className="flex gap-1">
                                    <ActionIcon
                                        // size="sm"
                                        onClick={() => setIsPreviewVisible((prev) => !prev)}
                                    >
                                        <IconRefresh size={16} />
                                    </ActionIcon>
                                </div>
                            </div>
                            <div className="h-[calc(100%-36px)]">
                                {isPreviewVisible && previewUrl ? (
                                    <MiniBrowser initialUrl={previewUrl} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <Button
                                            leftSection={<IconPlayerPlay size={16} />}
                                            onClick={async () => {
                                                const { status, port } = await getContainerStatus(name);
                                                if (status === "running") {
                                                    handleServerStart(`http://localhost:${port}`);
                                                }
                                            }}
                                        >
                                            Start Preview Server
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Vertical resize handle */}
                        <ResizeHandle
                            direction="vertical"
                            onResize={(delta) =>
                                setPreviewHeight((height) => Math.max(200, Math.min(800, height + delta)))
                            }
                        />

                        {/* Terminal Panel */}
                        {isTerminalVisible && (
                            <div className="flex-1">
                                <div className="h-9 bg-neutral-800 px-3 flex items-center justify-between">
                                    <span className="text-sm font-medium">Terminal</span>
                                    <ActionIcon
                                        // size="sm"
                                        onClick={() => setTerminalVisible(false)}
                                    >
                                        <IconX size={16} />
                                    </ActionIcon>
                                </div>
                                <div className="h-[calc(100%-36px)]">
                                    <Terminal
                                        projectName={name}
                                        onServerStart={handleServerStart}
                                        onServerStop={handleServerStop}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-neutral-700 text-gray-300 text-sm flex items-center px-2">
                <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <IconGitBranch size={14} />
                        <span>{gitBranch}</span>
                    </div>
                    {notifications.length > 0 && (
                        <div className="flex items-center gap-1">
                            <IconBell size={14} />
                            <span>{notifications.length}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span>Spaces: 2</span>
                    <span>UTF-8</span>
                    <span>JavaScript</span>
                </div>
            </div>
        </div>
    );
}
