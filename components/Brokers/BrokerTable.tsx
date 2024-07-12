import { activeUserAtom } from '@/state/userAtoms';
import { useState } from 'react';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { Broker, dataType } from '@/types/broker';
import { createBrokerManager } from '@/services/brokerService';
import { Notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { brokersAtom, filteredAndSortedDataSelector, sortingAtom } from '@/context/atoms/brokerAtoms';

const PAGE_SIZE = 20;

const BrokerTable = () => {
    const brokerManager = createBrokerManager();
    const setBrokers = useSetRecoilState(brokersAtom);
    const filteredAndSortedData = useRecoilValue<Broker[]>(filteredAndSortedDataSelector);
    const setSortedData = useSetRecoilState(sortingAtom);
    const router = useRouter()
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Broker>>({
        columnAccessor: 'name',
        direction: 'asc',
    });
    const activeUser = useRecoilValue(activeUserAtom);
    const key = 'resize-example';

    const handleDelete = async (broker: Broker) => {
        await brokerManager.deleteBroker(broker.id);
        setBrokers((prev: Broker[]) => prev.filter((item) => item.id !== broker.id));
        Notifications.show({
            title: 'Broker Deleted',
            message: `${broker.displayName} has been deleted.`,
        })

    };

    const columns: DataTableColumn<Broker>[] = [
        { accessor: 'displayName', title: 'Broker Name', sortable: true, resizable: true },
        { accessor: 'dataType', title: 'Data Type', width: 160, sortable: true, resizable: true },
        { accessor: 'componentType', title: 'Component', width: 160, sortable: true, resizable: true },
        { accessor: 'description', title: 'Description', resizable: true },
        {
            accessor: 'actions',
            title: 'Action',
            textAlign: 'left',
            render: (broker: Broker) => (
                <Group wrap="nowrap">
                    <Tooltip label="Delete broker">
                        <ActionIcon onClick={() => handleDelete(broker)}>
                            <IconTrash size={14} />
                        </ActionIcon>
                    </Tooltip>
                    {activeUser.matrixId === broker.matrixId &&
                        <Tooltip label="Edit broker">
                            <ActionIcon onClick={() => handleEdit(broker)}>
                                <IconEdit size={14} />
                            </ActionIcon>
                        </Tooltip>
                    }
                </Group>
            ),
        },
    ];

    const handleEdit = (broker: Broker) => {
        router.push(`brokers/edit/${broker.id}`)
    }

    const handleSortChange = (newSortStatus: DataTableSortStatus<Broker>) => {
        setSortStatus(newSortStatus);
        setSortedData({ column: newSortStatus.columnAccessor as 'displayName' | 'dataType' | 'componentType', direction: newSortStatus.direction });
    };

    return (
        <DataTable
            striped
            totalRecords={filteredAndSortedData.length}
            minHeight={400}
            maxHeight={1000}
            highlightOnHover
            page={page}
            onPageChange={setPage}
            recordsPerPage={PAGE_SIZE}
            records={filteredAndSortedData.map((broker) => ({
                ...broker, dataType: dataType[broker.dataType as keyof typeof dataType],
            }))}
            columns={columns}
            sortStatus={sortStatus}
            onSortStatusChange={handleSortChange}
            storeColumnsKey={key}
        />
    );
};

export default BrokerTable;
