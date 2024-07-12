import React from 'react';
import { Grid, SegmentedControl, Text } from '@mantine/core';
import { brokerDataTypesAtom, filteringAtom } from '@/context/atoms';
import { useRecoilState } from 'recoil';

const LeftPanel: React.FC = () => {
    const [filtering, setFiltering] = useRecoilState(filteringAtom);
    const [dataTypes] = useRecoilState(brokerDataTypesAtom);

    const handleDataTypeChange = (selectedDataType: string) => {
        setFiltering(selectedDataType || 'All');
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, lg: 12 }}>
                <Text size='sm'>Filter by Data Type</Text>
                <SegmentedControl
                    key={filtering}
                    orientation="vertical"
                    fullWidth
                    value={filtering}
                    onChange={handleDataTypeChange}
                    data={[...dataTypes, 'All']}
                />
            </Grid.Col>
        </Grid>
    );
};

export default LeftPanel;