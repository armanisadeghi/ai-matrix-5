'use client';

import supabase from '@/utils/supabase/client';
import React, { useEffect } from 'react';
import { useRecoilValue, selectorFamily, atom, useRecoilState } from 'recoil';

// Define the type for fetched data
interface DataItem {
    id: string;
    name: string;
    description: string;
    // Add additional properties as needed
}

const dataItemAtom = atom<DataItem | null>({
    key: 'dataItemAtom',
    default: null,
});

//@ts-ignore
async function fetchDataById(id: string, rpc_name: string): Promise<DataItem> {
    let data: any, error: any;
    //@ts-ignore
    ({data, error} = await supabase.rpc(rpc_name, {id: id}));

    if (error) {
        console.error('Error fetching user chats:', error);

    } else {
        console.log('User chats:', data);
        return data;
    }
}



const dataItemSelector = selectorFamily<DataItem | null, string>({
    key: 'dataItemSelector',
    get: (id) => async () => {
        if (!id) return null;
        try {
            //@ts-ignore
            return await fetchDataById(id);
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    },
});

const DataPage = ({ params }: { params: { id: string } }) => {
    const [dataItem, setDataItem] = useRecoilState(dataItemAtom);
    const dataItemFromSelector = useRecoilValue(dataItemSelector(params.id));

    useEffect(() => {
        if (dataItemFromSelector) {
            setDataItem(dataItemFromSelector);
        }
    }, [dataItemFromSelector, setDataItem]);

    // Handle loading state
    if (!dataItem) {
        return <p>Loading...</p>; // or display an appropriate loading indicator or message
    }

    return (
        <div>
            <h1>Data Item Details</h1>
            <pre>{JSON.stringify(dataItem, null, 2)}</pre>
        </div>
    );
};

export default DataPage;
