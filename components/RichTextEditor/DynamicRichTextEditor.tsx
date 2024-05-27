import dynamic from 'next/dynamic';
import { RichTextEditorProps } from '@mantine/tiptap';

const DynamicRichTextEditor = dynamic<RichTextEditorProps>(() => import('@mantine/tiptap').then(mod => mod.RichTextEditor), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});

export default DynamicRichTextEditor;
