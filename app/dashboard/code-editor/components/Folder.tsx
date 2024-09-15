"use client";

import { useState } from "react";
import { IFileSystemNode } from "../types";

// Helper to recursively render folders and files
export const Folder: React.FC<{
    node: IFileSystemNode;
    onFileClick: (file: IFileSystemNode) => void;
}> = ({ node, onFileClick }) => {
    const [isOpen, setIsOpen] = useState(node.isOpen || false);

    return (
        <div style={{ marginLeft: "10px" }}>
            {node.type === "folder" ? (
                <>
                    <div onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "📂" : "📁"} {node.name}
                    </div>
                    {isOpen &&
                        node.children?.map((child, idx) => <Folder key={idx} node={child} onFileClick={onFileClick} />)}
                </>
            ) : (
                <div onClick={() => onFileClick(node)}>📄 {node.name}</div>
            )}
        </div>
    );
};
