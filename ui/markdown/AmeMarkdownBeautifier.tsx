// ui/markdown/AmeMarkdownBeautifier.tsx
'use client'

import { useState } from 'react'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { Button, Textarea } from '@mantine/core'
import { createLowlight } from 'lowlight'
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript'
import FontSize from './fontSizeExtension'
import AmeMarkdownToolbar from './AmeMarkdownToolbar'
import styles from './AmeMarkdownBeautifier.module.css'

const lowlight = createLowlight()
lowlight.register('typescript', tsLanguageSyntax)

interface AmeMarkdownBeautifierProps {
    content: string
}

const AmeMarkdownBeautifier: React.FC<AmeMarkdownBeautifierProps> = ({ content }) => {
    const [isPlainText, setIsPlainText] = useState(false)
    const [plainText, setPlainText] = useState(content)

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
            Color,
            FontSize
        ],
        content
    })

    const handleToggleView = () => {
        if (isPlainText) {
            editor?.commands.setContent(plainText)
        } else {
            setPlainText(editor?.getHTML() || '')
        }
        setIsPlainText(!isPlainText)
    }

    return (
        <RichTextEditor editor={editor}>
            <AmeMarkdownToolbar handleToggleView={handleToggleView} editor={editor} />

            <BubbleMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Link />
                </RichTextEditor.ControlsGroup>
            </BubbleMenu>

            <FloatingMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.BulletList />
                </RichTextEditor.ControlsGroup>
            </FloatingMenu>

            <RichTextEditor.Content className={styles.content} />

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <Button onClick={handleToggleView} size="sm">
                    {isPlainText ? 'Switch to Rich Text' : 'Switch to Plain Text'}
                </Button>
            </div>
        </RichTextEditor>
    )
}

export default AmeMarkdownBeautifier
