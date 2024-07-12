// components/ClientsTable/ClientsTable.tsx

import React from 'react';
import { ClientsTableClient } from './ClientsTableClient';

interface ClientsTableProps {
    data: any[];
}

export function ClientsTable({ data }: ClientsTableProps) {
    return <ClientsTableClient initialData={data} />;
}
