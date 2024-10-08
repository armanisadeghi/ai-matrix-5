"use client";

import MonacoEditor, { EditorProps as MonacoEditorProps } from "@monaco-editor/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getLanguageFromExtension } from "../utils";
import * as monaco from "monaco-editor";
import { editor as coreEditor } from "monaco-editor-core";
import { useEditorSave } from "@/app/dashboard/code-editor/hooks";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { Textarea } from "@/app/dashboard/code-editor/components/Inputs";
import { ActionIcon } from "@/app/dashboard/code-editor/components/Buttons";
import { IconSend } from "@tabler/icons-react";
import { createChatStart, sendAiMessage } from "@/app/dashboard/code-editor/supabase/aiChat";
import { useRecoilValue } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
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
    const [aiResponse, setAiResponse] = useState("");
    const [aiResponseLoading, setAiResponseLoading] = useState(false);

    const [aiInstructions, setAiInstructions] = useState("");
    const [aiSuggestions, setAiSuggestions] = useState("");
    const suggestionsWidgetRef = useRef<any>(null);

    const handleEditorDidMount = (editor, monacoInstance) => {
        editorRef.current = editor;

        // Add keybinding for Ctrl + S
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            void handleSaveContent();
        });

        editor.addAction({
            id: "askAiMatrx",
            label: "Ask AI",
            contextMenuGroupId: "0_customGroup",
            contextMenuOrder: 0,
            run: (_editor) => {
                handleAiOpen();
            },
        });

        editor.addAction({
            id: "triggerAiSuggestions",
            label: "Trigger AI Suggestions",
            contextMenuGroupId: "0_customGroup",
            contextMenuOrder: 0,
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI], // Ctrl+I or Cmd+I
            run: (ed) => {
                // ed.trigger("", "editor.action.triggerSuggest", {});
                showAiSuggestionsWidget(editor);
            },
        });

        // Save on blur
        editor.onDidBlurEditorWidget(() => {
            void handleSaveContent();
        });

        // Add AI suggestion provider
        monacoInstance.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: async (model, position) => {
                const wordUntilPosition = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: wordUntilPosition.startColumn,
                    endColumn: wordUntilPosition.endColumn,
                };

                // Get the current line content
                const lineContent = model.getLineContent(position.lineNumber);

                // Send the current line to your AI service
                const aiSuggestions = await getAiSuggestions(lineContent);

                // Convert AI suggestions to Monaco completion items
                const suggestions = aiSuggestions.map((suggestion) => ({
                    label: suggestion,
                    kind: monacoInstance.languages.CompletionItemKind.Text,
                    insertText: suggestion,
                    range: range,
                }));

                return { suggestions };
            },
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

            const response: { data: string } = await sendAiMessage({
                chatId: newChat.chatId,
                messagesEntry: newChat?.messages,
            });

            // const response = await sendUserPrompt(text, newChat.chatId, newChat);

            console.log({ response });

            // @ts-ignore
            setAiResponse(response.data);
        } else {
            aiClose();
        }
    };

    const getAiSuggestions = async (lineContent: string) => {
        // Implement this function to call your AI service
        // and return an array of suggestion strings
        // For example:
        const response = await sendAiMessage({
            chatId: "inline-suggestions",
            messagesEntry: [{ role: "user", content: `Suggest completions for: ${lineContent}` }],
        });
        return response.data.split("\n"); // Assuming the AI returns suggestions separated by newlines
    };

    const formatMessage = (currentContent: string, instructions: string): string => {
        const greetings = "Hello AI!\\n\\n";
        const currentCode = `This is my current code:\\n\\n${currentContent}.`;
        const command = `\\n\\nInstructions: ${instructions}.`;
        const returnAs = `Format code in this language: ${language}.`;

        return greetings + currentCode + command + returnAs;
    };

    const showAiSuggestionsWidget = (editor) => {
        const lineNumber = editor.getPosition().lineNumber;
        const column = editor.getPosition().column;

        if (suggestionsWidgetRef.current) {
            suggestionsWidgetRef.current.dispose();
        }

        const domNode = document.createElement("div");
        domNode.innerHTML = `
      <div style="background: #1e1e1e; color: #d4d4d4; padding: 8px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); width: 300px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span>AI Suggestions</span>
          <button id="closeSuggestions" style="background: none; border: none; color: #d4d4d4; cursor: pointer;">×</button>
        </div>
        <input type="text" id="aiInstructions" placeholder="Enter AI instructions" style="width: 100%; margin-bottom: 8px; padding: 4px; background: #2d2d2d; color: #d4d4d4; border: 1px solid #3c3c3c; border-radius: 2px;">
        <button id="submitAiInstructions" style="width: 100%; padding: 4px 8px; background: #0e639c; color: white; border: none; border-radius: 2px; cursor: pointer;">Get Suggestions</button>
        <div id="aiSuggestions" style="margin-top: 8px;"></div>
        <div id="aiResponse" style="margin-top: 8px; border-top: 1px solid #3c3c3c; padding-top: 8px;"></div>
      </div>
    `;

        const inputElement = domNode.querySelector("#aiInstructions") as HTMLInputElement;
        const buttonElement = domNode.querySelector("#submitAiInstructions") as HTMLButtonElement;
        const suggestionsElement = domNode.querySelector("#aiSuggestions") as HTMLDivElement;
        const responseElement = domNode.querySelector("#aiResponse") as HTMLDivElement;
        const closeButton = domNode.querySelector("#closeSuggestions") as HTMLButtonElement;

        const updateWidget = () => {
            if (suggestionsWidgetRef.current) {
                suggestionsWidgetRef.current.position = {
                    position: { lineNumber: editor.getPosition().lineNumber, column: editor.getPosition().column },
                    preference: [monaco.editor.ContentWidgetPositionPreference.BELOW],
                };
            }
        };

        const closeSuggestionsWidget = () => {
            domNode.remove();

            if (suggestionsWidgetRef.current) {
                suggestionsWidgetRef.current.dispose();
                suggestionsWidgetRef.current = null;
            }
        };

        closeButton.addEventListener("click", closeSuggestionsWidget);

        buttonElement.addEventListener("click", async () => {
            const instructions = inputElement.value;
            if (instructions.trim().length === 0) return;

            buttonElement.disabled = true;
            buttonElement.textContent = "Loading...";
            suggestionsElement.innerHTML = "";
            responseElement.innerHTML = "";

            try {
                const currentContent = editor.getValue();
                const inputMessage = formatMessage(currentContent, instructions);
                const newChat = await createChatStart(inputMessage, userId);

                const response = await sendAiMessage({
                    chatId: newChat.chatId,
                    messagesEntry: [
                        {
                            role: "user",
                            content: inputMessage,
                        },
                    ],
                });

                const aiResponse = response.data;
                responseElement.innerHTML = `<div style="white-space: pre-wrap;">${aiResponse}</div>`;

                suggestionsElement.innerHTML = `
          <button id="applySuggestion" style="margin-top: 8px; width: 100%; padding: 4px 8px; background: #0e639c; color: white; border: none; border-radius: 2px; cursor: pointer;">Apply Suggestion</button>
        `;

                const applyButton = suggestionsElement.querySelector("#applySuggestion") as HTMLButtonElement;
                applyButton.addEventListener("click", () => {
                    const position = editor.getPosition();
                    editor.executeEdits("ai-suggestion", [
                        {
                            range: new monaco.Range(
                                position.lineNumber,
                                position.column,
                                position.lineNumber,
                                position.column,
                            ),
                            text: aiResponse,
                            forceMoveMarkers: true,
                        },
                    ]);
                    updateWidget();
                });
            } catch (error) {
                console.error("Error getting AI suggestions:", error);
                responseElement.textContent = "Error fetching suggestions. Please try again.";
            } finally {
                buttonElement.disabled = false;
                buttonElement.textContent = "Get Suggestions";
                updateWidget();
            }
        });

        suggestionsWidgetRef.current = editor.addContentWidget({
            getDomNode: () => domNode,
            getId: () => "ai-suggestions-widget",
            getPosition: () => ({
                position: { lineNumber, column },
                preference: [monaco.editor.ContentWidgetPositionPreference.BELOW],
            }),
        });
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

                {aiResponse && <p>{aiResponse}</p>}
            </Modal>
        </>
    );
};
