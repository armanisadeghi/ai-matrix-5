'use client';
import { overrideFlagAtom, presetTypeAtom } from '@/state/layoutAtoms';
import React, { useEffect, useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import { useRecoilState } from 'recoil';
import { atom } from 'recoil';
import CRUDTable from './CRUDTable';
import VerticalSplitter from '@/ui/split/VerticalSplitter';
import LeftPanel from './LeftPanel';
import SearchComponent from './SearchComponent';
import { Notifications } from '@mantine/notifications';
import { DataItem, Header } from './types';

interface CRUDListProps {
    headers?: Header[];
    dataFetch?: () => Promise<DataItem[]>;
    deleteItem?: (id: string) => Promise<void>;
    editItem?: (item: DataItem) => void;
    addLink?: string;
}

const dataState = atom<DataItem[]>({
    key: 'dataState',
    default: [],
});

const CRUDList: React.FC<CRUDListProps> = (
    {
        headers = [],
        dataFetch,
        deleteItem,
        editItem,
        addLink = '/add',
    }) => {
    const [dataList, setDataList] = useRecoilState(dataState);
    const [filteredData, setFilteredData] = useRecoilState(dataState);
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom);
    const [overrideFlag, setOverrideFlag] = useRecoilState(overrideFlagAtom);

    const fetchData = async () => {
        if (dataFetch) {
            try {
                const data = await dataFetch();
                setDataList(data);
                setFilteredData(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    useEffect(() => {
        setOverrideFlag(true);
        setPresetType('iconsNoAside');

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (deleteItem) {
            await deleteItem(id);
            setFilteredData(filteredData.filter((item) => item.id !== id));
            Notifications.show({
                title: 'Item Deleted',
                message: `Item with id ${id} has been deleted.`,
            });
        }
    };

    const handleEdit = (item: DataItem) => {
        if (editItem) {
            editItem(item);
        }
    };

    return (
        <VerticalSplitter
            initialSizes={[12, 88]}
            children={[
                <LeftPanel key="left-panel" componentID="leftPanel" />,
                <Stack key="main-stack">
                    <Group>
                        <SearchComponent componentID="searchComponent" />
                        <Link href={addLink}>
                            <Button variant="light" leftSection={<IconPlus size={14}/>}>
                                Add Item
                            </Button>
                        </Link>
                    </Group>
                    <CRUDTable headers={headers} data={filteredData} onDelete={handleDelete} onEdit={handleEdit}/>
                </Stack>
            ]}
            expandToMin={false}
        />
    );
};

export default CRUDList;
