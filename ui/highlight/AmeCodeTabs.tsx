// ui/highlight/AmeCodeTabs.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { LoadingOverlay, Space } from '@mantine/core';
import '@mantine/code-highlight/styles.css';
import styles from './AmeCodeHighlight.module.css';

const CodeHighlightTabs = dynamic(
    () => import('@mantine/code-highlight').then((mod) => mod.CodeHighlightTabs),
    { ssr: false }
);

interface AmeCodeTabsProps {
    codeSnippets: { code: string; language: string; title: string }[];
    startCollapsed?: boolean;
    useLoadingEffect?: boolean;
}

const AmeCodeTabs: React.FC<AmeCodeTabsProps> = ({
                                                     codeSnippets,
                                                     startCollapsed = false,
                                                     useLoadingEffect = false,
                                                 }) => {
    const [loading, setLoading] = useState(useLoadingEffect);

    useEffect(() => {
        if (useLoadingEffect) {
            const timer = setTimeout(() => setLoading(false), 1000); // Adjust the timer as needed
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [useLoadingEffect]);

    const formattedSnippets = codeSnippets.map(snippet => ({
        fileName: snippet.title,
        code: snippet.code,
        language: snippet.language,
    }));

    return (
        <div className={styles.codeSection}>
            <Space h="xs" />
            {useLoadingEffect && (
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'pink', type: 'bars' }}
                />
            )}
            {!loading && (
                <CodeHighlightTabs
                    withExpandButton
                    defaultExpanded={!startCollapsed}
                    expandCodeLabel="Show full code"
                    collapseCodeLabel="Show less"
                    code={formattedSnippets}
                />
            )}
            <Space h="xs" />
        </div>
    );
};

export default AmeCodeTabs;
