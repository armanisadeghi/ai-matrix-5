"use client";

import MonacoEditor, { EditorProps as MonacoEditorProps } from "@monaco-editor/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { findParentStructure, getLanguageFromExtension, getPlaceholderText, IParentStructure } from "../utils";
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

// Define a type for the widget ref
type SuggestionsWidgetRef = {
    current: monaco.editor.IContentWidget | null;
};

const createWidgetContent = (parentStructure: IParentStructure): string => {
    const placeholder = getPlaceholderText(parentStructure);
    const structureType =
        parentStructure.type === "htmlTag"
            ? `${parentStructure.name} tag`
            : parentStructure.name || parentStructure.type;

    return `
        <div class="ai-suggestions-widget">
            <div class="widget-header">
                <span>AI Suggestions for ${structureType}</span>
                <button id="closeSuggestions" class="close-button">×</button>
            </div>
            <input type="text" id="aiInstructions" class="ai-input" placeholder="${placeholder}">
            <button id="submitAiInstructions" class="submit-button">Generate Content</button>
            <div id="aiSuggestions" class="suggestions-container"></div>
            <div id="aiResponse" class="response-container"></div>
        </div>
    `;
};

const formatMessage = (structure: IParentStructure, instructions: string, language: string): string => {
    return `
Context: I have a ${structure.type} ${structure.name ? `named ${structure.name}` : ""} in ${language}.
Current content:
\`\`\`${language}
${structure.innerContent}
\`\`\`

Instructions: ${instructions}

Please provide the complete implementation in ${language}. Keep the existing structure and naming, but modify or add to the content as requested.
`;
};

