import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { createProjectFolder, listFiles } from "@/app/dashboard/code-editor-2/utils";
import { IFileNode } from "@/app/dashboard/code-editor-2/components/file-explorer/types";
import { buildFileTree } from "@/app/dashboard/code-editor-2/components/file-explorer/utils";
import { ActionIcon, TextInput } from "@/app/dashboard/code-editor-2/components";
import { IconFilePlus, IconFileText, IconFolder, IconFolderPlus } from "@tabler/icons-react";

interface NewItemInputProps {
    type: "file" | "folder";
    parentPath: string;
    onSubmit: (type: "file" | "folder", name: string, path: string) => void;
    onCancel: () => void;
    level: number;
}

const NewItemInput: React.FC<NewItemInputProps> = ({ type, parentPath, onSubmit, onCancel, level }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("");

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && name.trim()) {
            onSubmit(type, name.trim(), parentPath);
        } else if (e.key === "Escape") {
            onCancel();
        }
    };

    return (
        <div className="flex items-center py-1" style={{ marginLeft: `${level * 16}px` }}>
            {type === "folder" ? <FolderIcon size={16} className="mr-1" /> : <FileIcon size={16} className="mr-1" />}
            <TextInput
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => onCancel()}
                className="bg-neutral-800 border-none outline-none text-sm w-full"
                placeholder={`Enter ${type} name`}
                size="xs"
            />
        </div>
    );
};

interface FileTreeNodeProps {
    node: IFileNode;
    onFileClick: (path: string) => void;
    level: number;
    onCreateItem: (type: "file" | "folder", name: string, path: string) => void;
    isCreating: boolean;
    creationType?: "file" | "folder";
    onCreateStart: (path: string, type: "file" | "folder") => void;
    creatingPath: string;
    onCreateCancel: () => void;
    activeFile: string | null;
    className?: string;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
    node,
    onFileClick,
    level,
    onCreateItem,
    isCreating,
    creationType,
    onCreateStart,
    creatingPath,
    onCreateCancel,
    activeFile,
    className,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        if (node.isDirectory) {
            setIsExpanded(!isExpanded);
        }
    };

    const displayName = node.name.split("/").pop() || "";
    const isActive = activeFile === node.name;

    // Automatically expand folder when creating a new item inside it
    useEffect(() => {
        if (isCreating && creatingPath === node.name) {
            setIsExpanded(true);
        }
    }, [isCreating, creatingPath]);

    const activeFileClass = `bg-blue-500/20 text-blue-400`;
    const hoverFileClass = `hover:bg-neutral-700`;
    const fileClass = `flex items-center group ${hoverFileClass} ${isActive ? activeFileClass : ""} ${className}`;

    return (
        <div>
            <div className={fileClass}>
                <div
                    className="flex items-center cursor-pointer rounded flex-grow py-0.5"
                    onClick={node.isDirectory ? toggleExpand : () => onFileClick(node.name)}
                >
                    {node.isDirectory && (isExpanded ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />)}
                    {node.isDirectory ? (
                        <IconFolder size={14} className="hidden" />
                    ) : (
                        <IconFileText size={14} className="" />
                    )}
                    <span className="ml-1 text-sm">{displayName}</span>
                </div>
                {node.isDirectory && (
                    <div className="space-x-2 opacity-0 mr-2 group-hover:opacity-100 transition-opacity">
                        <ActionIcon onClick={() => onCreateStart(node.name, "file")} className="p-0">
                            <IconFilePlus size={14} />
                        </ActionIcon>
                        <ActionIcon onClick={() => onCreateStart(node.name, "folder")} className="p-0">
                            <IconFolderPlus size={14} />
                        </ActionIcon>
                    </div>
                )}
            </div>
            {isExpanded && (
                <div>
                    {node.children?.map((childNode) => (
                        <FileTreeNode
                            key={childNode.name}
                            node={childNode}
                            onFileClick={onFileClick}
                            level={level + 1}
                            onCreateItem={onCreateItem}
                            isCreating={isCreating}
                            creationType={creationType}
                            onCreateStart={onCreateStart}
                            creatingPath={creatingPath}
                            onCreateCancel={onCreateCancel}
                            activeFile={activeFile}
                            className="pl-2"
                        />
                    ))}
                    {isCreating && creatingPath === node.name && creationType && (
                        <NewItemInput
                            type={creationType}
                            parentPath={node.name}
                            onSubmit={onCreateItem}
                            onCancel={onCreateCancel}
                            level={0}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

interface Props {
    projectName: string;
    onFileClick: (path: string) => void;
    activeFile?: string;
}

export const FileExplorer: React.FC<Props> = ({ projectName, onFileClick, activeFile }) => {
    const [fileTree, setFileTree] = useState<IFileNode[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [creationType, setCreationType] = useState<"file" | "folder">();
    const [creatingPath, setCreatingPath] = useState("");

    const fetchFiles = async () => {
        const fetchedFiles = await listFiles(projectName);
        const tree = buildFileTree(fetchedFiles);
        setFileTree(tree);
    };

    useEffect(() => {
        void fetchFiles();
    }, [projectName]);

    const handleCreateItem = async (type: "file" | "folder", name: string, path: string) => {
        try {
            const fullPath = path ? `${path}/${name}` : name;
            await createProjectFolder(projectName, type, fullPath);
            await fetchFiles();
            setIsCreating(false);
            setCreationType(undefined);
            setCreatingPath("");
        } catch (error) {
            console.error(`Error creating ${type}:`, error);
        }
    };

    const handleCreateStart = (path: string, type: "file" | "folder") => {
        setIsCreating(true);
        setCreationType(type);
        setCreatingPath(path);
    };

    const handleCreateCancel = () => {
        setIsCreating(false);
        setCreationType(undefined);
        setCreatingPath("");
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center p-2 border-b">
                <h2>Explorer</h2>
                <div className="flex">
                    <ActionIcon onClick={() => handleCreateStart("", "file")}>
                        <IconFilePlus size={16} />
                    </ActionIcon>
                    <ActionIcon onClick={() => handleCreateStart("", "folder")}>
                        <IconFolderPlus size={16} />
                    </ActionIcon>
                </div>
            </div>
            <div>
                {fileTree.map((node) => (
                    <FileTreeNode
                        key={node.name}
                        node={node}
                        onFileClick={onFileClick}
                        level={0}
                        onCreateItem={handleCreateItem}
                        isCreating={isCreating}
                        creationType={creationType}
                        onCreateStart={handleCreateStart}
                        creatingPath={creatingPath}
                        onCreateCancel={handleCreateCancel}
                        activeFile={activeFile || null}
                    />
                ))}
                {isCreating && creatingPath === "" && creationType && (
                    <NewItemInput
                        type={creationType}
                        parentPath=""
                        onSubmit={handleCreateItem}
                        onCancel={handleCreateCancel}
                        level={0}
                    />
                )}
            </div>
        </div>
    );
};
