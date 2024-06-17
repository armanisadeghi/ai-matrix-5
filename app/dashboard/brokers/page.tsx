"use client";
import { createBrokerManager } from '@/services/brokerService';
import BrokerList from './BrokerList';
import { useEffect, useState } from 'react';
import { Burger, Button, Flex, Grid, Group, Select, Space, Stack } from '@mantine/core';
import LeftPanel from './LeftPanel';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import Search from './Search';
import { Broker } from '@/types/broker';
import VerticalSplitter from '@/ui/split/VerticalSplitter';
import BrokerTable from '@/components/Brokers/BrokerTable';
import { useMediaQuery } from '@mantine/hooks';

const BrokersPage: React.FC = (): JSX.Element => {
    const [brokersList, setBrokersList] = useState<Broker[]>([]);
    const [filteredBrokers, setFilteredBrokers] = useState<Broker[]>([]);
    const brokerManager = createBrokerManager();

    const isTablet = useMediaQuery('(max-width: 768px)');
    const isMobile = useMediaQuery('(max-width: 480px)');

    const fetchData = async () => {
        try {
            const data = await brokerManager.fetchBrokers();
            setBrokersList(data);
            setFilteredBrokers(data);
        } catch (error) {
            console.error('Error fetching brokers:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredBrokers(brokersList);
    }, [brokersList]);

    return (
        <VerticalSplitter
            initialSizes={isTablet || isMobile ? [0, 100] : [12, 88]}
            children={[
                !isTablet && !isMobile && <LeftPanel brokers={brokersList} setFilteredBrokers={setFilteredBrokers} />,
                <Stack>
                    <Flex gap="md"><Link href="/dashboard/brokers/add">
                        <Button
                            variant="light"
                            leftSection={<IconPlus size={14} />}
                        >
                            Add Broker
                        </Button>
                    </Link>
                        <Search brokersList={brokersList} setFilteredBrokers={setFilteredBrokers} />
                        <Select width={200} placeholder="Filter by category" data={['All', ...new Set(brokersList.map((broker) => broker.category))]} onChange={(value) => setFilteredBrokers(value === 'All' ? brokersList : brokersList.filter((broker) => broker.category === value))} />
                        <Select width={200} placeholder="Filter by data type" data={['All', ...new Set(brokersList.map((broker) => broker.dataType))]} onChange={(value) => setFilteredBrokers(value === 'All' ? brokersList : brokersList.filter((broker) => broker.dataType === value))} />
                    </Flex>
                    {/* <BrokerList brokers={filteredBrokers} />
                    <Space h="lg" /> */}
                    <BrokerTable brokers={filteredBrokers} setFilteredBrokers={setFilteredBrokers} />
                </Stack>
            ]}
            expandToMin={false} />
    )
}

export default BrokersPage