import { useMantineColorScheme } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { MonacoDiffEditor } from "react-monaco-editor";

import AmeSelect from "@/ui/select/AmeSelect/AmeSelect";

type CodeEditorProps = { originalCode: string; modifiedCode: string; language: string; theme?: "vs-dark" | "vs-light" };

export const CodeDiffEditor = (props: CodeEditorProps) => {
    const { originalCode, modifiedCode, language, theme } = props;
    const { colorScheme } = useMantineColorScheme();
    const [contextOriginalCode, setContextOriginalCode] = useState<any>(originalCode ?? "");
    const [contextModifiedCode, setContextModifiedCode] = useState<any>(modifiedCode ?? "");
    const [contextFile, setContextFile] = useState<any>();
    const [contextLanguage, setContextLanguage] = useState(language ?? "javascript");
    const [contextTheme, setContextTheme] = useState<any>(theme ?? "vs-light");

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

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setContextFile(event.target.files[0]);
        }
    };

    const handleThemeChange = (value: string) => {
        setContextTheme(value);
    };

    useEffect(() => {
        if (contextFile) {
            var reader = new FileReader();
            reader.onload = async (e) => {
                setContextModifiedCode(e.target.result);
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

    return (
        <>
            <div>
                <input type="file" onChange={handleFileChange} />
                <AmeSelect
                    label="Theme"
                    data={["hc-black", "vs-dark", "vs-light"]}
                    onChange={handleThemeChange}
                    value={contextTheme}
                />
            </div>
            <hr />
            <MonacoDiffEditor
                width="100%"
                height="800"
                language={contextLanguage}
                theme={contextTheme}
                original={contextOriginalCode}
                value={contextModifiedCode}
                options={options}
            />
        </>
    );
};
