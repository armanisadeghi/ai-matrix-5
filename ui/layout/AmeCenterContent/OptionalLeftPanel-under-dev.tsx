"use client";

import React, { useState } from 'react';
import { SegmentedControl, Grid, ScrollArea } from '@mantine/core';
import { useRecoilValue, atomFamily } from 'recoil';
import { useMediaQuery } from '@mantine/hooks';
import { v4 as uuidv4 } from 'uuid';

// Define CategoryItem type
interface CategoryItem {
    key: string;
    label: string;
    value: string;
}

// Atom family for CategoryItems
export const categoryItemsFamilyDev = atomFamily<CategoryItem[], string>({
    key: 'categoryItemsFamily',
    default: [],
});

interface LeftPanelProps {
    componentID: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ componentID }) => {
    const categories = useRecoilValue(categoryItemsFamilyDev(componentID));
    const [value, setValue] = useState('All');
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <Grid>
            {isMobile ? (
                <Grid.Col span={12}>
                    <ScrollArea style={{ height: '50px' }}>
                        <SegmentedControl
                            orientation="horizontal"
                            fullWidth
                            value={value}
                            onChange={setValue}
                            data={[...categories, { key: uuidv4(), label: 'All', value: 'All' }]}
                        />
                    </ScrollArea>
                </Grid.Col>
            ) : (
                <Grid.Col span={12}>
                    <SegmentedControl
                        orientation="vertical"
                        fullWidth
                        value={value}
                        onChange={setValue}
                        data={[...categories, { key: uuidv4(), label: 'All', value: 'All' }]}
                    />
                </Grid.Col>
            )}
        </Grid>
    );
};

export default LeftPanel;
