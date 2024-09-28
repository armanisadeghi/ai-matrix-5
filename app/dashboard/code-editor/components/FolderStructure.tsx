"use client";

import { Menu } from "@mantine/core";
import {
    IconChevronDown,
    IconChevronRight,
    IconDotsVertical,
    IconFolderFilled,
    IconFolderOpen,
    IconPencil,
    IconSearch,
    IconTrash,
} from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";

import { IRepoData } from "../types";
import { getIconFromExtension, indexedDBStore } from "../utils";
import { IFile } from "../workspace/[repoName]/page";
import { TextInput } from "./Inputs";

type IFileNode = {
    name: string;
    isFolder: boolean;
    content?: string | null;
    children?: IFileNode[];
    matches?: boolean;
    path: string;
};

export function buildTree(repoData: IRepoData): IFileNode[] {
    const root: IFileNode[] = [];

    if (repoData?.files) {
        const sortedKeys = Object.keys(repoData.files).sort();

        sortedKeys.forEach((key) => {
            const value = repoData.files[key];
            const parts = key.split("/");
            let currentLevel = root;

            parts.forEach((part, index) => {
                if (part === "") return; // Skip empty parts (e.g., trailing slashes)

                let existingNode = currentLevel.find((node) => node.name === part);

                if (!existingNode) {
                    existingNode = {
                        name: part,
                        content: index === parts.length - 1 ? value : null,
                        isFolder: index < parts.length - 1,
                        children: index < parts.length - 1 ? [] : undefined,
                        path: key,
                    };
                    currentLevel.push(existingNode);
                }

                if (index < parts.length - 1) {
                    currentLevel = existingNode.children!;
                }
            });
        });
    }

    // Recursive function to sort each level of the tree
    const sortLevel = (level: IFileNode[]): IFileNode[] => {
        return level
            .sort((a, b) => {
                if (a.isFolder && !b.isFolder) return -1;
                if (!a.isFolder && b.isFolder) return 1;
                return a.name.localeCompare(b.name);
            })
            .map((node) => {
                if (node.children) {
                    node.children = sortLevel(node.children);
                }
                return node;
            });
    };

    // Sort the entire tree
    return sortLevel(root);
}

const flattenTree = (nodes: IFileNode[], parentPath: string = ""): IFileNode[] => {
    return nodes.reduce((acc: IFileNode[], node) => {
        const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
        const newNode = { ...node, path: currentPath };
        acc.push(newNode);
        if (node.children) {
            acc.push(...flattenTree(node.children, currentPath));
        }
        return acc;
    }, []);
};

const buildSearchTree = (results: IFileNode[]): IFileNode[] => {
    const tree: IFileNode[] = [];
    const map = new Map<string, IFileNode>();

    results.forEach((node) => {
        const parts = node.path.split("/");
        let currentPath = "";
        parts.forEach((part, index) => {
            currentPath += (currentPath ? "/" : "") + part;

            if (!map.has(currentPath)) {
                const isFolder = index < parts.length - 1 || node.isFolder;
                const newNode: IFileNode = {
                    name: part,
                    isFolder: isFolder,
                    children: isFolder ? [] : undefined,
                    path: currentPath,
                    matches: currentPath === node.path,
                    content: !isFolder ? node.content : undefined,
                };
                map.set(currentPath, newNode);
                if (index === 0) {
                    tree.push(newNode);
                } else {
                    const parentPath = parts.slice(0, index).join("/");
                    const parent = map.get(parentPath);
                    if (parent && parent.children) {
                        parent.children.push(newNode);
                    }
                }
            }
        });
    });

    return tree;
};

