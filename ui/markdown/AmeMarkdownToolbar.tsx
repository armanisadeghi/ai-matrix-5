// ui/markdown/AmeMarkdownToolbar.tsx
'use client';

import { RichTextEditor } from '@mantine/tiptap';
import { IconTextColor, IconHighlight, IconTextSize, IconAlignLeft, IconAlignCenter, IconAlignRight } from '@tabler/icons-react';
import { BiUndo, BiRedo } from "react-icons/bi";

interface AmeMarkdownToolbarProps {
    editor: any;
    handleToggleView: () => void;
}

const AmeMarkdownToolbar: React.FC<AmeMarkdownToolbarProps> = ({ editor, handleToggleView }) => {
    if (!editor) {
        return null;
    }

    return (
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
                <RichTextEditor.CodeBlock />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
                <RichTextEditor.H5 />
                <RichTextEditor.H6 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.ColorPicker
                    colors={[
                        '#25262b',
                        '#868e96',
                        '#fa5252',
                        '#e64980',
                        '#be4bdb',
                        '#7950f2',
                        '#4c6ef5',
                        '#228be6',
                        '#15aabf',
                        '#12b886',
                        '#40c057',
                        '#82c91e',
                        '#fab005',
                        '#fd7e14',
                    ]}
                />
                <RichTextEditor.Control interactive={false}>
                    <IconTextColor size="1rem" stroke={1.5} />
                </RichTextEditor.Control>
                <RichTextEditor.Color color="#F03E3E" />
                <RichTextEditor.Color color="#7048E8" />
                <RichTextEditor.Color color="#1098AD" />
                <RichTextEditor.Color color="#37B24D" />
                <RichTextEditor.Color color="#F59F00" />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.UnsetColor />

            {/* New Controls for Undo, Redo, and Toggle View */}
            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Control onClick={() => editor.chain().focus().undo().run()} aria-label="Undo" title="Undo">
                    <BiUndo size="1rem" />
                </RichTextEditor.Control>
                <RichTextEditor.Control onClick={() => editor.chain().focus().redo().run()} aria-label="Redo" title="Redo">
                    <BiRedo size="1rem" />
                </RichTextEditor.Control>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Control onClick={handleToggleView} aria-label="Toggle view" title="Toggle view">
                    <IconTextSize size="1rem" stroke={1.5} />
                </RichTextEditor.Control>
            </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
    );
};

export default AmeMarkdownToolbar;
