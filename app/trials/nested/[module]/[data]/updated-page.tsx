'use client';

import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataItemAtom, fetchDataSelector } from '@/app/trials/crud-trials/atoms';

const DataPage = ({ rpcName, id }: { rpcName: string; id: string }) => {
    const setDataItem = useSetRecoilState(dataItemAtom);
    const dataItem = useRecoilValue(fetchDataSelector({ id, rpcName }));

    useEffect(() => {
        if (dataItem) {
            setDataItem(dataItem);
        }
    }, [dataItem, setDataItem]);

    if (!dataItem) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Data Item Details</h1>
            <pre>{JSON.stringify(dataItem, null, 2)}</pre>
        </div>
    );
};

export default DataPage;
