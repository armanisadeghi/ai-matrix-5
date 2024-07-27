import React, { useState, useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

interface SpreadsheetViewerProps {
  file: File;
}

const SpreadsheetViewer: React.FC<SpreadsheetViewerProps> = ({ file }) => {
  const [cols, setCols] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        setError('Error parsing spreadsheet');
        console.error(err);
      } else {
        setCols(resp.cols);
        setRows(resp.rows);
      }
    });
  }, [file]);

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <Box style={{ overflowX: 'auto' }}>
      <OutTable
        data={rows}
        columns={cols}
        tableClassName="spreadsheet-table"
        tableHeaderRowClass="spreadsheet-header"
      />
    </Box>
  );
};

export default SpreadsheetViewer;
