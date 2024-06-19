// ui/highlight/AmeMultiCodeHighlight.tsx
'use client'

import React from 'react'
import AmeCodeHighlight from './AmeCodeHighlight'

interface CodeSnippet {
    code: string
    language: string
    title: string
}

interface AmeMultiCodeHighlightProps {
    codeSnippets: CodeSnippet[]
    startCollapsed?: boolean
    useLoadingEffect?: boolean
}

const AmeMultiCodeHighlight: React.FC<AmeMultiCodeHighlightProps> = ({
    codeSnippets,
    startCollapsed = false,
    useLoadingEffect = false
}) => {
    return (
        <div>
            {codeSnippets.map((snippet, index) => (
                <AmeCodeHighlight
                    key={index}
                    code={snippet.code}
                    language={snippet.language}
                    title={snippet.title}
                    startCollapsed={startCollapsed}
                    useLoadingEffect={useLoadingEffect}
                />
            ))}
        </div>
    )
}

export default AmeMultiCodeHighlight
