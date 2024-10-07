"use client";

import MonacoEditor, { EditorProps as MonacoEditorProps } from "@monaco-editor/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getLanguageFromExtension, indexedDBStore } from "../utils";
import * as monaco from "monaco-editor"; // Ensure monaco-editor is imported correctly
import { editor as coreEditor } from "monaco-editor-core";
import { useEditorSave } from "@/app/dashboard/code-editor/hooks";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { Textarea } from "@/app/dashboard/code-editor/components/Inputs";
import { ActionIcon } from "@/app/dashboard/code-editor/components/Buttons";
import { IconSend } from "@tabler/icons-react";
import { createChatStart, sendUserPrompt } from "@/app/dashboard/code-editor/supabase/aiChat";
import { useRecoilValue } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
import useOpenAiStreamer from "@/hooks/ai/useOpenAiStreamer";
import IStandaloneEditorConstructionOptions = coreEditor.IStandaloneEditorConstructionOptions;

const OPTIONS: IStandaloneEditorConstructionOptions = {
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: "on",
    accessibilitySupport: "auto",
    autoIndent: "keep",
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: "blink",
    cursorSmoothCaretAnimation: "off",
    cursorStyle: "line",
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: true,
    foldingStrategy: "auto",
    fontLigatures: false,
    formatOnPaste: false,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    links: true,
    mouseWheelZoom: false,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: "alt",
    overviewRulerBorder: true,
    overviewRulerLanes: 2,
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    readOnly: false,
    renderControlCharacters: false,
    renderFinalNewline: "on",
    renderLineHighlight: "all",
    renderWhitespace: "none",
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 5,
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: "mouseover",
    smoothScrolling: false,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: "currentDocument",
    wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
    wordWrap: "off",
    wordWrapBreakAfterCharacters: "\t})]?|&,;",
    wordWrapBreakBeforeCharacters: "{([+",
    wordWrapColumn: 80,
    wrappingIndent: "none",
};

const store = indexedDBStore;

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
    const [aiOpened, { open: aiOpen, close: aiClose }] = useDisclosure(false);
    const [userInput, setUserInput] = useState("");
    const language = getLanguageFromExtension(filename);
    const editorRef = useRef<any>(null);
    const { saveFileContent } = useEditorSave(editorRef, repoName, filename, setIsLoading);
    const userId = useRecoilValue(activeUserAtom).matrixId;
    const [activeChatId, setActiveChatId] = useState("");

    useOpenAiStreamer({ chatId: activeChatId });

    const handleEditorDidMount = (editor, _monacoInstance) => {
        editorRef.current = editor;

        // Add keybinding for Ctrl + S
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            void handleSaveContent();
        });

        editor.addAction({
            id: "ask-ai-matrx",
            label: "Ask AI",
            contextMenuGroupId: "0_customGroup", // High-precedence group
            contextMenuOrder: 0, // Top order within the group
            run: (editor) => {
                handleAiOpen();
            },
        });

        // Save on blur
        editor.onDidBlurEditorWidget(() => {
            void handleSaveContent();
        });
    };

    const handleEditorChange = (value, _event) => {
        console.log("here is the current model value:", value);
        setContent(value);
        onChange(value);
    };

    const handleSaveContent = async () => {
        if (editorRef.current) {
            setIsLoading(true);
            try {
                await saveFileContent();
                console.log(`File ${filename} saved to IndexedDB`);
                setIsLoading(false);
            } catch (error) {
                console.error(`Error saving file ${filename}:`, error);
                setIsLoading(false);
            }
        }
    };

    const handleAiOpen = () => {
        aiOpen();
    };

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    }, []);

    const handleSubmitMessage = async () => {
        const text = userInput || "";

        if (text.trim().length === 0) return;

        if (text) {
            console.log(`User input:: ${text}`);

            const newChat = await createChatStart(text, userId);

            console.log({ newChat });

            setActiveChatId(newChat.chatId);

            const response = await sendUserPrompt(text, newChat.chatId, newChat);

            console.log({ response });
        } else {
            aiClose();
        }
    };

    useEffect(() => {
        setContent(value);
    }, [value]);

    if (isLoading) {
        return <div className="h-full flex items-center justify-center">Loading...</div>;
    }

    return (
        <>
            <div className="h-full">
                <MonacoEditor
                    height={height || "100%"}
                    theme="vs-dark"
                    value={content}
                    language={language}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    options={OPTIONS}
                />
            </div>
            <Modal opened={aiOpened} onClose={aiClose} title="Ask AI Matrx" centered>
                <Textarea
                    label="Prompt"
                    placeholder="Enter a prompt to generate new code"
                    className="w-full"
                    value={userInput}
                    onChange={handleInputChange}
                />
                <ActionIcon onClick={handleSubmitMessage}>
                    <IconSend />
                </ActionIcon>
            </Modal>
        </>
    );
};
