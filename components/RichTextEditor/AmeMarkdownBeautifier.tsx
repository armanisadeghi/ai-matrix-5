'use client';

import { useState } from 'react';
import { Button, Textarea } from '@mantine/core';
import DynamicRichTextEditor from './DynamicRichTextEditor';
import { useRichTextEditorContext } from './RichTextEditorContextProvider';
import ToolbarControls from './ToolbarControls';
import MakeBoldButton from './controls/MakeBoldButton';
import InsertStarControl from './controls/InsertStarControl';
import { handleToggleView } from './utils/handleToggleView';
import styles from './AmeMarkdownBeautifier.module.css';
import { RichTextEditor } from '@mantine/tiptap';

interface AmeMarkdownBeautifierProps {
    onSave: (content: string) => void;
}

const AmeMarkdownBeautifier: React.FC<AmeMarkdownBeautifierProps> = ({ onSave }) => {
    const [isPlainText, setIsPlainText] = useState(false);
    const [plainText, setPlainText] = useState('');
    const { editor } = useRichTextEditorContext();

    const handleSave = () => {
        if (editor) {
            const content = editor.getHTML();
            onSave(content);
        }
    };

    const handleToggle = () => {
        handleToggleView(isPlainText, setIsPlainText, editor, setPlainText, plainText);
    };

    return (
        <div className={styles.root}>
            <div className={styles.toolbar}>
                <ToolbarControls handleToggleView={handleToggle} />
            </div>
            <div className={styles.content}>
                {!isPlainText ? (
                    <DynamicRichTextEditor editor={editor}>
                        <RichTextEditor.Content style={{ minHeight: '700px' }} />
                    </DynamicRichTextEditor>
                ) : (
                    <Textarea
                        value={plainText}
                        onChange={(event) => setPlainText(event.currentTarget.value)}
                        placeholder="Start typing your text here..."
                        minRows={10}
                        className={styles.textarea}
                        style={{ minHeight: '700px' }}
                    />
                )}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <MakeBoldButton />
                <InsertStarControl />
                <Button onClick={handleToggle} size="sm">
                    {isPlainText ? 'Switch to Rich Text' : 'Switch to Plain Text'}
                </Button>
                <Button onClick={handleSave} size="sm" color="primary">
                    Save
                </Button>
            </div>
        </div>
    );
};

export default AmeMarkdownBeautifier;