type TreeNodeProps = React.HTMLAttributes<HTMLDivElement> & {
    node: IFileNode;
    path: string;
    repoName: string;
    onFileSelect?: (path: string, content: string) => void;
    onFolderSelect: (path: string) => void;
    onUpdate: () => void;
    activeFolder: string;
    selectedFile: IFile;
};

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    path,
    repoName,
    onFileSelect,
    onFolderSelect,
    onUpdate,
    activeFolder,
    selectedFile,
    ...others
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(node.name);
    const fullPath = path ? `${path}/${node.name}` : node.name;
    const isActive = fullPath === activeFolder;

    const handleFolderClick = () => {
        setIsExpanded(!isExpanded);
        onFolderSelect(fullPath);
    };

    const decodeBase64 = (content: string) => atob(content);

    const FileIcon = node.isFolder ? (isExpanded ? IconFolderOpen : IconFolderFilled) : getIconFromExtension(node.name);

    const handleRename = async () => {
        if (isRenaming) {
            const oldPath = fullPath;
            const newPath = path ? `${path}/${newName}` : newName;

            try {
                if (node.isFolder) {
                    await indexedDBStore.updateFolder(repoName, oldPath, newPath);
                } else {
                    const content = node.content ? decodeBase64(node.content) : "";
                    await indexedDBStore.updateFile(repoName, oldPath, newPath, content);
                }
                onUpdate();
            } catch (error) {
                console.error("Error renaming:", error);
                // Handle error (e.g., show error message to user)
            }

            setIsRenaming(false);
        } else {
            setIsRenaming(true);
        }
    };

    const handleDelete = async () => {
        try {
            if (node.isFolder) {
                await indexedDBStore.deleteFolder(repoName, fullPath);
            } else {
                await indexedDBStore.deleteFile(repoName, fullPath);
            }
            onUpdate();
        } catch (error) {
            console.error("Error deleting:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    const activeFolderClass = node.isFolder
        ? isActive
            ? "font-medium"
            : isExpanded
              ? "font-medium"
              : "font-normal"
        : "subtle";
    const activeFileClass = !node.isFolder && selectedFile?.path === fullPath ? "bg-neutral-700" : "bg-neutral-0";

    useEffect(() => {
        setIsExpanded(node.isFolder && node.name === fullPath && selectedFile?.path.split("/").includes(fullPath));
    }, [selectedFile]);

    return (
        <div {...others}>
            <div className="flex items-center gap-2">
                {isRenaming ? (
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleRename}
                        autoFocus
                    />
                ) : (
                    <button
                        className={`flex-grow p-1 flex items-center gap-2 text-sm text-white rounded transition ease-in-out delay-150 border border-transparent hover:border-neutral-500
                             ${activeFolderClass} ${activeFileClass}
                             `}
                        onClick={
                            node.isFolder
                                ? handleFolderClick
                                : () => onFileSelect!(fullPath, decodeBase64(node?.content ?? ""))
                        }
                    >
                        <FileIcon size={16} className={node.isFolder ? "text-yellow-400" : ""} />
                        <span>{node.name}</span>
                    </button>
                )}
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <button className="">
                            <IconDotsVertical size={16} />
                        </button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconPencil size={16} />} onClick={handleRename}>
                            Rename
                        </Menu.Item>
                        <Menu.Item leftSection={<IconTrash size={16} />} onClick={handleDelete}>
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            {node.isFolder &&
                isExpanded &&
                node.children?.map((child) => (
                    <TreeNode
                        key={child.name}
                        node={child}
                        path={fullPath}
                        repoName={repoName}
                        onFileSelect={onFileSelect}
                        onFolderSelect={onFolderSelect}
                        onUpdate={onUpdate}
                        activeFolder={activeFolder}
                        style={{ marginLeft: 12 }}
                        selectedFile={selectedFile}
                    />
                ))}
        </div>
    );
};

type FileTreeProps = {
    treeData: IFileNode[];
    repoName: string;
    onFileSelect: (path: string, content: string) => void;
    onFolderSelect: (path: string) => void;
    onUpdate: () => Promise<void> | void;
    activeFolder: string;
    selectedFile: IFile;
};

export const FileTree: React.FC<FileTreeProps> = ({
    treeData,
    repoName,
    onFileSelect,
    onFolderSelect,
    onUpdate,
    activeFolder,
    selectedFile,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<IFileNode[]>([]);

    const allNodes = useMemo(() => flattenTree(treeData), [treeData]);

    useEffect(() => {
        if (searchQuery) {
            const results = allNodes.filter(
                (node) =>
                    node.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    node.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setSearchResults(buildSearchTree(results));
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, allNodes]);

    const handleSearchResultSelect = (node: IFileNode) => {
        if (node.isFolder) {
            onFolderSelect(node.path!);
        } else {
            onFileSelect(node.path!, node.content || "");
        }
    };

    return (
        <div className="h-full">
            <p className="text-xs font-normal py-2 uppercase">Explorer</p>
            <TextInput
                placeholder="Search files..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                icon={<IconSearch size={16} />}
            />
            {searchQuery
                ? searchResults.map((node, index) => (
                      <SearchResultNode
                          key={index}
                          node={node}
                          onSelect={handleSearchResultSelect}
                          depth={0}
                          searchQuery={searchQuery}
                      />
                  ))
                : treeData.map((node) => (
                      <TreeNode
                          key={node.name}
                          node={node}
                          path=""
                          repoName={repoName}
                          onFileSelect={onFileSelect}
                          onFolderSelect={onFolderSelect}
                          onUpdate={onUpdate}
                          activeFolder={activeFolder}
                          selectedFile={selectedFile}
                      />
                  ))}
        </div>
    );
};

interface SearchResultNodeProps {
    node: IFileNode;
    onSelect: (node: IFileNode) => void;
    depth: number;
    searchQuery: string;
}

const SearchResultNode: React.FC<SearchResultNodeProps> = ({ node, onSelect, depth, searchQuery }) => {
    const [isExpanded, setIsExpanded] = useState(!node.matches); // Expand if it's not the matching node
    const FileIcon = node.isFolder ? (isExpanded ? IconFolderOpen : IconFolderFilled) : getIconFromExtension(node.name);
    const hasChildren = node.children && node.children.length > 0;

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const highlight = (text: string) => {
        if (!searchQuery) return text;
        const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
                <span key={index} className="bg-yellow-500 text-black">
                    {part}
                </span>
            ) : (
                part
            ),
        );
    };

    return (
        <div style={{ marginLeft: `${depth * 16}px` }}>
            <div
                className={`flex items-center gap-2 p-1 cursor-pointer hover:bg-neutral-700 ${
                    node.matches ? "bg-blue-500" : ""
                }`}
                onClick={() => onSelect(node)}
            >
                {node.isFolder && (
                    <span onClick={toggleExpand}>
                        {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                    </span>
                )}
                <FileIcon size={16} className={node.isFolder ? "text-yellow-400" : ""} />
                <span>{highlight(node.name)}</span>
            </div>
            {isExpanded && hasChildren && (
                <div>
                    {node.children!.map((child, index) => (
                        <SearchResultNode
                            key={index}
                            node={child}
                            onSelect={onSelect}
                            depth={depth + 1}
                            searchQuery={searchQuery}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
