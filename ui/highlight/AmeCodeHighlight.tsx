// ui/highlight/AmeCodeHighlight.tsx
"use client";

import { CodeEditor } from "@/components";
import { CodeHighlight } from "@mantine/code-highlight";
import { Code, Drawer, Flex, Space, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCode } from "@tabler/icons-react";
import { useState } from "react";

import { PROGRAMMING_LANGUAGE_OPTIONS } from "@/constants";

import AmeButton from "../buttons/AmeButton";
import AmePaper from "../surfaces/AmePaper";
import AmeText from "../typography/AmeText";

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
    const programmingLanguages = PROGRAMMING_LANGUAGE_OPTIONS.map((item) => item.language);
    const isProgrammingLanguage = programmingLanguages.includes(title.toLowerCase());

    return (
        <>
            {isProgrammingLanguage ? (
                <>
                    <div className={styles.codeSection}>
                        <Space h="xs" />
                        <div className={styles.header}>
                            <Code>{title}</Code>
                        </div>
                        <CodeHighlight code={code} language={language} highlightOnClient={true} />
                        <Space h="xs" />
                    </div>
                    <AmeButton
                        title="open component"
                        onClick={open}
                        leftSection={<IconCode size={16} />}
                        className={styles.button}
                    >
                        Open component
                    </AmeButton>
                </>
            ) : (
                <div className={styles.codeSection}>
                    <Space h="xs" />
                    <div className={styles.header}>
                        <Code>{title}</Code>
                        <AmeButton
                            title="collapse code"
                            onClick={() => setExpanded(!expanded)}
                            className={styles.button}
                            size="compact-sm"
                            variant="subtle"
                            >
                            {expanded ? "Show less" : "Show full code"}
                        </AmeButton>
                    </div>
                    <CodeHighlight code={code} language={language} highlightOnClient={true} />
                    <Space h="xs" />
                </div>
            )}
            <Drawer opened={opened} onClose={close} title="Code view" position="right" size="xl">
                <CodeEditor code={code} language={language} theme={colorScheme === "dark" ? "vs-dark" : "vs-light"} />
            </Drawer>
        </>
    );
};

export default AmeCodeHighlight;
