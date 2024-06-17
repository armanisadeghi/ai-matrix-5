import { useState } from 'react';
import { ActionIcon, Box, Group } from '@mantine/core';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableSortStatus, useDataTableColumns } from 'mantine-datatable';
import { Broker } from '@/types/broker';
import { createBrokerManager } from '@/services/brokerService';
import { Notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

const PAGE_SIZE = 20;

const BrokerTable = ({ brokers, setFilteredBrokers }: { brokers: Broker[], setFilteredBrokers: React.Dispatch<React.SetStateAction<Broker[]>> }) => {
    const brokerManager = createBrokerManager();
    const router = useRouter()
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Broker>>({
        columnAccessor: 'name',
        direction: 'asc',
    });
    const key = 'resize-example';

    const handleDelete = async (broker: any) => {
        await brokerManager.deleteBroker(broker.id);
        setFilteredBrokers(brokers.filter((broker) => broker.id !== broker.id));
        Notifications.show({
            title: 'Broker Deleted',
            message: `${broker.name} has been deleted.`,
        })
    };

    const handleEdit = (broker: any) => {
        router.push(`/dashboard/brokers/edit/${broker.id}`)
    }
    const { effectiveColumns, resetColumnsWidth } = useDataTableColumns<Broker>({
        key,
        columns: [
            { accessor: 'name', width: '40%', sortable: true, resizable: true },
            { accessor: 'description', width: '60%', resizable: true },
            { accessor: 'dataType', width: 160, sortable: true, resizable: true },
            { accessor: 'defaultValue', width: 160, resizable: true, render: ({ value: value }) => value ? value : 'N/A' },
            { accessor: 'category', width: 160, sortable: true, resizable: true },
            {
                accessor: 'actions',
                title: <Box mr={6}>Actions</Box>,
                textAlign: 'right',
                render: (broker: Broker) => (
                    <Group gap={4} justify="right" wrap="nowrap">
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="gray"
                            onClick={() => handleEdit(broker)}
                        >
                            <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="gray"
                            onClick={() => handleDelete(broker)}
                        >
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                ),
            },
        ]
    });

    const handleSortChange = (newSortStatus: DataTableSortStatus<Broker>) => {
        setSortStatus(newSortStatus);
    };

    return (
        <DataTable
            striped
            totalRecords={brokers.length}
            minHeight={400}
            maxHeight={1000}
            withTableBorder
            withColumnBorders
            highlightOnHover
            page={page}
            onPageChange={setPage}
            recordsPerPage={PAGE_SIZE}
            records={brokers}
            columns={effectiveColumns}
            sortStatus={sortStatus}
            onSortStatusChange={handleSortChange}
            storeColumnsKey={key}
        />
    );
};

export default BrokerTable;