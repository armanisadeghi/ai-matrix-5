// pages/code-highlight/CodeHighlightDemo.tsx
'use client'

import AmeCodeHighlight from '@/ui/highlight/AmeCodeHighlight'
import {
    exampleCode,
    cssCode,
    pythonCode,
    yamlCode,
    markdownCode,
    shellCode,
    swiftCode,
    phpCode,
    sqlCode,
    jsonCode,
    typescriptCode
} from '../data/exampleCode'
import AmeCodeTabs from '@/ui/highlight/AmeCodeTabs'

const codeSnippets = [
    { code: typescriptCode, language: 'typescript', title: 'TypeScript' },
    { code: cssCode, language: 'css', title: 'CSS' },
    { code: pythonCode, language: 'python', title: 'Python' },
    { code: yamlCode, language: 'yaml', title: 'YAML' },
    { code: markdownCode, language: 'markdown', title: 'Markdown' },
    { code: shellCode, language: 'shell', title: 'Shell' },
    { code: swiftCode, language: 'swift', title: 'Swift' },
    { code: phpCode, language: 'php', title: 'PHP' },
    { code: sqlCode, language: 'sql', title: 'SQL' },
    { code: jsonCode, language: 'json', title: 'JSON' },
    { code: exampleCode, language: 'typescript', title: 'TypeScript' }
]

const CodeHighlightDemo = () => {
    return (
        <div>
            <AmeCodeTabs
                codeSnippets={codeSnippets}
                startCollapsed={false}
                useLoadingEffect={true}
            />
        </div>
    )
}

export default CodeHighlightDemo
