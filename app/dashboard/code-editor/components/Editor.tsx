"use client";

import React, { useState, useEffect } from "react";
import MonacoEditor, { EditorProps as MonacoEditorProps } from "@monaco-editor/react";

type EditorProps = MonacoEditorProps & {
    value: string;
    onChange: (newContent: string) => void;
};

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
    const [content, setContent] = useState<string>(value);

    useEffect(() => {
        setContent(value);
    }, [value]);

    return (
        <MonacoEditor
            height="400px"
            language="javascript"
            theme="vs-dark"
            value={content}
            onChange={(newContent) => {
                if (newContent !== undefined) {
                    setContent(newContent);
                    onChange(newContent);
                }
            }}
        />
    );
};
