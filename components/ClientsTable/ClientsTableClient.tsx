// components/ClientsTable/ClientsTableClient.tsx

'use client';

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DataTable, DataTableProps } from "mantine-datatable";
import { Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { PATH_ADMIN } from "@/routes";

interface ClientsTableClientProps {
    initialData: any[];
}

const PAGE_SIZE = 10;

export function ClientsTableClient({ initialData }: ClientsTableClientProps) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(() => initialData.slice(0, PAGE_SIZE));

    const columns: DataTableProps<any>["columns"] = useMemo(() => [
        { accessor: "company_name" },
        { accessor: "address_line" },
        { accessor: "city" },
        { accessor: "state" },
        { accessor: "zip" },
        { accessor: "country" },
        { accessor: "primary_contact" },
        {
            accessor: "",
            title: "Actions",
            render: useCallback((record: any) => (
                <Button
                    variant="subtle"
                    size="sm"
                    leftSection={<IconEye />}
                    component={Link}
                    href={PATH_ADMIN.clients.view(record.id)}
                >
                    View
                </Button>
            ), []),
        },
    ], []);

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(initialData.slice(from, to));
    }, [page, initialData]);

    const handlePageChange = useCallback((p: number) => setPage(p), []);

    return (
        <DataTable
            columns={columns}
            records={records}
            totalRecords={initialData.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={handlePageChange}
            borderRadius="md"
            withTableBorder
        />
    );
}
