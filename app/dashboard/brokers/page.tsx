"use client";
import { createBrokerManager } from '@/services/brokerService';
import BrokerList from '../matrix-engine/custom-brokers/BrokerList';
import { useEffect, useState } from 'react';
import { Burger, Container, Grid, Group, Paper } from '@mantine/core';
import LeftPanel from './LeftPanel';

const BrokersPage: React.FC = (): JSX.Element => {
    const [opened, setOpened] = useState(false);

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
            <Grid.Col span={2} style={{ display: opened ? 'none' : 'block' }}>
                <Burger />
            </Grid.Col>
            <Grid.Col span={10}>
                Filters
            </Grid.Col>
            <Grid.Col span={2} h="full" style={{ borderRight: '1px solid gray', overflowY: "hidden" }}>
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