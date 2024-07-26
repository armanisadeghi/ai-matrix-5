'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Space } from '@mantine/core';
import '@mantine/code-highlight/styles.css';
import styles from '@/ui/highlight/AmeCodeHighlight.module.css';

const CodeHighlight = dynamic(
    () => import('@mantine/code-highlight').then((mod) => mod.CodeHighlight),
    {ssr: false}
);

interface AmeCodeHighlightNoLoadingProps {
    code: string;
    language: string;
    title: string;
    startCollapsed?: boolean;
}

const AmeCodeHighlightNoLoading: React.FC<AmeCodeHighlightNoLoadingProps> = (
    {
        code,
        language,
        title,
        startCollapsed = false,
    }) => {
    const [expanded, setExpanded] = useState(!startCollapsed);

    return (
        <div className={styles.codeSection}>
            <Space h="xs"/>
            <div className={styles.header}>
                {title}
                <button onClick={() => setExpanded(!expanded)} className={styles.expandButton}>
                    {expanded ? 'Show less' : 'Show full code'}
                </button>
            </div>
            {expanded && (
                <CodeHighlight
                    code={code}
                    language={language}
                    highlightOnClient={true}
                />
            )}
            <Space h="xs"/>
        </div>
    );
};

export default AmeCodeHighlightNoLoading;
