import React, { useEffect, useState } from 'react';
import { Group, Container, Text, Badge, Burger, Paper, Stack, List } from '@mantine/core';
import { createBrokerManager } from '@/services/brokerService';
import { useRecoilValue } from 'recoil';
import { categoryAtom } from '@/context/atoms/brokerAtoms';

const LeftPanel: React.FC = () => {
    const categories = useRecoilValue(categoryAtom);

    const brokerManager = createBrokerManager();

    useEffect(() => {
        const fetchCategory = async () => {
            await brokerManager.fetchCategories();
        };
        fetchCategory();
    }, []);

    return (
        <Paper>
            <Stack>
                {categories.map((category) => (
                    <Text size="sm" key={category}>{category}</Text>
                ))}
            </Stack>
        </Paper>
    );
};

export default LeftPanel;