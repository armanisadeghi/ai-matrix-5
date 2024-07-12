import React from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { seachQueryAtom } from '@/context/atoms';
import { useRecoilState } from 'recoil';

const SearchComponent = () => {
    const [filtering, setFiltering] = useRecoilState(seachQueryAtom);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltering(e.target.value);
    };

    return (
        <TextInput
            w={'100%'}
            leftSection={<IconSearch size={14} />}
            placeholder="Search for name..."
            value={filtering}
            onChange={handleSearchChange}
        />
    );
};

export default SearchComponent;