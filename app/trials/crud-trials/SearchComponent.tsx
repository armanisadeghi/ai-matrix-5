import { dataListStateFamily, filteredDataStateFamily, searchValueStateFamily } from '@/app/trials/crud-trials/atoms';
import React from 'react';
import { TextInput } from '@mantine/core';
import { useRecoilState } from 'recoil';


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
