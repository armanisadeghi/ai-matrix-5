import MonacoEditor, { EditorProps as MonacoEditorProps } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRef } from "react";
import { getLanguageFromExtension } from "@/app/dashboard/code-editor-2/utils";

// todo: prompt instruction
// ## Task: Code Completion
//
// ### Language: ${language}
//
// ### Instructions:
// - You are a world class coding assistant.
// - Given the current text, context, and the last character of the user input, provide a suggestion for code completion.
// - The suggestion must be based on the current text, as well as the text before the cursor.
// - This is not a conversation, so please do not ask questions or prompt for additional information.
//
// ### Notes
// - NEVER INCLUDE ANY MARKDOWN IN THE RESPONSE - THIS MEANS CODEBLOCKS AS WELL.
// - Never include any annotations such as "# Suggestion:" or "# Suggestions:".
// - Newlines should be included after any of the following characters: "{", "[", "(", ")", "]", "}", and ",".
// - Never suggest a newline after a space or newline.
// - Ensure that newline suggestions follow the same indentation as the current line.
// - The suggestion must start with the last character of the current user input.
// - Only ever return the code snippet, do not return any markdown unless it is part of the code snippet.
// - Do not return any code that is already present in the current text.
// - Do not return anything that is not valid code.
// - If you do not have a suggestion, return an empty string.`

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
            defaultValue="// start typing"
            language={language}
            value={value}
            theme="vs-dark"
            onMount={handleEditorDidMount}
        />
    );
};
