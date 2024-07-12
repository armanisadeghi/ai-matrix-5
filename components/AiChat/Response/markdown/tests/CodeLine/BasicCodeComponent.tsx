import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import styles from '@/ui/highlight/AmeCodeHighlight.module.css';

interface BasicCodeComponentProps {
    text: string;
}

const BasicCodeComponent: React.FC<BasicCodeComponentProps> = React.memo(({ text }) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [text]);

    const renderContent = () => {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(text)) !== null) {
            // Add text before the code block
            if (match.index > lastIndex) {
                parts.push(renderText(text.slice(lastIndex, match.index)));
            }

            // Add the code block
            const language = match[1] || 'plaintext';
            const code = match[2].trim();
            parts.push(renderCodeBlock(code, language));

            lastIndex = match.index + match[0].length;
        }

        // Add any remaining text
        if (lastIndex < text.length) {
            parts.push(renderText(text.slice(lastIndex)));
        }

        return parts;
    };

    const renderText = (content: string) => (
        <p key={content} className={styles.textContent}>{content}</p>
    );

    const renderCodeBlock = (code: string, language: string) => (
        <div key={code} className={styles.codeSection}>
            <div className={styles.header}>
                {language}
            </div>
            <pre>
                <code
                    ref={codeRef}
                    className={`language-${language}`}
                >
                    {code}
                </code>
            </pre>
        </div>
    );

    return (
        <div className={styles.basicCodeComponent}>
            {renderContent()}
        </div>
    );
});

BasicCodeComponent.displayName = 'BasicCodeComponent';

export default BasicCodeComponent;
