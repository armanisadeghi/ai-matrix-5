import { useState } from 'react';
import { ActionIcon, Box, Group, Tooltip } from '@mantine/core';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DataTableSortStatus, useDataTableColumns } from 'mantine-datatable';
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

    const columns: DataTableColumn<Broker>[] = [
        { accessor: 'name', title: 'Broker Name', sortable: true, resizable: true },
        { accessor: 'dataType', title: 'Data Type', width: 160, sortable: true, resizable: true },
        { accessor: 'component.type', title: 'Component', width: 160, sortable: true, resizable: true },
        { accessor: 'category', title: 'Category', width: 160, sortable: true, resizable: true },
        { accessor: 'description', title: 'Description', resizable: true },
        { accessor: 'component.defaultValue', title: 'Default Value', width: 160, resizable: true },
        {
            accessor: 'actions',
            title: 'Action',
            textAlign: 'left',
            render: (broker: Broker) => (
                <Group wrap="nowrap">
                    <Tooltip label="Edit broker">
                        <ActionIcon onClick={() => handleEdit(broker)}>
                            <IconEdit size={14} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete broker">
                        <ActionIcon onClick={() => handleDelete(broker)}>
                            <IconTrash size={14} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            ),
        },
    ];

    const handleEdit = (broker: any) => {
        router.push(`brokers/edit/${broker.id}`)
    }

    const handleSortChange = (newSortStatus: DataTableSortStatus<Broker>) => {
        setSortStatus(newSortStatus);
    };

    return (
        <DataTable
            striped={true}
            totalRecords={brokers.length}
            minHeight={400}
            maxHeight={1000}
            highlightOnHover
            page={page}
            onPageChange={setPage}
            recordsPerPage={PAGE_SIZE}
            records={brokers}
            columns={columns}
            sortStatus={sortStatus}
            onSortStatusChange={handleSortChange}
            storeColumnsKey={key}
        />
    );
};

export default BrokerTable;