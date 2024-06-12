// MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import renderers from './renderers';  // Ensure this import path matches the location of your renderers

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]} components={renderers}>
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
