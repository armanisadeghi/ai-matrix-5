import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // You can choose a different style
import { Space } from '@mantine/core';
import styles from './AmeCodeHighlight.module.css';


interface HighlightJsCodeBlockProps {
    code: string;
    language: string;
    title: string;
    startCollapsed?: boolean;
}

const HighlightJsCodeBlock: React.FC<HighlightJsCodeBlockProps> = React.memo((
    {
        code,
        language,
        title,
        startCollapsed = false,
    }) => {
    const [expanded, setExpanded] = useState(!startCollapsed);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code, language]);

    return (
        <div className={styles.codeSection}>
            <Space h="xs"/>
            <div className={styles.header}>
                {title}
                <button onClick={() => setExpanded(!expanded)} className={styles.expandButton}>
                    {expanded ? 'Show less' : 'Show full code'}
                </button>
            </div>
            <div className={`${expanded ? '' : styles.codePreviewWrapper}`}>
                <pre>
                    <code
                        ref={codeRef}
                        className={`language-${language} ${expanded ? '' : styles.codePreview}`}
                    >
                        {code}
                    </code>
                </pre>
                {!expanded && <div className={styles.fadeOverlay}></div>}
            </div>
            <Space h="xs"/>
        </div>
    );
});

HighlightJsCodeBlock.displayName = 'HighlightJsCodeBlock';

export default HighlightJsCodeBlock;
