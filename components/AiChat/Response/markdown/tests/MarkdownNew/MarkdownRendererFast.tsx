import AmeCodeHighlightNoLoading from '@/ui/highlight/samples/AmeCodeHighlightNoLoading';
import React, { useEffect, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import renderers from './renderers';

interface MarkdownRendererFastProps {
    content: string;
}

const MarkdownRendererFast: React.FC<MarkdownRendererFastProps> = ({ content }) => {
    const [parsedContent, setParsedContent] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const parsedNodes: React.ReactNode[] = [];
        const codeRegex = /(```[\s\S]*?```)/g;

        content.split(codeRegex).forEach((segment, i) => {
            if (segment.startsWith('```')) {
                // This is a code block
                const codeBlockContent = segment.slice(3, -3).trim();
                const languageMatch = /(\w+)/.exec(codeBlockContent.split('\n')[0]);
                const language = languageMatch ? languageMatch[1] : '';

                parsedNodes.push(
                    <AmeCodeHighlightNoLoading
                        key={`code-${i}`}
                        code={codeBlockContent.replace(language, '').trim()}
                        language={language}
                        title={language.charAt(0).toUpperCase() + language.slice(1)}
                    />
                );
            } else {
                // This is regular markdown
                parsedNodes.push(
                    <ReactMarkdown
                        key={`markdown-${i}`}
                        remarkPlugins={[remarkGfm]}
                        components={renderers as Components}
                    >
                        {segment}
                    </ReactMarkdown>
                );
            }
        });

        setParsedContent(parsedNodes);
    }, [content]);

    return <>{parsedContent}</>;
};

export default MarkdownRendererFast;
