import React, { useState, useRef, useEffect } from "react";
import {
    IconChevronRight,
    IconSearch,
    IconCommand,
    IconGitBranch,
    IconBell,
    IconSettings,
    IconFolder,
    IconTerminal2,
    IconX,
    IconMenu2,
    IconLayoutSidebarRightCollapse,
    IconBrandGithub,
    IconFile,
    IconRefresh,
    IconPlayerPlay,
    IconDatabase,
    IconBrandNpm,
    IconColorSwatch,
    IconBrush,
    IconKeyboard,
    IconMessages,
    IconZoomIn,
    IconZoomOut,
    IconFolderPlus,
    IconFilePlus,
    IconTrash,
    IconCopy,
    IconClipboard,
    IconEdit,
} from "@tabler/icons-react";

interface Command {
    label: string;
    icon: React.ElementType; // For Tabler icons
    keybind: string;
    category: string;
}

interface GroupedCommands {
    [category: string]: Command[];
}

// Settings Panel Component
const SettingsPanel = ({ isOpen, onClose }) => {
    const [activeSection, setActiveSection] = useState("editor");

    const sections = [
        { id: "editor", icon: IconEdit, label: "Editor" },
        { id: "workspace", icon: IconFolder, label: "Workspace" },
        { id: "terminal", icon: IconTerminal2, label: "Terminal" },
        { id: "themes", icon: IconColorSwatch, label: "Themes" },
        { id: "keybindings", icon: IconKeyboard, label: "Keyboard" },
    ];

    const settings = {
        editor: [
            { label: "Font Size", type: "number", value: 14 },
            { label: "Tab Size", type: "number", value: 2 },
            { label: "Word Wrap", type: "boolean", value: true },
            { label: "Auto Save", type: "boolean", value: true },
        ],
        // Add more settings for other sections
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="w-[900px] h-[600px] bg-neutral-900 rounded-lg shadow-xl flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 border-r border-neutral-700 bg-neutral-800 p-2">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer
                ${activeSection === section.id ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-neutral-700"}`}
                        >
                            <section.icon size={16} />
                            <span>{section.label}</span>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b border-neutral-700 flex justify-between items-center">
                        <h2 className="text-lg font-medium">Settings</h2>
                        <IconX className="cursor-pointer hover:text-gray-400" onClick={onClose} size={20} />
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        {settings[activeSection]?.map((setting, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">{setting.label}</label>
                                {setting.type === "boolean" ? (
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={setting.value}
                                            className="form-checkbox h-4 w-4 text-blue-500"
                                        />
                                    </div>
                                ) : (
                                    <input
                                        type={setting.type}
                                        value={setting.value}
                                        className="bg-neutral-800 text-white px-3 py-2 rounded w-full"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Enhanced Search Panel
const SearchPanel = ({ isOpen, onClose, projectName }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchOptions, setSearchOptions] = useState({
        caseSensitive: false,
        wholeWord: false,
        regex: false,
    });

    useEffect(() => {
        if (searchTerm && isOpen) {
            setIsSearching(true);
            // Simulate search - replace with actual search implementation
            setTimeout(() => {
                setSearchResults([
                    { file: "src/App.js", line: 15, content: "function App() {" },
                    { file: "src/components/Header.js", line: 8, content: "export const Header = () => {" },
                ]);
                setIsSearching(false);
            }, 500);
        }
    }, [searchTerm, searchOptions, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-12 bottom-6 w-96 bg-neutral-900 border-l border-neutral-700 z-40">
            <div className="flex flex-col h-full">
                <div className="p-4 border-b border-neutral-700">
                    <div className="flex items-center gap-2 mb-4">
                        <IconSearch size={20} className="text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search in files..."
                            className="flex-1 bg-neutral-800 text-white px-3 py-2 rounded focus:outline-none"
                        />
                        <IconX size={20} className="cursor-pointer hover:text-gray-400" onClick={onClose} />
                    </div>
                    <div className="flex gap-4 text-sm">
                        {Object.entries(searchOptions).map(([key, value]) => (
                            <label key={key} className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => setSearchOptions((prev) => ({ ...prev, [key]: !value }))}
                                    className="form-checkbox h-3 w-3"
                                />
                                <span className="text-gray-300">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {isSearching ? (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-gray-400">Searching...</span>
                        </div>
                    ) : (
                        searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="p-4 hover:bg-neutral-800 cursor-pointer border-b border-neutral-700"
                            >
                                <div className="flex items-center gap-2 text-sm mb-1">
                                    <IconFile size={16} className="text-gray-400" />
                                    <span className="text-blue-400">{result.file}</span>
                                    <span className="text-gray-500">Line {result.line}</span>
                                </div>
                                <pre className="text-sm text-gray-300 font-mono">{result.content}</pre>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

// Enhanced Command Palette with more commands
const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
    const [search, setSearch] = useState("");
    const inputRef = useRef(null);

    const commands = [
        // File operations
        { label: "New File", icon: IconFilePlus, keybind: "⌘N", category: "File" },
        { label: "New Folder", icon: IconFolderPlus, keybind: "⇧⌘N", category: "File" },
        { label: "Open File", icon: IconFolder, keybind: "⌘O", category: "File" },
        { label: "Save", icon: IconFile, keybind: "⌘S", category: "File" },

        // View operations
        { label: "Toggle Terminal", icon: IconTerminal2, keybind: "⌘J", category: "View" },
        { label: "Toggle Sidebar", icon: IconLayoutSidebarRightCollapse, keybind: "⌘B", category: "View" },
        { label: "Zoom In", icon: IconZoomIn, keybind: "⌘+", category: "View" },
        { label: "Zoom Out", icon: IconZoomOut, keybind: "⌘-", category: "View" },

        // Git operations
        { label: "Git: Clone", icon: IconBrandGithub, keybind: "", category: "Git" },
        { label: "Git: Commit", icon: IconBrandGithub, keybind: "⌘K", category: "Git" },
        { label: "Git: Push", icon: IconBrandGithub, keybind: "⇧⌘P", category: "Git" },

        // Terminal operations
        { label: "Run Task", icon: IconPlayerPlay, keybind: "", category: "Terminal" },
        { label: "NPM Install", icon: IconBrandNpm, keybind: "", category: "Terminal" },
        { label: "Start Dev Server", icon: IconPlayerPlay, keybind: "", category: "Terminal" },
    ];

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredCommands = commands.filter(
        (cmd) =>
            cmd.label.toLowerCase().includes(search.toLowerCase()) ||
            cmd.category.toLowerCase().includes(search.toLowerCase()),
    );

    // Group commands by category
    const groupedCommands: GroupedCommands = filteredCommands.reduce((acc, cmd) => {
        if (!acc[cmd.category]) {
            acc[cmd.category] = [];
        }
        acc[cmd.category].push(cmd);
        return acc;
    }, {});

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-[20vh]">
            <div className="w-[600px] bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 border-b border-neutral-700">
                    <div className="flex items-center gap-2">
                        <IconCommand size={20} className="text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Type a command or search..."
                            className="flex-1 bg-transparent text-white focus:outline-none"
                        />
                    </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    {Object.entries(groupedCommands).map(([category, commands]) => (
                        <div key={category}>
                            <div className="px-4 py-2 text-sm text-gray-400 bg-neutral-900">{category}</div>
                            {commands.map((cmd, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-neutral-700 cursor-pointer flex items-center"
                                    onClick={() => {
                                        // Handle command execution
                                        onClose();
                                    }}
                                >
                                    <cmd.icon size={16} className="mr-2 text-gray-400" />
                                    <span>{cmd.label}</span>
                                    {cmd.keybind && (
                                        <span className="ml-auto text-sm text-gray-400">{cmd.keybind}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { SettingsPanel, SearchPanel, CommandPalette };
