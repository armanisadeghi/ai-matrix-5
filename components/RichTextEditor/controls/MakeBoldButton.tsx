// ui/markdown/controls/MakeBoldButton.tsx
import { Button } from '@mantine/core';
import { useRichTextEditorContext } from '../RichTextEditorContextProvider';

const MakeBoldButton = () => {
    const { editor } = useRichTextEditorContext();
    return (
        <Button onClick={() => editor?.chain().focus().toggleBold().run()} size="sm" style={{ marginRight: '0.5rem' }}>
            Make bold
        </Button>
    );
};

export default MakeBoldButton;
