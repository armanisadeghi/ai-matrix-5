import React, { useState, useEffect } from 'react';
import { Box, Tabs, Button, Group, Text, Select, Loader, Switch } from '@mantine/core';
import AceEditor from 'react-ace';
import { split as SplitEditor } from 'react-ace';
import { diff as DiffEditor } from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/keybinding-vim';
import 'ace-builds/src-noconflict/keybinding-emacs';

interface InteractiveCodeEnvironmentProps {
  initialCode: string | string[];
  language: 'python' | 'typescript' | 'html';
  onExecute: (code: string, language: string) => Promise<string>;
}

const InteractiveCodeEnvironment: React.FC<InteractiveCodeEnvironmentProps> = ({
  initialCode,
  language: initialLanguage,
  onExecute,
}) => {
  const [code, setCode] = useState<string | string[]>(initialCode);
  const [originalCode, setOriginalCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [executing, setExecuting] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState('github');
  const [editorMode, setEditorMode] = useState<'single' | 'split' | 'diff'>('single');
  const [keyboardHandler, setKeyboardHandler] = useState('');

  useEffect(() => {
    setCode(initialCode);
    setOriginalCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode: string | string[]) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'python' | 'typescript' | 'html');
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleKeyboardHandlerChange = (newHandler: string) => {
    setKeyboardHandler(newHandler);
  };

  const handleExecute = async () => {
    setExecuting(true);
    try {
      const codeToExecute = Array.isArray(code) ? code.join('\n') : code;
      const result = await onExecute(codeToExecute, language);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setExecuting(false);
    }
  };

  const renderEditor = () => {
    const commonProps = {
      mode: language,
      theme,
      onChange: handleCodeChange,
      name: "interactive-code-editor",
      editorProps: { $blockScrolling: true },
      setOptions: {
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      },
      keyboardHandler,
      width: "100%",
      height: "400px",
    };

    switch (editorMode) {
      case 'split':
        return (
          <SplitEditor
            splits={2}
            orientation="beside"
            value={Array.isArray(code) ? code : [code, '']}
            {...commonProps}
          />
        );
      case 'diff':
        return (
          <DiffEditor
            value={Array.isArray(code) ? code : [originalCode as string, code as string]}
            {...commonProps}
          />
        );
      default:
        return (
          <AceEditor
            value={Array.isArray(code) ? code[0] : code}
            {...commonProps}
          />
        );
    }
  };

  return (
    <Box>
      <Group position="apart" mb="md">
        <Select
          value={language}
          onChange={handleLanguageChange}
          data={[
            { value: 'python', label: 'Python' },
            { value: 'typescript', label: 'TypeScript' },
            { value: 'html', label: 'HTML' },
          ]}
        />
        <Select
          value={theme}
          onChange={handleThemeChange}
          data={[
            { value: 'github', label: 'GitHub' },
            { value: 'monokai', label: 'Monokai' },
          ]}
        />
        <Select
          value={keyboardHandler}
          onChange={handleKeyboardHandlerChange}
          data={[
            { value: '', label: 'Default' },
            { value: 'vim', label: 'Vim' },
            { value: 'emacs', label: 'Emacs' },
          ]}
        />
        <Select
          value={editorMode}
          onChange={(value) => setEditorMode(value as 'single' | 'split' | 'diff')}
          data={[
            { value: 'single', label: 'Single' },
            { value: 'split', label: 'Split' },
            { value: 'diff', label: 'Diff' },
          ]}
        />
        <Button onClick={handleExecute} disabled={executing}>
          {executing ? <Loader size="sm" /> : 'Execute Code'}
        </Button>
      </Group>
      <Tabs defaultValue="edit">
        <Tabs.List>
          <Tabs.Tab value="edit">Edit</Tabs.Tab>
          <Tabs.Tab value="output">Output</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="edit" pt="xs">
          {renderEditor()}
        </Tabs.Panel>

        <Tabs.Panel value="output" pt="xs">
          <Box
            style={(theme) => ({
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
              padding: theme.spacing.md,
              borderRadius: theme.radius.sm,
            })}
          >
            <Text component="pre" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {output}
            </Text>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default InteractiveCodeEnvironment;
