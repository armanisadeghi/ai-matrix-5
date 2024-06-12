"use client";
import { createBrokerManager } from '@/services/brokerService';
import BrokerList from './BrokerList';
import { useEffect, useState } from 'react';
import { Burger, Button, Grid, Paper } from '@mantine/core';
import LeftPanel from './LeftPanel';
import Link from 'next/link';
import { IconArrowLeft, IconPlus } from '@tabler/icons-react';

const BrokersPage: React.FC = (): JSX.Element => {
    const [opened, setOpened] = useState(true);

    const brokerManager = createBrokerManager();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await brokerManager.fetchBrokers();
            } catch (error) {
                console.error('Error fetching brokers:', error);
            }
        };
        fetchData();
    }, [brokerManager]);

    return (
        <Grid >
            <Grid.Col span={2} >
                <Burger style={{ display: opened ? 'none' : 'block' }} />
            </Grid.Col>
            <Grid.Col span={10}>
                <Link href="/dashboard/brokers/add">
                    <Button
                        variant="light"
                        leftSection={<IconPlus size={14} />}
                    >
                        Add Broker
                    </Button>
                </Link>
            </Grid.Col>
            <Grid.Col span={2}>
                <Paper>
                    <LeftPanel />
                </Paper>
            </Grid.Col>
            <Grid.Col span={10}>
                <Paper>
                    <BrokerList user={false} />
                </Paper>
            </Grid.Col>
        </Grid>
    )
}

export default BrokersPage