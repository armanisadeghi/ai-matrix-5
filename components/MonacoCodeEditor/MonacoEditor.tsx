import AmeSelect from "@/ui/select/AmeSelect/AmeSelect";
import { ChangeEvent, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";

type CodeEditorProps = { code: string; language: string; theme?: "vs-dark" | "vs-light" };

export const CodeEditor = (props: CodeEditorProps) => {
    const { code, language, theme } = props;
    const [contextCode, setContextCode] = useState<any>(code ?? "");
    const [contextFile, setContextFile] = useState<any>();
    const [contextLanguage, setContextLanguage] = useState(language ?? "javascript");
    const [contextTheme, setTheme] = useState<any>(theme ?? "vs-light");

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
        setTheme(value);
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

    return (
        <>
            <div>
                <input type="file" onChange={handleFileChange} />
                <AmeSelect label="Theme" data={["hc-black", "vs-dark", "vs-light"]} onChange={handleThemeChange} />
            </div>
            <hr />
            <MonacoEditor
                width="100%"
                height="800"
                language={contextLanguage}
                theme={contextTheme}
                value={contextCode}
                options={options}
            />
        </>
    );
};
