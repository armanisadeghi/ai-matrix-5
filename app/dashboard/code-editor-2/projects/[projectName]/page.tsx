"use client";

import { FileExplorer, Terminal } from "@/app/dashboard/code-editor-2/components";

export default function ProjectPage({ params }: { params: { projectName: string } }) {
    const { projectName } = params;

    if (typeof projectName !== "string") {
        return <div>Invalid project name</div>;
    }

    return (
        <div>
            <h1>Project: {projectName}</h1>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <h2>File Explorer</h2>
                    <FileExplorer projectName={projectName} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Terminal</h2>
                    <Terminal projectName={projectName} />
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
