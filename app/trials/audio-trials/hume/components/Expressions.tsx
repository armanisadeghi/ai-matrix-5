import React from 'react';
import { Box, Grid, Text } from '@mantine/core';

interface ExpressionsProps {
    values: Record<string, number>;
}

const Expressions: React.FC<ExpressionsProps> = ({ values }) => {
    const entries = Object.entries(values);
    entries.sort((a, b) => b[1] - a[1]);
    const top3 = entries.slice(0, 3);

    return (
        <Box style={{ borderTop: '1px solid #ccc' }}>
            {top3.map(([key, value]) => (
                <Grid key={key} >
                    <Grid.Col span={6}>
                        <Text style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>{key}</Text>
                    </Grid.Col>
                    <Grid.Col span={6} style={{ textAlign: 'right' }}>
                        <Text style={{ opacity: 0.5 }}>{value.toFixed(2)}</Text>
                    </Grid.Col>
                    <Box style={{ position: 'relative', height: '4px', width: '100%', backgroundColor: '#eee', borderRadius: '2px', marginTop: '4px' }}>
                        <Box style={{ position: 'absolute', height: '100%', width: `${Math.max(0, Math.min(100, value * 100))}%`, backgroundColor: '#ccc', borderRadius: '2px' }} />
                    </Box>
                </Grid>
            ))}
        </Box>
    );
};

export default Expressions;
