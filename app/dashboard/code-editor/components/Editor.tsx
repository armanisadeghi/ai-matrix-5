"use client";

import MonacoEditor, { EditorProps as MonacoEditorProps } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { getLanguageFromExtension } from "../utils";

type EditorProps = MonacoEditorProps & {
    value: string;
    filename: string;
    onChange: (newContent: string) => void;
};

export const Editor: React.FC<EditorProps> = ({ value, onChange, filename }) => {
    const [content, setContent] = useState<string>(value);
    const language = getLanguageFromExtension(filename);

    useEffect(() => {
        setContent(value);
    }, [value]);

    return (
        <MonacoEditor
            height="75dvh"
            theme="vs-dark"
            value={content}
            language={language}
            onChange={(newContent) => {
                if (newContent !== undefined) {
                    setContent(newContent);
                    onChange(newContent);
                }
            }}
        />
    );
};
