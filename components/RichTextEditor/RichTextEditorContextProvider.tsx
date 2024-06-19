import React, { createContext, useContext, ReactNode } from 'react'
import { useEditor, Editor } from '@tiptap/react'
import { RichTextEditor } from '@mantine/tiptap'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { createLowlight } from 'lowlight'
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript'

const lowlight = createLowlight()
lowlight.register('typescript', tsLanguageSyntax)

interface RichTextEditorContextProps {
    editor: Editor | null
}

const RichTextEditorContext = createContext<RichTextEditorContextProps | null>(null)

export const useRichTextEditorContext = () => {
    const context = useContext(RichTextEditorContext)
    if (!context) {
        throw new Error(
            'useRichTextEditorContext must be used within a RichTextEditorContextProvider'
        )
    }
    return context
}

interface RichTextEditorContextProviderProps {
    children: ReactNode
    content: string
}

export const RichTextEditorContextProvider: React.FC<RichTextEditorContextProviderProps> = ({
    children,
    content
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            CodeBlockLowlight.configure({ lowlight }),
            Placeholder.configure({ placeholder: 'Start typing your AI Matrix content...' }),
            TextStyle,
            Color
        ],
        content
    })

    if (!editor) {
        return null // or a loader component
    }

    return (
        <RichTextEditorContext.Provider value={{ editor }}>
            <RichTextEditor editor={editor}>{children}</RichTextEditor>
        </RichTextEditorContext.Provider>
    )
}
