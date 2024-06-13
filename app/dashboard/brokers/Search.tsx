import React, { useEffect, useState } from 'react';
import { Autocomplete, TextInput } from '@mantine/core';
import { Broker } from '@/types/broker';

const SearchComponent = ({ brokersList, setBrokersList, filteredBrokers, setFilteredBrokers }: { brokersList: Broker[], setBrokersList: React.Dispatch<React.SetStateAction<Broker[]>>, filteredBrokers: Broker[], setFilteredBrokers: React.Dispatch<React.SetStateAction<Broker[]>> }) => {
    const [value, setValue] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInput = e.target.value.toLowerCase();
        setValue(searchInput);

        setBrokersList(brokersList.filter((broker) =>
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