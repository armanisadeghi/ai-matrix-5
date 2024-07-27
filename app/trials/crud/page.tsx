// app/trials/crud/CRUDPage.tsx
'use client';

import React, { useMemo } from 'react';
import CRUDList from './components/CRUDList';
import { DataItem, Header } from './components/types';
import styles from './styles/crud.module.css';
import useCrudLogic from './useCrudLogic';

const CRUDPage: React.FC = () => {
    const { primaryItems, idKey, nameKey } = useCrudLogic();

    const headers: Header[] = useMemo(() => {
        if (primaryItems.length === 0) return [];
        return Object.keys(primaryItems[0]).map((key) => ({
            id: key,
            name: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
        }));
    }, [primaryItems]);

    const data: DataItem[] = useMemo(() => {
        return primaryItems.map((item: Record<string, any>) => ({
            ...item,
            id: item[idKey],
            name: item[nameKey],
        }));
    }, [primaryItems, idKey, nameKey]);

    return (
        <div className={styles['ame-crud-mainContainer']}>
            <h4>CRUD App</h4>
            <CRUDList
                headers={headers}
                dataFetch={async () => data}
                addLink={`/trials/crud/${idKey}`} // Replace with the correct link if needed
            />
        </div>
    );
};

export default CRUDPage;
