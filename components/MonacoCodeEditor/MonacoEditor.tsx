import { Code, FileInput, Flex, useMantineColorScheme } from "@mantine/core";
import { IconFileCode2, IconPlayerPlay } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import { PROGRAMMING_LANGUAGE_OPTIONS } from "@/constants";
import AmeButton from "@/ui/buttons/AmeButton";
import AmeSelect from "@/ui/select/AmeSelect/AmeSelect";
import AmePaper from "@/ui/surfaces/AmePaper";
import AmeTitle from "@/ui/typography/AmeTitle";

type CodeEditorProps = {
    code: string;
    language: string;
    theme?: "vs-dark" | "vs-light";
    height?: string | number;
    onChange?: (value?: string) => void;
};

export const CodeEditor = (props: CodeEditorProps) => {
    const { code, language, theme, onChange } = props;
    const editorRef = useRef(null);
    const { colorScheme } = useMantineColorScheme();
    const [contextCode, setContextCode] = useState<any>(code ?? "");
    const [contextFile, setContextFile] = useState<any>();
    const [contextLanguage, setContextLanguage] = useState(language ?? "javascript");
    const [contextTheme, setContextTheme] = useState<any>(theme ?? "vs-light");
    const [codeOutput, setCodeOutput] = useState<any>();
    const [loading, setLoading] = useState(false);

    const options: any = {
        autoIndent: "full",
        contextmenu: true,
        fontFamily: "monospace",
        fontSize: 13,
        lineHeight: 24,
        hideCursorInOverviewRuler: true,
        matchBrackets: "always",
        minimap: {
            enabled: true,
        },
        scrollbar: {
            horizontalSliderSize: 4,
            verticalSliderSize: 18,
        },
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: true,
    };

    const contextVersion: string = useMemo(() => {
        return (
            PROGRAMMING_LANGUAGE_OPTIONS.find((item) => item.language === contextLanguage.toLowerCase()).version ??
            "1.0"
        );
    }, [contextLanguage]);

    const handleFileChange = (file: File) => {
        setContextFile(file);
    };

    const handleThemeChange = (value: string) => {
        setContextTheme(value);
    };

    const handleCodeChange = (value: string) => {
        if (value) {
            setContextCode(value);

            if (onChange) {
                onChange(value);
            }
        }
    };

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    };

    const runCode = () => {
        try {
            // You can capture the output by redirecting the console
            const consoleOutput = [];
            const console = {
                log: (output) => consoleOutput.push(output),
            };

            // Evaluate the code
            eval(contextCode);

            alert(`Execution result: ${consoleOutput.join("\n")}`);
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const runCodeInJDoodle = async () => {
        setLoading(true);

        const body = {
            clientId: process.env.NEXT_PUBLIC_JDOODLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_JDOODLE_CLIENT_SECRET,
            script: contextCode,
            language: contextLanguage,
            versionIndex: "0",
        };

        const response = await fetch("/api/jdoodle/execute", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await response.json();
        setCodeOutput(data?.output?.split("\n"));
        setLoading(false);
    };

    const runCodeInPiston = async () => {
        setLoading(true);

        const body = {
            language: contextLanguage,
            version: contextVersion,
            files: [
                {
                    content: contextCode,
                },
            ],
        };

        const response = await fetch("/api/piston/execute", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await response.json();
        setCodeOutput(data?.run?.output?.split("\n"));
        setLoading(false);
    };

    useEffect(() => {
        if (contextFile) {
            var reader = new FileReader();
            reader.onload = async (e) => {
                setContextCode(e.target.result);
            };
            reader.readAsText(contextFile);
            let newLanguage = "javascript";
            const extension = contextFile.name.split(".").pop();
            if (["css", "html", "python", "dart"].includes(extension)) {
                newLanguage = extension;
            }
            setContextLanguage(newLanguage);
        }
    }, [contextFile]);

    useEffect(() => {
        if (colorScheme) {
            if (colorScheme === "dark") {
                setContextTheme("vs-dark");
            } else {
                setContextTheme("vs-light");
            }
        }
    }, [colorScheme]);

    if (typeof window === "undefined") {
        console.log("error rendering monaco editor");
    }

    return (
        <>
            <Flex justify="space-between" mb="sm">
                <FileInput
                    label="Upload file"
                    leftSection={<IconFileCode2 size={16} />}
                    placeholder="Your file"
                    onChange={handleFileChange}
                    w={250}
                />
                <AmeSelect
                    label="Theme"
                    data={["hc-black", "vs-dark", "vs-light"]}
                    onChange={handleThemeChange}
                    value={contextTheme}
                    required={false}
                />
            </Flex>
            <AmePaper mb="sm" py="xs" withBorder>
                <Editor
                    width="100%"
                    height="400"
                    language={contextLanguage}
                    theme={contextTheme}
                    value={contextCode}
                    options={options}
                    onMount={handleEditorDidMount}
                />
            </AmePaper>
            <Flex gap="sm" mb="sm">
                <AmeButton
                    leftSection={<IconPlayerPlay size={16} />}
                    loading={loading}
                    onClick={runCode}
                    title="Run code"
                >
                    Run code in eval
                </AmeButton>
                <AmeButton
                    leftSection={<IconPlayerPlay size={16} />}
                    loading={loading}
                    onClick={runCodeInJDoodle}
                    title="Run code"
                >
                    Run code in jdoodle
                </AmeButton>
                <AmeButton
                    leftSection={<IconPlayerPlay size={16} />}
                    loading={loading}
                    onClick={runCodeInPiston}
                    title="Run code"
                >
                    Run code in piston
                </AmeButton>
            </Flex>
            {codeOutput && (
                <AmePaper withBorder p="sm">
                    <AmeTitle order={6} mb="sm">
                        Output
                    </AmeTitle>
                    {codeOutput?.map((item) => {
                        return item ? <Code key={item}>{item}</Code> : "";
                    })}
                </AmePaper>
            )}
        </>
    );
};
