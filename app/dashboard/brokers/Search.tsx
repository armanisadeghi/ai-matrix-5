import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Broker } from '@/types/broker';

const SearchComponent = ({ brokersList, setFilteredBrokers }: { brokersList: Broker[], setFilteredBrokers: React.Dispatch<React.SetStateAction<Broker[]>> }) => {
    const [value, setValue] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInput = e.target.value.toLowerCase();
        setValue(searchInput);

        setFilteredBrokers(brokersList.filter((broker) =>
            broker.name.toLowerCase().includes(searchInput)
        ))
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