import React from 'react';
import { TextInput } from '@mantine/core';
import { atomFamily, useRecoilState } from 'recoil';

// Define the type for the data item
type DataItem = {
    id: string;
    name: string;
    [key: string]: any; // Allows any additional properties
};

// Define Recoil atom families for the states
const dataListStateFamily = atomFamily<DataItem[], string>({
    key: 'dataListStateFamily',
    default: []
});

const filteredDataStateFamily = atomFamily<DataItem[], string>({
    key: 'filteredDataStateFamily',
    default: []
});

const searchValueStateFamily = atomFamily<string, string>({
    key: 'searchValueStateFamily',
    default: ''
});

interface SearchComponentProps {
    componentID: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ componentID }) => {
    const [value, setValue] = useRecoilState(searchValueStateFamily(componentID));
    const [filteredData, setFilteredData] = useRecoilState(filteredDataStateFamily(componentID));
    const [localDataList, setLocalDataList] = useRecoilState(dataListStateFamily(componentID));

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInput = e.target.value.toLowerCase();
        setValue(searchInput);

        setFilteredData(
            localDataList.filter((item) =>
                item.name.toLowerCase().includes(searchInput)
            )
        );
    };

    return (
        <TextInput
            w={'50%'}
            placeholder="Search for name..."
            value={value}
            onChange={handleSearchChange}
        />
    );
};

export default SearchComponent;
