// CustomTable.tsx
import React from 'react';
import { Table } from '@mantine/core';

export const CustomTable: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
        {children}
    </Table>
);

export const CustomTableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <thead>{children}</thead>
);

export const CustomTableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <tbody>{children}</tbody>
);

export const CustomTableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <tr>{children}</tr>
);

export const CustomTableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <td>{children}</td>
);

export const CustomTableHeaderCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <th>{children}</th>
);
