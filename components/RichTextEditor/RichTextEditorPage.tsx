'use client';

import { RichTextEditorContextProvider } from './RichTextEditorContextProvider';
import AmeMarkdownBeautifier from './AmeMarkdownBeautifier';

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
