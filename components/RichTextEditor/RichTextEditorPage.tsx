// nice-working/RichTextEditor/RichTextEditorPage.tsx

"use client";

import AmeMarkdownBeautifier from "./AmeMarkdownBeautifier";
import { RichTextEditorContextProvider } from "./RichTextEditorContextProvider";

interface RichTextEditorPageProps {
    content: string;
    onSave: (content: string) => void;
}

const RichTextEditorPage: React.FC<RichTextEditorPageProps> = ({ content, onSave }) => {
    return (
        <RichTextEditorContextProvider content={content}>
            <AmeMarkdownBeautifier onSave={onSave} />
        </RichTextEditorContextProvider>
    );
};

export default RichTextEditorPage;
