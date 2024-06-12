// CustomTable.tsx
import React from 'react';
import { Table } from '@mantine/core';

interface CustomTableProps {
    children: React.ReactNode;
}

export const CustomTable: React.FC<CustomTableProps> = ({ children }) => (
    <Table striped highlightOnHover withTableBorder withColumnBorders withRowBorders={false}>
        {children}
    </Table>
);

export const CustomTableHead: React.FC<CustomTableProps> = ({ children }) => (
    <thead className="m_b242d975 mantine-Table-thead">{children}</thead>
);

export const CustomTableBody: React.FC<CustomTableProps> = ({ children }) => (
    <tbody className="m_b2404537 mantine-Table-tbody">{children}</tbody>
);

export const CustomTableRow: React.FC<CustomTableProps> = ({ children }) => (
    <tr className="m_4e7aa4fd mantine-Table-tr" data-striped="odd" data-hover="true">{children}</tr>
);

export const CustomTableCell: React.FC<CustomTableProps> = ({ children }) => (
    <td className="m_4e7aa4ef mantine-Table-td" data-with-column-border="true">{children}</td>
);

export const CustomTableHeaderCell: React.FC<CustomTableProps> = ({ children }) => (
    <th className="m_4e7aa4f3 mantine-Table-th" data-with-column-border="true">{children}</th>
);
