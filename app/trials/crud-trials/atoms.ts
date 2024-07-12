import { CategoryItem, DataItem, Header } from '@/app/trials/crud-trials/types';
import supabase from '@/utils/supabase/client';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';


export const moduleNameFamily = atomFamily<string, string>({
    key: 'moduleName',
    default: ''
});

// Atom family for storing headers for each table
export const tableHeadersFamily = atomFamily<Header[], string>({
    key: 'tableHeaders',
    default: []
});

// Atom family for storing data for each table
export const tableDataFamily = atomFamily<DataItem[], string>({
    key: 'tableData',
    default: []
});

// Atom family for managing the loading state for each table
export const tableLoadingStateFamily = atomFamily<boolean, string>({
    key: 'tableLoading',
    default: false
});

// Atom family for pagination state
export const tablePageStateFamily = atomFamily<number, string>({
    key: 'tablePageState',
    default: 1
});

export const addItemModalStateFamily = atomFamily<boolean, string>({
    key: 'addItemModalState',
    default: false
});

// Atom family to manage the open state and current item for the Edit Item modal for each table
export const editItemModalStateFamily = atomFamily<{
    opened: boolean;
    currentItem: DataItem | null;
}, string>({
    key: 'editItemModalState',
    default: {opened: false, currentItem: null}
});

// Atom family for storing the full list of data items for each table
export const dataListStateFamily = atomFamily<DataItem[], string>({
    key: 'dataListStateFamily',
    default: []
});

// Atom family for storing the filtered list of data items based on search criteria for each table
export const filteredDataStateFamily = atomFamily<DataItem[], string>({
    key: 'filteredDataStateFamily',
    default: []
});

// Atom family for storing the search value for each table
export const searchValueStateFamily = atomFamily<string, string>({
    key: 'searchValueStateFamily',
    default: ''
});

export const categoryItemsFamily = atomFamily<CategoryItem[], string>({
    key: 'categoryItemsFamily',
    default: []
});

export const dataItemAtom = atom<DataItem | null>({
    key: 'dataItemAtom',
    default: null,
});

type DynamicRpcName = any;

// Adjust your selector to use this less strict type
export const fetchDataSelector = selectorFamily<DataItem | null, { id: string; rpcName: DynamicRpcName }>({
    key: 'fetchDataSelector',
    get: ({id, rpcName}) => async () => {
        if (!id || !rpcName) return null;
        try {
            const {data, error} = await supabase.rpc(rpcName, {id});
            if (error) {
                console.error('Error fetching data:', error);
                return null;
            }
            return data as DataItem;
        }
        catch (error) {
            console.error('Error in RPC call:', error);
            return null;
        }
    },
});

// Central configuration type
type CRUDConfig = {
    headers: Header[];
    fetchData: () => Promise<DataItem[]>;
    addLink: string;
    rpcName: string; // Example addition if using dynamic RPC names for fetching
};

// Central configuration atom
export const crudConfigAtom = atom<CRUDConfig | null>({
    key: 'crudConfig',
    default: null,
});

// Dynamic data fetcher based on current configuration
export const fetchedDataSelector = selector<DataItem[]>({
    key: 'fetchedData',
    get: async ({get}) => {
        const config = get(crudConfigAtom);
        if (!config) return [];
        try {
            return await config.fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    },
});
