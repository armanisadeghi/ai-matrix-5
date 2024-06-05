// ui/highlight/AmeCodeHighlight.tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { LoadingOverlay, Space } from '@mantine/core';
import '@mantine/code-highlight/styles.css';
import styles from './AmeCodeHighlight.module.css';

const CodeHighlight = dynamic(
    () => import('@mantine/code-highlight').then((mod) => mod.CodeHighlight),
    {ssr: false}
);

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
        useLoadingEffect = false,
    }) => {
    const [loading, setLoading] = useState(useLoadingEffect);
    const [expanded, setExpanded] = useState(!startCollapsed);

    useEffect(() => {
        if (useLoadingEffect) {
            const timer = setTimeout(() => setLoading(false), 1000); // Adjust the timer as needed
            return () => clearTimeout(timer);
        }
    }, [useLoadingEffect]);

    return (
        <div className={styles.codeSection}>
            <Space h="xs"/>
            <div className={styles.header}>
                {title}
                <button onClick={() => setExpanded(!expanded)} className={styles.expandButton}>
                    {expanded ? 'Show less' : 'Show full code'}
                </button>
            </div>
            {useLoadingEffect && (
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{
                        radius: 'sm',
                        blur: 2
                    }}
                    loaderProps={{
                        color: 'pink',
                        type: 'bars'
                    }}
                />
            )}
            {!loading && expanded && (
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

export default AmeCodeHighlight;
