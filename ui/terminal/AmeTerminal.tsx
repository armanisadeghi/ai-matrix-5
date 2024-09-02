"use client";

import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
import { ReactTerminal } from "react-terminal";

type AmeTerminalProps = { height?: string; name?: string; terminalOutput?: string };

export const AmeTerminal = (props: AmeTerminalProps) => {
    const terminalRef = useRef();
    const { terminalOutput, name } = props;
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <div className="container" ref={terminalRef}>
                <ReactTerminal
                    prompt={">>> " + terminalOutput}
                    enableInput={false}
                    showControlBar
                    showControlButtons={false}
                    themes={{
                        "my-custom-theme": {
                            themeBGColor: colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[1],
                            themeToolbarColor: colorScheme === "dark" ? theme.colors.grey[7] : theme.colors.gray[3],
                            themeColor: colorScheme === "dark" ? theme.colors.gray[7] : theme.colors.gray[3],
                            themePromptColor: colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[8],
                        },
                    }}
                    theme="my-custom-theme"
                />
            </div>
        </>
    );
};
