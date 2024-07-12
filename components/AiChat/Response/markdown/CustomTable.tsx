// CustomTable.tsx
import React, { useRef } from 'react';
import { Table, ScrollArea, Button, Group } from '@mantine/core';
import styles from '@/components/AiChat/Response/ResponseArea.module.css';
import { tableToData, exportToCSV, copyTableToClipboard } from './utils';


interface CustomTableProps {
    children: React.ReactNode;
}

export const CustomTable: React.FC<CustomTableProps> = ({children}) => {
    const tableRef = useRef<HTMLTableElement>(null);

    const handleCopyToClipboard = () => {
        const tableElement = tableRef.current;
        if (tableElement) {
            copyTableToClipboard(tableElement);
        } else {
            console.error('Table element not found');
        }
    };

    const handleExportToCSV = () => {
        const tableElement = tableRef.current;
        if (tableElement) {
            exportToCSV(tableToData(tableElement));
        } else {
            console.error('Table element not found');
        }
    };

    return (
        <div className={styles.customTableWrapper}>
            <Group justify="flex-end" mb="md">
                <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
                <Button onClick={handleExportToCSV}>Export to CSV</Button>
            </Group>
            <Table
                ref={tableRef}
                striped
                highlightOnHover
                withTableBorder
                withColumnBorders
                withRowBorders={false}
                className={styles.customTable}
            >
                {children}
            </Table>
        </div>
    );
};

export const CustomTableHead: React.FC<CustomTableProps> = ({children}) => (
    <thead className="m_b242d975 mantine-Table-thead">{children}</thead>
);

export const CustomTableBody: React.FC<CustomTableProps> = ({children}) => (
    <tbody className="m_b2404537 mantine-Table-tbody">{children}</tbody>
);

export const CustomTableRow: React.FC<CustomTableProps> = ({children}) => (
    <tr className="m_4e7aa4fd mantine-Table-tr" data-striped="odd" data-hover="true">{children}</tr>
);

export const CustomTableCell: React.FC<CustomTableProps> = ({children}) => (
    <td className="m_4e7aa4ef mantine-Table-td" data-with-column-border="true">{children}</td>
);

export const CustomTableHeaderCell: React.FC<CustomTableProps> = ({children}) => (
    <th className="m_4e7aa4f3 mantine-Table-th" data-with-column-border="true">{children}</th>
);
