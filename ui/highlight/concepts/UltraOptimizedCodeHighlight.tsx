import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Or your preferred style
import { Box, BoxProps } from '@mantine/core';
import styles from './UltraOptimizedCodeHighlight.module.css';


interface UltraOptimizedCodeHighlightProps extends BoxProps {
    code: string;
    language: string;
    title: string;
    startCollapsed?: boolean;
}

const UltraOptimizedCodeHighlight: React.FC<UltraOptimizedCodeHighlightProps> = React.memo((
    {
        code,
        language,
        title,
        startCollapsed = false,
        ...boxProps
    }) => {
    const [expanded, setExpanded] = useState(!startCollapsed);
    const codeRef = useRef<HTMLElement>(null);
    const prevCodeRef = useRef('');
    const updateQueueRef = useRef<string[]>([]);
    const rafIdRef = useRef<number | null>(null);

    const highlightNewCode = useCallback(() => {
        if (codeRef.current && updateQueueRef.current.length > 0) {
            const newCode = updateQueueRef.current.join('');
            updateQueueRef.current = [];

            const tempElement = document.createElement('code');
            tempElement.textContent = newCode;
            tempElement.className = `language-${language}`;
            hljs.highlightElement(tempElement);

            codeRef.current.innerHTML += tempElement.innerHTML;
            prevCodeRef.current += newCode;
        }
        rafIdRef.current = null;
    }, [language]);

    const queueHighlight = useCallback((newCode: string) => {
        updateQueueRef.current.push(newCode);
        if (rafIdRef.current === null) {
            rafIdRef.current = requestAnimationFrame(highlightNewCode);
        }
    }, [highlightNewCode]);

    useEffect(() => {
        if (codeRef.current) {
            if (prevCodeRef.current === '') {
                // Initial highlight
                codeRef.current.textContent = code;
                hljs.highlightElement(codeRef.current);
                prevCodeRef.current = code;
            } else {
                // Queue highlight for new code
                const newCode = code.slice(prevCodeRef.current.length);
                if (newCode) {
                    queueHighlight(newCode);
                }
            }
        }
    }, [code, queueHighlight]);

    useEffect(() => {
        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    const toggleExpand = useCallback(() => setExpanded(prev => !prev), []);

    const headerMemo = useMemo(() => (
        <div className={styles.header}>
            {title}
            <button onClick={toggleExpand} className={styles.expandButton}>
                {expanded ? 'Show less' : 'Show full code'}
            </button>
        </div>
    ), [title, expanded, toggleExpand]);

    return (
        <Box {...boxProps} className={styles.codeSection}>
            {headerMemo}
            <div className={`${expanded ? '' : styles.codePreviewWrapper}`}>
                <pre>
                    <code
                        ref={codeRef}
                        className={`language-${language} ${expanded ? '' : styles.codePreview}`}
                    />
                </pre>
                {!expanded && <div className={styles.fadeOverlay}/>}
            </div>
        </Box>
    );
});

UltraOptimizedCodeHighlight.displayName = 'UltraOptimizedCodeHighlight';

export default UltraOptimizedCodeHighlight;