const addWidgetStyles = () => {
    const styleId = "ai-widget-styles";
    if (document.getElementById(styleId)) return;

    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.innerHTML = `
        .ai-suggestions-widget {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 12px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            width: 300px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .widget-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .close-button {
            background: none;
            border: none;
            color: #d4d4d4;
            cursor: pointer;
            font-size: 16px;
        }
        .ai-input {
            width: 100%;
            margin-bottom: 8px;
            padding: 6px;
            background: #2d2d2d;
            color: #d4d4d4;
            border: 1px solid #3c3c3c;
            border-radius: 2px;
        }
        .submit-button, .apply-button {
            width: 100%;
            padding: 6px;
            background: #0e639c;
            color: white;
            border: none;
            border-radius: 2px;
            cursor: pointer;
        }
        .submit-button:disabled {
            background: #1e1e1e;
            cursor: not-allowed;
        }
        .response-container {
            margin-top: 8px;
            border-top: 1px solid #3c3c3c; 
            padding-top: 8px;
        }
        .response-content pre {
            margin: 0;
            padding: 8px;
            background: #2d2d2d;
            border-radius: 2px;
            overflow-x: auto;
        }
        .error-message {
            color: #f48771;
            margin-top: 8px;
        }
    `;
    document.head.appendChild(styleElement);
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
    const suggestionsWidgetRef = useRef<monaco.editor.IContentWidget | null>(null);

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
            contextMenuOrder: 1,
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI], // Ctrl+I or Cmd+I
            run: (_editor) => {
                showAiSuggestionsWidget(editor, userId, language);
            },
        });

        // Save on blur
        editor.onDidBlurEditorWidget(() => {
            void handleSaveContent();
        });
    };

    const handleEditorChange = (value, _event) => {
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

    const showAiSuggestionsWidget = async (
        editor: monaco.editor.IStandaloneCodeEditor,
        userId: string,
        language: string,
    ) => {
        // 1. Get current cursor position
        const currentPosition = editor.getPosition();
        if (!currentPosition) return;

        // 2. Find parent structure with error handling
        let parentStructure: IParentStructure;
        try {
            const found = findParentStructure(editor, currentPosition);
            if (!found) {
                throw new Error("No parent structure found");
            }
            parentStructure = found;
        } catch (error) {
            console.error("Error finding parent structure:", error);
            const model = editor.getModel();
            if (!model) return;

            parentStructure = {
                type: "unknown",
                name: "",
                startLine: currentPosition.lineNumber,
                endLine: currentPosition.lineNumber,
                startColumn: 1,
                endColumn: model.getLineMaxColumn(currentPosition.lineNumber),
                innerContent: model.getLineContent(currentPosition.lineNumber),
                language,
            };
        }

        // 3. Create widget content
        const domNode = document.createElement("div");
        const widgetContent = createWidgetContent(parentStructure);
        domNode.innerHTML = widgetContent;

        // 4. Widget management
        if (suggestionsWidgetRef.current) {
            editor.removeContentWidget(suggestionsWidgetRef.current);
            suggestionsWidgetRef.current = null;
            domNode.remove();
        }

        // 5. Setup event handlers
        await setupEventHandlers(domNode, editor, parentStructure, userId, language);

        // 6. Add widget to editor
        const newWidget = {
            getDomNode: () => domNode,
            getId: () => "ai-suggestions-widget",
            getPosition: () => ({
                position: {
                    lineNumber: parentStructure.startLine,
                    column: parentStructure.startColumn,
                },
                preference: [monaco.editor.ContentWidgetPositionPreference.BELOW],
            }),
        };

        editor.addContentWidget(newWidget);
        suggestionsWidgetRef.current = newWidget;

        console.log({ suggestionsWidgetRef });

        // 7. Add CSS styles
        addWidgetStyles();
    };

    const setupEventHandlers = async (
        domNode: HTMLElement,
        editor: monaco.editor.IStandaloneCodeEditor,
        parentStructure: IParentStructure,
        userId: string,
        language: string,
    ) => {
        const closeButton = domNode.querySelector("#closeSuggestions");
        const submitButton = domNode.querySelector("#submitAiInstructions") as HTMLButtonElement;
        const inputElement = domNode.querySelector("#aiInstructions") as HTMLInputElement;
        const suggestionsElement = domNode.querySelector("#aiSuggestions") as HTMLDivElement;
        const responseElement = domNode.querySelector("#aiResponse") as HTMLDivElement;

        closeButton?.addEventListener("click", () => {
            console.log("Closing widget");
            if (suggestionsWidgetRef.current) {
                editor.removeContentWidget(suggestionsWidgetRef.current);
                suggestionsWidgetRef.current = null;
                domNode.remove();
            } else {
                console.log("Widget reference is null");
            }
        });

        submitButton?.addEventListener("click", async () => {
            const instructions = inputElement?.value || "";
            if (!instructions.trim()) return;

            submitButton.disabled = true;
            submitButton.textContent = "Generating...";
            responseElement.innerHTML = "";

            try {
                const prompt = formatMessage(parentStructure, instructions, language);
                console.log({ prompt });
                const newChat = await createChatStart(prompt, userId);

                const response = await sendAiMessage({
                    chatId: newChat.chatId,
                    messagesEntry: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                });

                const aiResponse = response.data;
                responseElement.innerHTML = `
                <div class="response-content">
                    <pre style="max-height: 100px; overflow: auto"><code>${aiResponse}</code></pre>
                    <button id="applyResponse" class="apply-button">Apply Response</button>
                </div>
            `;

                const applyButton = responseElement.querySelector("#applyResponse");
                applyButton?.addEventListener("click", () => {
                    const edits = [
                        {
                            range: new monaco.Range(parentStructure.startLine + 1, 1, parentStructure.endLine - 1, 1),
                            text: aiResponse,
                        },
                    ];

                    editor.executeEdits("ai-suggestion", edits);

                    if (suggestionsWidgetRef.current) {
                        editor.removeContentWidget(suggestionsWidgetRef.current);
                        suggestionsWidgetRef.current = null;
                        domNode.remove();
                    }
                });
            } catch (error) {
                console.error("Error getting AI suggestions:", error);
                responseElement.innerHTML = `
                <div class="error-message">
                    Error generating suggestions. Please try again.
                </div>
            `;
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = "Generate Content";
            }
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
