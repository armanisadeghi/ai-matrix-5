import { RichTextEditor } from '@mantine/tiptap';
import { IconColorPicker, IconTextSize } from '@tabler/icons-react';
import { colorPickerColors } from './utils/colorPickerColors';
import styles from './AmeMarkdownBeautifier.module.css';

interface ToolbarControlsProps {
    handleToggleView: () => void;
}

const ToolbarControls: React.FC<ToolbarControlsProps> = ({ handleToggleView }) => (
    <RichTextEditor.Toolbar className={styles.toolbar} sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup className={styles.controlsGroup}>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className={styles.controlsGroup}>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className={styles.controlsGroup}>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className={styles.controlsGroup}>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className={styles.controlsGroup}>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className={styles.controlsGroup}>
            <RichTextEditor.ColorPicker colors={colorPickerColors} />
            <RichTextEditor.Control interactive={false} className={styles.control}>
                <IconColorPicker size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.UnsetColor />

        <RichTextEditor.ControlsGroup className={styles.controlsGroup}>
            <RichTextEditor.Control onClick={handleToggleView} aria-label="Toggle view" title="Toggle view" className={styles.control}>
                <IconTextSize size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
        </RichTextEditor.ControlsGroup>
    </RichTextEditor.Toolbar>
);

export default ToolbarControls;
