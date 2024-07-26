import React, { useState } from 'react';
import { Box, Button, Text, List, Group } from '@mantine/core';
import { IconFolder, IconFile, IconDownload } from '@tabler/icons-react';
import JSZip from 'jszip';

interface ArchiveManagerProps {
  file: File;
}

const ArchiveManager: React.FC<ArchiveManagerProps> = ({ file }) => {
  const [files, setFiles] = useState<JSZip.JSZipObject[]>([]);
  const [loading, setLoading] = useState(false);

  const loadArchive = async () => {
    setLoading(true);
    try {
      const zip = new JSZip();
      const content = await zip.loadAsync(file);
      setFiles(Object.values(content.files));
    } catch (error) {
      console.error('Error loading archive:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractFile = async (zipFile: JSZip.JSZipObject) => {
    try {
      const content = await zipFile.async('blob');
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = zipFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error extracting file:', error);
    }
  };

  return (
    <Box>
      <Button onClick={loadArchive} loading={loading} mb="md">
        Load Archive
      </Button>
      <List spacing="xs" size="sm" center>
        {files.map((zipFile, index) => (
          <List.Item
            key={index}
            icon={
              zipFile.dir ? (
                <IconFolder size={14} />
              ) : (
                <IconFile size={14} />
              )
            }
          >
            <Group justify="space-between">
              <Text>{zipFile.name}</Text>
              {!zipFile.dir && (
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => extractFile(zipFile)}
                  leftSection={<IconDownload size={14} />}
                >
                  Extract
                </Button>
              )}
            </Group>
          </List.Item>
        ))}
      </List>
    </Box>
  );
};

export default ArchiveManager;
