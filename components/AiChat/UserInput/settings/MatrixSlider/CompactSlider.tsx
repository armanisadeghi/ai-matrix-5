import React, { useState } from 'react'
import { Slider, Box, Grid } from '@mantine/core'

// This isn't needed anymore because the new one is much better and fully reusable and integrated with atoms!

const CompactSlider = () => {
    const [value, setValue] = useState(0)

    const marks = [
        { value: 0, label: 'Matrix AI' },
        { value: 2, label: 'GPT-4o' },
        { value: 4, label: 'Conductor' },
        { value: 6, label: 'Lattice' },
        { value: 8, label: 'Cluster' },
        { value: 10, label: 'Hypercluster' }
    ]

    const getLabel = (val: number) => {
        const mark = marks.find((mark) => mark.value === val)
        return mark ? mark.label : ''
    }

    const getDynamicMark = (val: number) => {
        const mark = marks.find((mark) => mark.value === val)
        return mark ? [{ value: mark.value, label: mark.label }] : []
    }

    return (
        <Grid>
            <Grid.Col span={1}></Grid.Col>
            <Grid.Col span={10}>
                <Slider
                    color="gray"
                    size="xs"
                    min={0}
                    max={10}
                    value={value}
                    onChange={setValue}
                    marks={getDynamicMark(value)}
                />
            </Grid.Col>
            <Grid.Col span={1}></Grid.Col>
        </Grid>
    )
}

export default CompactSlider

/*
    return (
        <div style={{ marginTop: '10px', alignItems: 'center' }}>
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span={10}>
                    <Slider
                        color="gray"
                        size="xs"
                        min={0}
                        max={10}
                        value={value}
                        onChange={setValue}
                        marks={getDynamicMark(value)}
                    />
                </Grid.Col>
                <Grid.Col span={1}></Grid.Col>
            </Grid>
        </div>
    );
};

 */
