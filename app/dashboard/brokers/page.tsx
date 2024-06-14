"use client";
import { createBrokerManager } from '@/services/brokerService';
import BrokerList from './BrokerList';
import { useEffect, useState } from 'react';
import { Burger, Button, Flex, Grid, Group, Space, Stack } from '@mantine/core';
import LeftPanel from './LeftPanel';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import Search from './Search';
import { Broker } from '@/types/broker';
import VerticalSplitter from '@/ui/split/VerticalSplitter';

const BrokersPage: React.FC = (): JSX.Element => {
    const [brokersList, setBrokersList] = useState<Broker[]>([]);
    const [filteredBrokers, setFilteredBrokers] = useState<Broker[]>([]);
    const brokerManager = createBrokerManager();

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

    return (
        <VerticalSplitter
            initialSizes={[30, 70]}
            children={[
                <LeftPanel />,
                <Stack>
                    <Group><Link href="/dashboard/brokers/add">
                        <Button
                            variant="light"
                            leftSection={<IconPlus size={14} />}
                        >
                            Add Broker
                        </Button>
                    </Link>
                        <Search brokersList={brokersList} setFilteredBrokers={setFilteredBrokers} />
                    </Group>
                    <BrokerList brokers={filteredBrokers} />
                </Stack>
            ]}
            expandToMin={false} />
    )
}

export default BrokersPage