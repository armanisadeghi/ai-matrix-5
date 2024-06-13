import React, { useEffect, useState } from 'react';
import { Group, Container, Text, Badge, Burger, Paper, Stack, List, SegmentedControl, Flex, Grid, ScrollArea } from '@mantine/core';
import { createBrokerManager } from '@/services/brokerService';
import { useRecoilValue } from 'recoil';
import { categoryAtom } from '@/context/atoms/brokerAtoms';
import { useMediaQuery } from '@mantine/hooks';

const LeftPanel: React.FC = () => {
    const categories = useRecoilValue(categoryAtom);
    const [value, setValue] = useState('All');
    const isMobile = useMediaQuery('(max-width: 767px)');

    const brokerManager = createBrokerManager();

    useEffect(() => {
        const fetchCategory = async () => {
            await brokerManager.fetchCategories();
        };
        fetchCategory();
    }, []);

    return (
        <Grid>
            {isMobile ? (
                <Grid.Col span={{ base: 12, lg: 12 }}>
                    <ScrollArea style={{ height: '50px' }}>
                        <SegmentedControl
                            orientation="horizontal"
                            fullWidth
                            value={value}
                            onChange={setValue}
                            data={
                                [...categories, 'All'].map((category) => ({
                                    label: category,
                                    value: category
                                }))
                            }
                        />
                    </ScrollArea>
                </Grid.Col>
            ) : (
                <>
                    <Grid.Col span={{ base: 12, lg: 12 }}>
                        <SegmentedControl
                            orientation="vertical"
                            fullWidth
                            value={value}
                            onChange={setValue}
                            data={
                                [...categories, 'All'].map((category) => ({
                                    label: category,
                                    value: category
                                }))
                            }
                        />
                    </Grid.Col>

                </>
            )}
        </Grid>
    )
};

export default LeftPanel;