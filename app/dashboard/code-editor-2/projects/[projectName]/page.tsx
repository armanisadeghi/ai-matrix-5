"use client";

import { ActionIcon, Button, Editor, FileExplorer, Terminal } from "@/app/dashboard/code-editor-2/components";
import React, { useState } from "react";
import { readFile, writeFile } from "@/app/dashboard/code-editor-2/utils";
import { IconColumns2, IconDots, IconMessage } from "@tabler/icons-react";

export default function ProjectPage({ params }: { params: { projectName: string } }) {
    const { projectName } = params;
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string>("");

    const name = decodeURIComponent(projectName);

    const handleFileClick = async (fileName: string) => {
        setSelectedFile(fileName);
        const content = await readFile(projectName, fileName);
        setFileContent(content);
    };

    const handleSave = async () => {
        if (selectedFile) {
            await writeFile(projectName, selectedFile, fileContent);
            console.log("File saved successfully!");
        }
    };

    if (typeof projectName !== "string") {
        return <div>Invalid project name</div>;
    }

    return (
        <div>
            {/*header*/}
            <div className="flex justify-between">
                <div className="flex">
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
                    <h2 className="border-b">Explorer</h2>
                    <FileExplorer projectName={name} onFileClick={handleFileClick} />
                </div>
                <div className="flex flex-col grow">
                    {/*editor & preview*/}
                    <div className="grid grid-cols-2 gap-2">
                        {/*editor*/}
                        <div className="grow">
                            {selectedFile ? (
                                <div className="flex flex-col">
                                    <span>{selectedFile}</span>
                                    <Editor
                                        value={fileContent}
                                        onChange={(value) => setFileContent(value)}
                                        onSave={handleSave}
                                    />
                                </div>
                            ) : (
                                <p>select a file</p>
                            )}
                        </div>
                        {/*preview*/}
                        <div>
                            <span>Live Preview</span>
                            <iframe
                                src={`${process.env.NEXT_PUBLIC_API_URL}/preview/${projectName}`}
                                style={{ width: "100%", height: "500px", border: "none" }}
                            />
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
