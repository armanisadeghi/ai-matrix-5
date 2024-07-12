import React from 'react';
import { Table, Button } from '@mantine/core';
import { Filter } from '@/app/trials/text-classification/types';

interface SavedFiltersTableProps {
    filters: Filter[];
    onDelete: (id: string) => void;
}

const SavedFiltersTable: React.FC<SavedFiltersTableProps> = ({ filters, onDelete }) => (
    <Table>
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Metric</Table.Th>
                <Table.Th>Text</Table.Th>
                <Table.Th>Color</Table.Th>
                <Table.Th>Settings</Table.Th>
                <Table.Th>Actions</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {filters.map((filter) => (
                <Table.Tr key={filter.id}>
                    <Table.Td>{filter.metric}</Table.Td>
                    <Table.Td>{filter.text}</Table.Td>
                    <Table.Td>
                        <div style={{ width: 20, height: 20, backgroundColor: filter.color, border: '1px solid black' }} />
                    </Table.Td>
                    <Table.Td>
                        {Object.entries(filter).map(([key, value]) => {
                            if (['id', 'metric', 'text', 'color'].includes(key)) return null;
                            return <div key={key}>{`${key}: ${value}`}</div>;
                        })}
                    </Table.Td>
                    <Table.Td>
                        <Button color="red" onClick={() => onDelete(filter.id)}>Delete</Button>
                    </Table.Td>
                </Table.Tr>
            ))}
        </Table.Tbody>
    </Table>
);

export { SavedFiltersTable };
