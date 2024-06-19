// ui/markdown/utils/handleToggleView.tsx
import { Editor } from '@tiptap/react'

export const handleToggleView = (
    isPlainText: boolean,
    setIsPlainText: (value: boolean) => void,
    editor: Editor | null,
    setPlainText: (value: string) => void,
    plainText: string
) => {
    if (isPlainText) {
        editor?.commands.setContent(plainText)
    } else {
        setPlainText(editor?.getHTML() || '')
    }
    setIsPlainText(!isPlainText)
}
