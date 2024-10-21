import MonacoEditor, { EditorProps as MonacoEditorProps } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRef } from "react";
import { getLanguageFromExtension } from "@/app/dashboard/code-editor-2/utils";

interface EditorProps extends MonacoEditorProps {
    fileName?: string;
    onSave: () => Promise<void>;
}

export const Editor: React.FC<EditorProps> = ({ value, onSave, fileName }) => {
    const language = getLanguageFromExtension(fileName);
    const editorRef = useRef<any>(null);

    const handleEditorDidMount = (editor, monacoInstance) => {
        editorRef.current = editor;

        // Add keybinding for Ctrl + S
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            void onSave();
        });

        editor.addAction({
            id: "triggerAiSuggestions",
            label: "Trigger AI Suggestions",
            contextMenuGroupId: "0_customGroup",
            contextMenuOrder: 1,
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI], // Ctrl+I or Cmd+I
            run: (_editor) => {
                console.log("show ai suggestion");
            },
        });

        // Save on blur
        editor.onDidBlurEditorWidget(() => {
            void onSave();
        });
    };

    return (
        <MonacoEditor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            language={language}
            value={value}
            theme="vs-dark"
            onMount={handleEditorDidMount}
        />
    );
};
