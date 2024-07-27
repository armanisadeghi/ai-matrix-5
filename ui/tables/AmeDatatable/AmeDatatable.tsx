import { DataTable, DataTableProps } from "mantine-datatable";

export type AmeDatatableProps = DataTableProps;

export function AmeDatatable({ columns, records }: AmeDatatableProps) {
    return (
        // TODO: check striped and highlight props not working
        // @ts-expect-error
        <DataTable
            borderRadius="sm"
            withRowBorders={true}
            striped
            highlightOnHover
            columns={columns}
            records={records}
            minHeight={150}
        />
    );
}
