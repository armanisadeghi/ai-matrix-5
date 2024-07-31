'use client';

import React, { useState, useEffect } from 'react';
import { Box, Tabs, Button, Group, Text, Select, Loader } from '@mantine/core';
import AceEditor from 'react-ace';
import { diff as DiffEditor } from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';


interface InteractiveCodeEnvironmentProps {
    initialCode: string;
    language: 'python' | 'typescript' | 'html';
    onExecute: (code: string, language: string) => Promise<string | any>;
}

const InteractiveCodeEnvironment: React.FC<InteractiveCodeEnvironmentProps> = (
    {
        initialCode,
        language: initialLanguage,
        onExecute,
    }) => {
    const [code, setCode] = useState(initialCode);
    const [originalCode, setOriginalCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [executing, setExecuting] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<{ value: string; label: string } | null>({
        value: initialLanguage,
        label: initialLanguage.charAt(0).toUpperCase() + initialLanguage.slice(1),
    });

    useEffect(() => {
        setCode(initialCode);
        setOriginalCode(initialCode);
    }, [initialCode]);

    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
    };

    const handleExecute = async () => {
        setExecuting(true);
        try {
            const result = await onExecute(code, selectedLanguage?.value as 'python' | 'typescript' | 'html');
            setOutput(result);
        }
        catch (error) {
            setOutput(`Error: ${error}`);
        }
        finally {
            setExecuting(false);
        }
    };

    return (
        <Box>
            <Group justify="space-between" mb="md">
                <Select
                    value={selectedLanguage?.value || null}
                    onChange={(_value, option) => setSelectedLanguage(option)}
                    data={[
                        {value: 'python', label: 'Python'},
                        {value: 'typescript', label: 'TypeScript'},
                        {value: 'html', label: 'HTML'},
                    ]}
                />
                <Button onClick={handleExecute} disabled={executing}>
                    {executing ? <Loader size="sm"/> : 'Execute Code'}
                </Button>
            </Group>
            <Tabs defaultValue="edit">
                <Tabs.List>
                    <Tabs.Tab value="edit">Edit</Tabs.Tab>
                    <Tabs.Tab value="diff">Diff</Tabs.Tab>
                    <Tabs.Tab value="output">Output</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="edit" pt="xs">
                    <AceEditor
                        mode={selectedLanguage?.value || 'python'}
                        theme="github"
                        onChange={handleCodeChange}
                        name="code-editor"
                        editorProps={{$blockScrolling: true}}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        style={{width: '100%', height: '400px'}}
                        value={code}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="diff" pt="xs">
                    <DiffEditor
                        mode={selectedLanguage?.value || 'python'}
                        theme="github"
                        value={[originalCode, code]}
                        name="diff-editor"
                        editorProps={{$blockScrolling: true}}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        style={{width: '100%', height: '400px'}}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="output" pt="xs">
                    <Box
                        style={(theme) => ({
                            backgroundColor: theme.colors.boxBackground,
                            padding: theme.spacing.md,
                            borderRadius: theme.radius.sm,
                        })}
                    >
                        <Text component="pre" style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
                            {output}
                        </Text>
                    </Box>
                </Tabs.Panel>
            </Tabs>
        </Box>
    );
};

export default InteractiveCodeEnvironment;
