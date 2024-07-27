// ui/highlight/AmeCodeHighlight.tsx
'use client';

import { useState } from 'react';
import { CodeHighlight } from '@mantine/code-highlight';
import { Space } from '@mantine/core';
import '@mantine/code-highlight/styles.css';
import styles from './AmeCodeHighlight.module.css';


interface AmeCodeHighlightProps {
    code: string;
    language: string;
    title: string;
    startCollapsed?: boolean;
    useLoadingEffect?: boolean;
}

const AmeCodeHighlight: React.FC<AmeCodeHighlightProps> = (
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
                <CodeHighlight
                    code={code}
                    language={language}
                    highlightOnClient={true}
                />
            <Space h="xs"/>
        </div>
    );
};

export default AmeCodeHighlight;
