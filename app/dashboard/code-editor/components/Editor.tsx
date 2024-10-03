"use client";

import MonacoEditor, { EditorProps as MonacoEditorProps } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { getLanguageFromExtension, supabaseIndexedDBStore } from "../utils";

type EditorProps = MonacoEditorProps & {
    repoName: string;
    value: string;
    filename: string;
    onChange: (newContent: string) => void;
    height?: number | string;
};

export const Editor: React.FC<EditorProps> = ({ repoName, value, onChange, filename, height }) => {
    const [content, setContent] = useState<string>(value);
    const [isLoading, setIsLoading] = useState(false);
    const language = getLanguageFromExtension(filename);
    const editorRef = useRef<any>(null);

    function handleEditorDidMount(editor, _monaco) {
        editorRef.current = editor;
    }

    function handleEditorChange(value, _event) {
        console.log("here is the current model value:", value);
        setContent(value);
        onChange(value);
    }

    useEffect(() => {
        setContent(value);
    }, [value]);

    useEffect(() => {
        if (editorRef.current) {
            const editor = editorRef.current;

            // Add keybinding for Ctrl + S
            // @ts-expect-error - monaco instance throwing error
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
                saveFileContent();
            });

            // Save on blur (when editor loses focus)
            editor.onDidBlurEditorWidget(() => {
                saveFileContent();
            });
        }
    }, [editorRef.current, filename]);

    const saveFileContent = async () => {
        if (editorRef.current) {
            setIsLoading(true);
            const currentContent = editorRef.current.getValue();
            try {
                await supabaseIndexedDBStore.saveFileContent(repoName, filename, currentContent);
                console.log(`File ${filename} saved to IndexedDB`);
                setIsLoading(false);
            } catch (error) {
                console.error(`Error saving file ${filename}:`, error);
                setIsLoading(false);
            }
        }
    };

    if (isLoading) {
        return <div className="h-full flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="h-full">
            <MonacoEditor
                height={height || "100%"}
                theme="vs-dark"
                value={content}
                language={language}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                    scrollBeyondLastLine: false,
                    minimap: { enabled: false },
                }}
            />
        </div>
    );
};
