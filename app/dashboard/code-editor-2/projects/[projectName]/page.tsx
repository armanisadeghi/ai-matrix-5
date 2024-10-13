"use client";

import { FileExplorer, Terminal } from "@/app/dashboard/code-editor-2/components";

export default function ProjectPage({ params }: { params: { projectName: string } }) {
    const { projectName } = params;

    const name = decodeURIComponent(projectName);

    if (typeof projectName !== "string") {
        return <div>Invalid project name</div>;
    }

    return (
        <div>
            <h1>Project: {name}</h1>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <h2>File Explorer</h2>
                    <FileExplorer projectName={name} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Terminal</h2>
                    <Terminal projectName={name} />
                </div>
            </div>
            <div>
                <h2>Live Preview</h2>
                <iframe
                    src={`${process.env.NEXT_PUBLIC_API_URL}/preview/${projectName}`}
                    style={{ width: "100%", height: "500px", border: "none" }}
                />
            </div>
        </div>
    );
}
