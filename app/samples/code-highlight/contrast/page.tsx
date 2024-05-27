// pages/code-highlight/CodeHighlightDemo.tsx
'use client';

import AmeCodeHighlight from '@/ui/highlight/AmeCodeHighlight';
import { exampleCode, cssCode, pythonCode } from '../data/exampleCode';

const codeSnippets = [
    { code: exampleCode, language: 'typescript', title: 'TypeScript' },
    { code: cssCode, language: 'css', title: 'CSS' },
    { code: pythonCode, language: 'python', title: 'Python' }
];

const CodeHighlightDemo = () => {
    return (
        <div>
            {codeSnippets.map((snippet, index) => (
                <AmeCodeHighlight
                    key={index}
                    code={snippet.code}
                    language={snippet.language}
                    title={snippet.title}
                />
            ))}
        </div>
    );
};

export default CodeHighlightDemo;
