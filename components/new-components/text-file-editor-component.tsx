import React, { useState, useEffect } from 'react';
import { Textarea, Button, Group } from '@mantine/core';

interface TextFileEditorProps {
  file: File;
  onSave: (content: string) => void;
}

const TextFileEditor: React.FC<TextFileEditorProps> = ({ file, onSave }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setContent(e.target?.result as string);
    };
    reader.readAsText(file);
  }, [file]);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div>
      <Textarea
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        minRows={10}
        maxRows={20}
        mb="md"
      />
      <Group justify="right">
        <Button onClick={handleSave}>Save Changes</Button>
      </Group>
    </div>
  );
};

export default TextFileEditor;
