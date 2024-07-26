import React, { useState } from 'react';
import { Box, Tabs } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (markdown: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '',
  onChange,
}) => {
  const [markdown, setMarkdown] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setMarkdown(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Tabs defaultValue="edit">
      <Tabs.List>
        <Tabs.Tab value="edit">Edit</Tabs.Tab>
        <Tabs.Tab value="preview">Preview</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="edit" pt="xs">
        <textarea
          value={markdown}
          onChange={handleChange}
          style={{
            width: '100%',
            minHeight: '400px',
            padding: '10px',
            fontFamily: 'monospace',
          }}
        />
      </Tabs.Panel>

      <Tabs.Panel value="preview" pt="xs">
        <Box p="md" style={{ border: '1px solid #ccc', minHeight: '400px' }}>
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {markdown}
          </ReactMarkdown>
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
};

export default MarkdownEditor;
