'use client';

import { tableDataFamily, tableHeadersFamily } from '@/app/trials/crud-trials/atoms';
import CRUDTable from '@/app/trials/crud-trials/CRUDTable';
import { Space } from '@mantine/core';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { DataItem, Header } from './types';

const headers1: Header[] = [
    { id: 'name', name: 'Name' },
    { id: 'age', name: 'Age' },
    { id: 'email', name: 'Email' },
    { id: 'address', name: 'Address' },
    { id: 'phone', name: 'Phone' },
];

const data1: DataItem[] = [
    { id: '1', name: 'Alice', age: 25, email: 'alice@example.com', address: '123 Maple St', phone: '123-456-7890' },
    { id: '2', name: 'Bob', age: 30, email: 'bob@example.com', address: '456 Oak St', phone: '234-567-8901' },
    { id: '3', name: 'Charlie', age: 35, email: 'charlie@example.com', address: '789 Pine St', phone: '345-678-9012' },
    { id: '4', name: 'David', age: 40, email: 'david@example.com', address: '101 Elm St', phone: '456-789-0123' },
    { id: '5', name: 'Eve', age: 45, email: 'eve@example.com', address: '202 Birch St', phone: '567-890-1234' },
];

const headers2: Header[] = [
    { id: 'product', name: 'Product' },
    { id: 'price', name: 'Price' },
    { id: 'category', name: 'Category' },
    { id: 'stock', name: 'Stock' },
    { id: 'supplier', name: 'Supplier' },
];

const data2: DataItem[] = [
    { id: '1', product: 'Laptop', price: 1000, category: 'Electronics', stock: 50, supplier: 'TechCorp' },
    { id: '2', product: 'Phone', price: 500, category: 'Electronics', stock: 150, supplier: 'MobileInc' },
    { id: '3', product: 'Headphones', price: 200, category: 'Audio', stock: 100, supplier: 'SoundWave' },
    { id: '4', product: 'Monitor', price: 300, category: 'Electronics', stock: 75, supplier: 'ScreenTech' },
    { id: '5', product: 'Keyboard', price: 100, category: 'Accessories', stock: 200, supplier: 'KeyWorks' },
];

const headers3: Header[] = [
    { id: 'city', name: 'City' },
    { id: 'population', name: 'Population' },
    { id: 'state', name: 'State' },
    { id: 'area', name: 'Area (sq mi)' },
    { id: 'founded', name: 'Founded' },
];

const data3: DataItem[] = [
    { id: '1', city: 'New York', population: 8000000, state: 'NY', area: 302.6, founded: 1624 },
    { id: '2', city: 'Los Angeles', population: 4000000, state: 'CA', area: 468.7, founded: 1781 },
    { id: '3', city: 'Chicago', population: 2700000, state: 'IL', area: 227.3, founded: 1833 },
    { id: '4', city: 'Houston', population: 2300000, state: 'TX', area: 637.4, founded: 1837 },
    { id: '5', city: 'Phoenix', population: 1600000, state: 'AZ', area: 517.6, founded: 1868 },
];

const App = () => {
    const setHeaders1 = useSetRecoilState(tableHeadersFamily('table1'));
    const setData1 = useSetRecoilState(tableDataFamily('table1'));
    const setHeaders2 = useSetRecoilState(tableHeadersFamily('table2'));
    const setData2 = useSetRecoilState(tableDataFamily('table2'));
    const setHeaders3 = useSetRecoilState(tableHeadersFamily('table3'));
    const setData3 = useSetRecoilState(tableDataFamily('table3'));

    useEffect(() => {
        setHeaders1(headers1);
        setData1(data1);
        setHeaders2(headers2);
        setData2(data2);
        setHeaders3(headers3);
        setData3(data3);
    }, [setHeaders1, setData1, setHeaders2, setData2, setHeaders3, setData3]);

    return (
        <div>
            <CRUDTable  moduleName="table1" />
            <Space h="lg" />
            <CRUDTable moduleName="table2" />
            <Space h="lg" />
            <CRUDTable moduleName="table3" />
        </div>
    );
};

export default App;
