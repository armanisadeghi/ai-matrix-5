// MarkdownRenderer.tsx
import React, { useMemo } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import renderers from './renderers';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const memoizedContent = useMemo(() => content, [content]);

    return (
        <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]} components={renderers as Components}>
            {memoizedContent}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
