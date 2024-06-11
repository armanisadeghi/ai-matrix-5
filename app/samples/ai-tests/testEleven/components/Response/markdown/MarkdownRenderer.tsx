// MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import renderers from './renderers';

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



/*
For logging.

// MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import originalRenderers from './renderers';

// Define a proxy function to log all renderer calls
const logRendererProxy = (renderers) => {
    const handler = {
        get(target, prop) {
            if (typeof target[prop] === 'function') {
                return (props) => {
                    console.log(`Rendering ${prop}`, props);
                    return target[prop](props);
                };
            }
            return target[prop];
        }
    };
    return new Proxy(renderers, handler);
};

// Wrap your original renderers with the proxy
const renderers = logRendererProxy(originalRenderers);

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

 */
