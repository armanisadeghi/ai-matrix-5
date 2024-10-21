import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { listFiles } from "@/app/dashboard/code-editor-2/utils";
import { IFileNode } from "@/app/dashboard/code-editor-2/components/file-explorer/types";
import { buildFileTree } from "@/app/dashboard/code-editor-2/components/file-explorer/utils";

interface Props {
    projectName: string;
    onFileClick: (path: string) => void;
}

const FileTreeNode: React.FC<{ node: IFileNode; onFileClick: (path: string) => void }> = ({ node, onFileClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        if (node.isDirectory) {
            setIsExpanded(!isExpanded);
        }
    };

    const displayName = node.name.split("/").pop() || "";

    return (
        <div>
            <div
                className="flex items-center cursor-pointer hover:bg-neutral-700 rounded px-1 py-0.5"
                onClick={node.isDirectory ? toggleExpand : () => onFileClick(node.name)}
            >
                {node.isDirectory && (isExpanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />)}
                {node.isDirectory ? <FolderIcon size={16} className="mr-1" /> : <FileIcon size={16} className="mr-1" />}
                <span className="text-sm">{displayName}</span>
            </div>
            {isExpanded && node.children && node.children.length > 0 && (
                <div className="ml-4">
                    {node.children.map((childNode) => (
                        <FileTreeNode key={childNode.name} node={childNode} onFileClick={onFileClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const FileExplorer: React.FC<Props> = ({ projectName, onFileClick }) => {
    const [fileTree, setFileTree] = useState<IFileNode[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const fetchedFiles = await listFiles(projectName);
            const tree = buildFileTree(fetchedFiles);
            setFileTree(tree);
        };
        void fetchFiles();
    }, [projectName]);

    return (
        <div className="flex flex-col w-full">
            {fileTree.map((node) => (
                <FileTreeNode key={node.name} node={node} onFileClick={onFileClick} />
            ))}
        </div>
    );
};
