'use client';

import React, { useState, useEffect } from 'react';
import { Space } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import styles from './AmeCodeHighlight.module.css';


interface AmeFastCodeProps {
    code: string;
    language: string;
    title: string;
    startCollapsed?: boolean;
}

const AmeFastCode: React.FC<AmeFastCodeProps> = React.memo((
    {
        code,
        language,
        title,
        startCollapsed = false,
    }) => {
    const [expanded, setExpanded] = useState(!startCollapsed);
    const [isHighlighting, setIsHighlighting] = useState(true);

    useEffect(() => {
        setIsHighlighting(true);
        const timer = setTimeout(() => setIsHighlighting(false), 0);
        return () => clearTimeout(timer);
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
                {!isHighlighting && (
                    <CodeHighlight
                        code={code}
                        language={language as any}
                        highlightOnClient
                        className={expanded ? '' : styles.codePreview}
                    />
                )}
                {!expanded && <div className={styles.fadeOverlay}></div>}
            </div>
            <Space h="xs"/>
        </div>
    );
});

AmeFastCode.displayName = 'AmeFastCode';

export default AmeFastCode;
