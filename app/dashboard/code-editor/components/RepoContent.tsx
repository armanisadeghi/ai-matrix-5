import React, { useState, useEffect } from "react";
import axios from "axios";

import { IRepoContent } from "../types";
import { Button } from "@mantine/core";

type RepoContentProps = {
    owner: string;
    repo: string;
    path?: string;
};

export const RepoContent: React.FC<RepoContentProps> = ({
    owner,
    repo,
    path = "",
}: {
    owner: string;
    repo: string;
    path?: string;
}) => {
    const [contents, setContents] = useState<IRepoContent[]>([]);
    const [currentPath, setCurrentPath] = useState(path);

    useEffect(() => {
        fetchContents();
    }, [currentPath]);

    const fetchContents = async () => {
        try {
            const response = await axios.get(`/api/github/repos/${owner}/${repo}/contents/${currentPath}`);
            setContents(response.data);
        } catch (error) {
            console.error("Error fetching repo contents:", error);
        }
    };

    const handleFileClick = async (item: IRepoContent) => {
        if (item.type === "dir") {
            setCurrentPath(`${currentPath}/${item.name}`.replace(/^\//, ""));
        } else {
            try {
                const response = await axios.get(`/api/github/repos/${owner}/${repo}/contents/${item.path}`);
                const fileContent = atob(response.data.content);
                importFile(item.name, fileContent);
            } catch (error) {
                console.error("Error fetching file content:", error);
            }
        }
    };

    const importFile = (fileName: string, content: string) => {
        const files = JSON.parse(localStorage.getItem("importedFiles") || "{}");
        files[fileName] = content;
        localStorage.setItem("importedFiles", JSON.stringify(files));
        alert(`File ${fileName} has been imported!`);
    };

    const handleBack = () => {
        setCurrentPath(currentPath.split("/").slice(0, -1).join("/"));
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Repository Contents</h2>
            {currentPath && <Button onClick={handleBack}>Back</Button>}
            <ul className="space-y-2">
                {contents.map((item) => (
                    <li
                        key={item.name}
                        className="cursor-pointer hover:underline"
                        onClick={() => handleFileClick(item)}
                    >
                        {item.type === "dir" ? "📁 " : "📄 "}
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
