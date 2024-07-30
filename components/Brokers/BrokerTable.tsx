import { useEffect, useState } from 'react';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { Broker, dataType } from '@/types/broker';
import { createBrokerManager } from '@/services/brokerService';
import { Notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { brokersAtom, filteredAndSortedDataSelector, sortingAtom } from '@/context/atoms/brokerAtoms';
import { useCompleteUserProfile } from '@/hooks/users/useMatrixUser';

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
    const [records, setRecords] = useState(filteredAndSortedData.slice(0, PAGE_SIZE));
    const { activeUser } = useCompleteUserProfile();
    const key = 'resize-example';

    const handleDelete = async (broker: Broker) => {
        await brokerManager.deleteBroker(broker.id);
        setBrokers((prev: Broker[]) => prev.filter((item) => item.id !== broker.id));
        Notifications.show({
            title: 'Broker Deleted',
            message: `${broker.displayName} has been deleted.`,
        })

    };

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(filteredAndSortedData.slice(from, to));
    }, [page, filteredAndSortedData]);

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
                        <ActionIcon onClick={() => handleDelete(broker)} disabled={activeUser.matrix_id !== broker.matrixId}>
                            <IconTrash size={14} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Edit broker">
                        <ActionIcon onClick={() => handleEdit(broker)} disabled={activeUser.matrix_id !== broker.matrixId}>
                            <IconEdit size={14} />
                        </ActionIcon>
                    </Tooltip>
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
            highlightOnHover
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            recordsPerPage={PAGE_SIZE}
            records={records.map((broker) => ({
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