import React from 'react';
import { Table } from '@mantine/core';

interface FileMetadataViewerProps {
  file: File;
}

const FileMetadataViewer: React.FC<FileMetadataViewerProps> = ({ file }) => {
  const metadata = [
    { property: 'Name', value: file.name },
    { property: 'Size', value: `${(file.size / 1024).toFixed(2)} KB` },
    { property: 'Type', value: file.type },
    { property: 'Last Modified', value: new Date(file.lastModified).toLocaleString() },
  ];

  return (
    <Table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {metadata.map((item, index) => (
          <tr key={index}>
            <td>{item.property}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FileMetadataViewer;
