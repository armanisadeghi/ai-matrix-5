'use client';

import { useState } from 'react';
import { Slider, Text, Box, Group, Grid, Space, Badge } from '@mantine/core';

function CustomProgressSlider() {
    const [value, setValue] = useState({ speed: 80, quality: 10, involvement: 5, steps: 5 });
    const total = value.speed + value.quality + value.involvement + value.steps;

    return (
        <Box mx="auto" p="md">
            <Group grow wrap="nowrap">
                <Text>Speed: {value.speed}</Text>
                <Text>Quality: {value.quality}</Text>
                <Text>Involvement: {value.involvement}</Text>
                <Text>Steps: {value.steps}</Text>
            </Group>
            <Box style={{ position: 'relative', height: '30px', width: '100%', backgroundColor: '#f3f3f3' }}>
                <Box
                    style={{
                        position: 'absolute',
                        height: '100%',
                        width: `${(value.speed / total) * 100}%`,
                        backgroundColor: '#9fbfdf'  // Soft Blue
                    }}
                />
                <Box
                    style={{
                        position: 'absolute',
                        left: `${(value.speed / total) * 100}%`,
                        height: '100%',
                        width: `${(value.quality / total) * 100}%`,
                        backgroundColor: '#e1d7d2'  // Soft Beige
                    }}
                />
                <Box
                    style={{
                        position: 'absolute',
                        left: `${((value.speed + value.quality) / total) * 100}%`,
                        height: '100%',
                        width: `${(value.involvement / total) * 100}%`,
                        backgroundColor: '#b7d7e8'  // Soft Cyan
                    }}
                />
                <Box
                    style={{
                        position: 'absolute',
                        left: `${((value.speed + value.quality + value.involvement) / total) * 100}%`,
                        height: '100%',
                        width: `${(value.steps / total) * 100}%`,
                        backgroundColor: '#d1c4e9'  // Soft Purple
                    }}
                />
                <Text style={{ position: 'absolute', width: '100%', textAlign: 'center', lineHeight: '30px' }}>
                    Total: {total}%
                </Text>
            </Box>
            <Space h="md" />
            <Grid>
                <Grid.Col span={1}><Badge color="blue">Speed</Badge> </Grid.Col>
                <Grid.Col span={11}>
                    <Slider
                    mt="md"
                    min={0}
                    max={100}
                    value={value.speed}
                    onChange={(newValue) => setValue({ ...value, speed: newValue })}
                    label={(value) => `${value}%`}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={1}><Badge color="blue">Speed</Badge> </Grid.Col>
                <Grid.Col span={11}>
                    <Slider
                        mt="md"
                        min={0}
                        max={100}
                        value={value.quality}
                        onChange={(newValue) => setValue({ ...value, quality: newValue })}
                        label={(value) => `${value}%`}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={1}><Badge color="blue">Speed</Badge> </Grid.Col>
                <Grid.Col span={11}>
                    <Slider
                        mt="md"
                        min={0}
                        max={100}
                        value={value.involvement}
                        onChange={(newValue) => setValue({ ...value, involvement: newValue })}
                        label={(value) => `${value}%`}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={1}><Badge color="blue">Speed</Badge> </Grid.Col>
                <Grid.Col span={11}>
                    <Slider
                        mt="md"
                        min={0}
                        max={100}
                        value={value.steps}
                        onChange={(newValue) => setValue({ ...value, steps: newValue })}
                        label={(value) => `${value}%`}
                    />
                </Grid.Col>
            </Grid>
        </Box>
    );
}

export default CustomProgressSlider;
