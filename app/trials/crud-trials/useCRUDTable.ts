import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DataItem, Header } from '@/app/trials/crud-trials/types';
import { moduleNameFamily, tableHeadersFamily, tableDataFamily, tableLoadingStateFamily, tablePageStateFamily, addItemModalStateFamily, dataListStateFamily, editItemModalStateFamily, filteredDataStateFamily } from './atoms';

const itemsPerPage = 10;

const useCRUDTable = (tableId: string) => {
    const [headers, setHeaders] = useRecoilState(tableHeadersFamily(tableId));
    const [data, setData] = useRecoilState(tableDataFamily(tableId));
    const [loading, setLoading] = useRecoilState(tableLoadingStateFamily(tableId));
    const [activePage, setPage] = useRecoilState(tablePageStateFamily(tableId));
    const [currentItem, setCurrentItem] = useState<DataItem | null>(null);
    const [moduleName] = useRecoilState(moduleNameFamily(tableId));
    const [addItemModalOpened, setAddItemModalOpened] = useRecoilState(addItemModalStateFamily(tableId));
    const [editItemModalState, setEditItemModalState] = useRecoilState(editItemModalStateFamily(tableId));
    const [localDataList, setLocalDataList] = useRecoilState(dataListStateFamily(tableId));
    const setFilteredData = useSetRecoilState(filteredDataStateFamily(tableId));

    const router = useRouter();

    useEffect(() => {
        setLocalDataList(data);
        setFilteredData(data);
    }, [data]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = localDataList.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    const addNewItem = (itemData: Omit<DataItem, 'id'>) => {
        const newItem: DataItem = { id: Date.now().toString(), ...itemData };
        setData([...data, newItem]);
    };

    const updateItem = (updatedItem: Omit<DataItem, 'id'>) => {
        if (currentItem) {
            const updatedData = data.map(item => item.id === currentItem.id ? { ...item, ...updatedItem } : item);
            setData(updatedData);
        }
    };

    const deleteItem = (id: string) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleRowClick = (id: string) => {
        router.push(`/trials/crud/${moduleName}/${id}`);
    };

    return {
        headers,
        setHeaders,
        data,
        setData,
        loading,
        setLoading,
        activePage,
        setPage,
        currentItem,
        setCurrentItem,
        addItemModalOpened,
        setAddItemModalOpened,
        editItemModalState,
        setEditItemModalState,
        localDataList,
        setLocalDataList,
        setFilteredData,
        totalPages,
        paginatedData,
        addNewItem,
        updateItem,
        deleteItem,
        handleRowClick,
    };
};

export default useCRUDTable;
