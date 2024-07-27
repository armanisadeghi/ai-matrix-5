import React, { useState } from 'react';
import { Box, Select } from '@mantine/core';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onChange?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  language = 'javascript',
  onChange,
}) => {
  const [code, setCode] = useState(initialCode);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [theme, setTheme] = useState('github');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  return (
    <Box>
      <Box mb="md">
        <Select
          label="Language"
          value={currentLanguage}
          onChange={(value) => setCurrentLanguage(value || 'javascript')}
          data={[
            { value: 'javascript', label: 'JavaScript' },
            { value: 'python', label: 'Python' },
            { value: 'java', label: 'Java' },
            { value: 'csharp', label: 'C#' },
          ]}
        />
        <Select
          label="Theme"
          value={theme}
          onChange={(value) => setTheme(value || 'github')}
          data={[
            { value: 'github', label: 'GitHub' },
            { value: 'monokai', label: 'Monokai' },
          ]}
        />
      </Box>
      <AceEditor
        mode={currentLanguage}
        theme={theme}
        onChange={handleCodeChange}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: '100%', height: '400px' }}
        value={code}
      />
    </Box>
  );
};

export default CodeEditor;
