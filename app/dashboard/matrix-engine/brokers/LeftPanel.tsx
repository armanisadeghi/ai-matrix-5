import React, { useState } from 'react';
import { SegmentedControl, Grid, Text } from '@mantine/core';
import { uuid } from 'uuidv4';
import { Broker } from '@/types/broker';

interface LeftPanelProps {
    brokers: Broker[];
    setFilteredBrokers: React.Dispatch<React.SetStateAction<Broker[]>>;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ brokers, setFilteredBrokers }: LeftPanelProps) => {
    const categories = [...new Set(brokers.map((broker: any) => broker.category))].filter((category: any) => category).sort();
    const dataTypes = [...new Set(brokers.map((broker: any) => broker.dataType))].filter((dataType: any) => dataType).sort();
    const [categoryValue, setCategoryValue] = useState('All');
    const [dataTypeValue, setDataTypeValue] = useState('All');

    const handleCategoryChange = (selectedCategory: string) => {
        setFilteredBrokers(selectedCategory === 'All' ? brokers : brokers.filter((broker: any) => broker.category === selectedCategory));
        setCategoryValue(selectedCategory);
    };

    const handleDataTypeChange = (selectedDataType: string) => {
        setFilteredBrokers(selectedDataType === 'All' ? brokers : brokers.filter((broker: any) => broker.dataType === selectedDataType));
        setDataTypeValue(selectedDataType);
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, lg: 12 }}>
                <Text size='sm'>Filter by category</Text>
                <SegmentedControl

                    key={categoryValue}
                    orientation="vertical"
                    fullWidth
                    value={categoryValue}
                    onChange={handleCategoryChange}
                    data={
                        [...categories, 'All'].map((category) => ({
                            key: uuid(),
                            label: category,
                            value: category
                        }))
                    }
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 12 }}>
                <Text size='sm'>Filter by Data Type</Text>
                <SegmentedControl
                    key={dataTypeValue}
                    orientation="vertical"
                    fullWidth
                    value={dataTypeValue}
                    onChange={handleDataTypeChange}
                    data={
                        [...dataTypes, 'All'].map((dataType) => ({
                            key: uuid(),
                            label: dataType,
                            value: dataType
                        }))
                    }
                />
            </Grid.Col>
        </Grid>
    );
};

export default LeftPanel;