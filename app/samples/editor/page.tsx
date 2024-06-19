// pages/MarkdownDemo.tsx
'use client'

import RichTextEditorPage from '@/components/RichTextEditor/RichTextEditorPage'

const MarkdownDemo = () => {
    const handleSave = (content: string) => {
        console.log('Saved content:', content)
        // Implement your save logic here
    }

    return (
        <div>
            <RichTextEditorPage content="<p>Initial content</p>" onSave={handleSave} />
        </div>
    )
}

export default MarkdownDemo
