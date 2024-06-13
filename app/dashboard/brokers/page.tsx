"use client";
import { createBrokerManager } from '@/services/brokerService';
import BrokerList from './BrokerList';
import { useEffect, useState } from 'react';
import { Burger, Button, Flex, Grid, Space, Stack } from '@mantine/core';
import LeftPanel from './LeftPanel';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import Search from './Search';
import { Broker } from '@/types/broker';

const BrokersPage: React.FC = (): JSX.Element => {
    const [opened, setOpened] = useState(true);
    const [brokersList, setBrokersList] = useState<Broker[]>([]);
    const brokerManager = createBrokerManager();

    const fetchData = async () => {
        try {
            const data = await brokerManager.fetchBrokers();
            setBrokersList(data);
        } catch (error) {
            console.error('Error fetching brokers:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Stack>
            <Grid>
                <Grid.Col span={2} >
                    <Burger style={{ display: opened ? 'none' : 'block' }} />
                </Grid.Col>
                <Grid.Col span={10}>
                    <Flex justify="flex-start" gap={"xs"}>
                        <Link href="/dashboard/brokers/add">
                            <Button
                                variant="light"
                                leftSection={<IconPlus size={14} />}
                            >
                                Add Broker
                            </Button>
                        </Link>
                        <Search brokersList={brokersList} setBrokersList={setBrokersList} />
                    </Flex>
                </Grid.Col>
            </Grid>
            <Grid grow>
                <Grid.Col span={2}>
                    <LeftPanel />
                </Grid.Col>
                <Grid.Col span={10}>
                    <BrokerList user={false} brokers={brokersList} />
                </Grid.Col>
            </Grid>
        </Stack>
    )
}

export default BrokersPage