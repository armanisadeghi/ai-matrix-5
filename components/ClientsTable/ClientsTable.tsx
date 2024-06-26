"use client";

import React, { useEffect, useState } from "react";
import { DataTable, DataTableProps } from "mantine-datatable";
import { Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { PATH_ADMIN } from "@/routes";

interface ClientsTableProps {
    data: any;
}

const PAGE_SIZE = 10;

export function ClientsTable({ data }: ClientsTableProps) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));

    const columns: DataTableProps<any>["columns"] = [
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
            render: (record) => (
                <Button
                    variant="subtle"
                    size="sm"
                    leftSection={<IconEye />}
                    component={Link}
                    href={PATH_ADMIN.clients.view(record.id)}
                >
                    View
                </Button>
            ),
        },
    ];

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(data.slice(from, to));
    }, [page]);

    return (
        <DataTable
            columns={columns}
            records={records}
            totalRecords={data.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
            borderRadius="md"
            withTableBorder
        />
    );
}
