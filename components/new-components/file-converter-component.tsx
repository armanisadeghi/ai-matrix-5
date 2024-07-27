import React, { useState } from 'react';
import { Box, Button, Select, Text, Group } from '@mantine/core';
import { IconFileUpload, IconFileExport } from '@tabler/icons-react';

interface FileConverterProps {
  onConvert: (file: File, targetFormat: string) => Promise<Blob>;
}

const FileConverter: React.FC<FileConverterProps> = ({ onConvert }) => {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('');
  const [converting, setConverting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleConvert = async () => {
    if (file && targetFormat) {
      setConverting(true);
      try {
        const convertedBlob = await onConvert(file, targetFormat);
        const url = URL.createObjectURL(convertedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted.${targetFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Conversion failed:', error);
      } finally {
        setConverting(false);
      }
    }
  };

  return (
    <Box>
      <Group mb="md">
        <Button leftSection={<IconFileUpload size={14} />} onClick={() => document.getElementById('file-input')?.click()}>
          Select File
        </Button>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {file && <Text>{file.name}</Text>}
      </Group>
      <Select
        label="Convert to"
        placeholder="Select target format"
        value={targetFormat}
        onChange={(value) => setTargetFormat(value || '')}
        data={[
          { value: 'pdf', label: 'PDF' },
          { value: 'docx', label: 'DOCX' },
          { value: 'xlsx', label: 'XLSX' },
          { value: 'pptx', label: 'PPTX' },
          // Add more format options as needed
        ]}
        mb="md"
      />
      <Button
        onClick={handleConvert}
        disabled={!file || !targetFormat}
        loading={converting}
        leftSection={<IconFileExport size={14} />}
      >
        Convert
      </Button>
    </Box>
  );
};

export default FileConverter;
