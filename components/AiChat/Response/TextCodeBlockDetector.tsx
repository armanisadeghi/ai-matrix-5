import React from 'react';

interface Props {
    content: string;
}

const CodeBlockDetector: React.FC<Props> = ({ content }) => {
    const lines = content.split('\n');
    const codeBlocks: string[] = [];
    let currentBlock: string[] = [];
    let inCodeBlock = false;

    const isCodeLine = (line: string): boolean => {
        const codePatterns = [
            /^[\s]{2,}/,  // Indented lines
            /[{}\[\]();]/,  // Lines with brackets, parentheses, or semicolons
            /^(function|class|if|for|while|return)\b/,  // Common keywords
            /^(\/\/|#|\/\*)/,  // Comment lines
        ];
        return codePatterns.some(pattern => pattern.test(line));
    };

    lines.forEach((line, index) => {
        if (isCodeLine(line)) {
            if (!inCodeBlock) {
                inCodeBlock = true;
            }
            currentBlock.push(line);
        } else {
            if (inCodeBlock) {
                if (currentBlock.length > 1) {  // Avoid single-line "code blocks"
                    codeBlocks.push(currentBlock.join('\n'));
                }
                inCodeBlock = false;
                currentBlock = [];
            }
        }
    });

    if (inCodeBlock && currentBlock.length > 1) {
        codeBlocks.push(currentBlock.join('\n'));
    }

    const renderContent = () => {
        let lastIndex = 0;
        const elements: React.ReactNode[] = [];

        codeBlocks.forEach((block, index) => {
            const startIndex = content.indexOf(block, lastIndex);
            if (startIndex > lastIndex) {
                elements.push(<span key={`text-${index}`}>{content.slice(lastIndex, startIndex)}</span>);
            }
            elements.push(

/*
                <Prism key={`code-${index}`} language="typescript" withLineNumbers>
                    {block}
                </Prism>
*/
            );
            lastIndex = startIndex + block.length;
        });

        if (lastIndex < content.length) {
            elements.push(<span key="text-last">{content.slice(lastIndex)}</span>);
        }

        return elements;
    };

    return <div>{renderContent()}</div>;
};

export default CodeBlockDetector;
