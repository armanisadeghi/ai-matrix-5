// ui/highlight/AmeCodeHighlight.tsx
"use client";

import { CodeEditor } from "@/components";
import { CodeHighlight } from "@mantine/code-highlight";
import { Drawer, Space, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import "@mantine/code-highlight/styles.css";
import styles from "./AmeCodeHighlight.module.css";

interface AmeCodeHighlightProps {
    code: string;
    language: string;
    title: string;
    startCollapsed?: boolean;
    useLoadingEffect?: boolean;
}

const AmeCodeHighlight: React.FC<AmeCodeHighlightProps> = ({ code, language, title, startCollapsed = false }) => {
    const [expanded, setExpanded] = useState(!startCollapsed);
    const [opened, { open, close }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();

    return (
        <>
            <div className={styles.codeSection}>
                <Space h="xs" />
                <div className={styles.header}>
                    {title}
                    <button onClick={() => setExpanded(!expanded)} className={styles.expandButton}>
                        {expanded ? "Show less" : "Show full code"}
                    </button>
                    <button onClick={open}>open editor</button>
                </div>
                <CodeHighlight code={code} language={language} highlightOnClient={true} />
                <Space h="xs" />
            </div>
            <Drawer opened={opened} onClose={close} title="Code view" position="right" size="xl">
                <CodeEditor code={code} language={language} theme={colorScheme === "dark" ? "vs-dark" : "vs-light"} />
            </Drawer>
        </>
    );
};

export default AmeCodeHighlight;
