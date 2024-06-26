// MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import renderers from './renderers';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]} components={renderers as Components}>
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
