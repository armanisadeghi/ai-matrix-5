// TextCodeDetector.tsx

import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Or your preferred style

interface TextCodeDetectorProps {
    text: string;
}

const TextCodeDetector: React.FC<TextCodeDetectorProps> = ({ text }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const codeBlocks = containerRef.current.querySelectorAll('pre code');
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [text]);

    const processText = (input: string) => {
        const lines = input.split('\n');
        let inCodeBlock = false;
        let codeBlock: string[] = [];
        const result: JSX.Element[] = [];
        let consecutiveEmptyLines = 0;

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('```') || (trimmedLine.length > 0 && trimmedLine.split('').every(char => char === '`'))) {
                if (inCodeBlock) {
                    result.push(
                        <pre key={`code-${index}`}>
              <code>{codeBlock.join('\n')}</code>
            </pre>
                    );
                    codeBlock = [];
                }
                inCodeBlock = !inCodeBlock;
                consecutiveEmptyLines = 0;
            } else if (inCodeBlock) {
                codeBlock.push(line);
            } else {
                if (trimmedLine === '') {
                    consecutiveEmptyLines++;
                    result.push(<br key={`br-${index}`} />);
                } else {
                    consecutiveEmptyLines = 0;
                    if (isLikelyCode(line) || (consecutiveEmptyLines > 1 && isLikelyCode(lines[index + 1] || ''))) {
                        if (codeBlock.length === 0) {
                            // Start a new code block
                            codeBlock.push(line);
                        } else {
                            // Add to existing code block
                            codeBlock.push(line);
                        }
                    } else {
                        if (codeBlock.length > 0) {
                            // End the current code block
                            result.push(
                                <pre key={`code-${index}`}>
                  <code>{codeBlock.join('\n')}</code>
                </pre>
                            );
                            codeBlock = [];
                        }
                        result.push(<span key={`text-${index}`}>{line}</span>);
                    }
                }
            }
        });

        if (codeBlock.length > 0) {
            result.push(
                <pre key="code-last">
          <code>{codeBlock.join('\n')}</code>
        </pre>
            );
        }

        return result;
    };

    const isLikelyCode = (line: string): boolean => {
        const codePatterns = [
            /^[\s]{2,}\S+/, // Indented lines
            /[{}\[\]();]/, // Lines with brackets, parentheses, or semicolons
            /^(function|class|if|for|while|return|import|export|const|let|var)\b/, // Common keywords
            /^(\/\/|#|\/\*|\*)/, // Comment lines
            /^\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*[:=]\s*function/, // Function assignments
            /^\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/, // Variable assignments
            /^<[a-zA-Z][^>]*>/, // HTML-like tags
        ];
        return codePatterns.some(pattern => pattern.test(line));
    };

    return (
        <div ref={containerRef} style={{ whiteSpace: 'pre-wrap' }}>
            {processText(text)}
        </div>
    );
};

export default TextCodeDetector;
