'use client';

import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Button, Group, Stack } from '@mantine/core';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import { Notifications } from '@mantine/notifications';
import VerticalSplitter from '@/ui/split/VerticalSplitter';
import { crudConfigAtom, fetchDataSelector, tableDataFamily, tableHeadersFamily } from '@/app/trials/crud-trials/atoms';
import CRUDTable from './CRUDTable';
import LeftPanel from './LeftPanel';
import SearchComponent from './SearchComponent';
import { DataItem, Header } from '@/app/trials/crud-trials/types';


interface CRUDListProps {
    moduleName: string;
    dataFetch?: () => Promise<DataItem[]>;
    deleteItem?: (id: string) => Promise<void>;
    editItem?: (item: DataItem) => void;
    addLink?: string;
}

const CRUDList: React.FC<CRUDListProps> = (
    {
        moduleName,
        dataFetch,
        deleteItem,
        editItem,
        addLink = '/add',
    }) => {
    const [dataList, setDataList] = useRecoilState(tableDataFamily(moduleName));
    const [headers, setHeaders] = useRecoilState(tableHeadersFamily(moduleName));
    const setCrudConfig = useSetRecoilState(crudConfigAtom);

    useEffect(() => {
        const config = {
            moduleName,
            headers,
            dataFetch,
            deleteItem,
            editItem,
            addLink,
        };

        setCrudConfig(config);

        const fetchData = async () => {
            if (dataFetch) {
                try {
                    const data = await dataFetch();
                    setDataList(data);
                }
                catch (error) {
                    console.error('Error fetching data:', error);
                    Notifications.show({
                        title: 'Error',
                        message: 'Failed to fetch data',
                        color: 'red',
                    });
                }
            }
        };

        fetchData();
    }, [moduleName, dataFetch, deleteItem, editItem, addLink, setDataList, setCrudConfig]);

    const handleDelete = async (id: string) => {
        if (deleteItem) {
            await deleteItem(id);
            setDataList(dataList.filter(item => item.id !== id));
            Notifications.show({
                title: 'Item Deleted',
                message: `Item with id ${id} has been deleted.`,
            });
        }
    };

    const handleEdit = (item: DataItem) => {
        if (editItem) {
            editItem(item);
            Notifications.show({
                title: 'Item Edited',
                message: `Item with id ${item.id} has been updated.`,
            });
        }
    };

    return (
        <VerticalSplitter
            initialSizes={[12, 88]}
            children={[
                <LeftPanel key="left-panel" moduleName={moduleName}/>,
                <Stack key="main-stack">
                    <Group>
                        <SearchComponent moduleName={moduleName}/>
                        <Link href={addLink} passHref>
                            <Button variant="light" leftSection={<IconPlus size={14}/>}>
                                Add Item
                            </Button>
                        </Link>
                    </Group>
                    <CRUDTable
                        headers={headers}
                        data={dataList}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        moduleName={moduleName}
                    />
                </Stack>
            ]}
            expandToMin={false}
        />
    );
};

export default CRUDList;
