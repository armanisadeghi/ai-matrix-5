import React from 'react';
import { Slider, Grid } from '@mantine/core';

const FullSlider = () => {
    return (
        <div style={{ height: '1px', marginTop: '10px', alignItems: 'center' }}>
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span={10}>
                    <Slider
                        color="gray"
                        size="xs"
                        min={0}
                        max={10}
                        marks={[
                            { value: 0, label: 'Matrix AI' },
                            { value: 2, label: 'GPT-4o' },
                            { value: 4, label: 'Conductor' },
                            { value: 6, label: 'Lattice' },
                            { value: 8, label: 'Cluster' },
                            { value: 10, label: 'Hypercluster' },
                        ]}
                    />
                </Grid.Col>
                <Grid.Col span={1}></Grid.Col>
            </Grid>
        </div>
    );
};

export default FullSlider;
