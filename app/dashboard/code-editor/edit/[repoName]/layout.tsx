import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Code Editor",
    description: "A Next.js 14 Code Editor Application",
};

export default function CodeEditorLayout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen flex flex-col bg-neutral-900">{children}</div>;
}
