import React, { useEffect, useRef, useState, useCallback } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import styles from '@/ui/highlight/AmeCodeHighlight.module.css';

interface BasicCodeComponentProps {
    text: string;
}

const BasicCodeComponent: React.FC<BasicCodeComponentProps> = React.memo(({ text }) => {
    const [lines, setLines] = useState<string[]>([]);
    const preRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        const newLines = text.split('\n');
        let timer: NodeJS.Timeout | null = null;
        let index = 0;

        if (text) { // If text is not empty, start adding lines
            const addLine = () => {
                if (index < newLines.length) {
                    setLines(prevLines => [...prevLines, newLines[index], '']); // Add line and a blank line
                    index++;
                    timer = setTimeout(addLine, 100); // Adjust the timing as needed
                } else {
                    if (timer) {
                        clearTimeout(timer);
                    }
                }
            };

            addLine();
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [text]);

    // Highlight newly added lines of code
    useEffect(() => {
        if (preRef.current) {
            const codeElement = preRef.current.querySelector('code');
            if (codeElement) {
                hljs.highlightElement(codeElement as HTMLElement);
            }
        }
    }, [lines]);

    const renderCodeBlock = (code: string) => {
        return (
            <div className={styles.codeSection}>
                <pre ref={preRef}>
                    <code>
                        {code}
                    </code>
                </pre>
            </div>
        );
    };

    return (
        <div className={styles.basicCodeComponent}>
            {renderCodeBlock(lines.join('\n'))}
        </div>
    );
});

BasicCodeComponent.displayName = 'BasicCodeComponent';

export default BasicCodeComponent;
