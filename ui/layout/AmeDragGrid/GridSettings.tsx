// components/GridSettings.tsx
import React from 'react';
import { NumberInput, Stack, Button, Paper } from '@mantine/core';


interface GridSettingsProps {
    cols: number;
    rowHeight: number;
    columnWidth: number;
    horizontalSnapIncrement: number;
    verticalSnapIncrement: number;
    onColsChange: (val: number) => void;
    onRowHeightChange: (val: number) => void;
    onColumnWidthChange: (val: number) => void;
    onHorizontalSnapIncrementChange: (val: number) => void;
    onVerticalSnapIncrementChange: (val: number) => void;
    onReset: () => void;
}

const GridSettings: React.FC<GridSettingsProps> = (
    {
        cols,
        rowHeight,
        columnWidth,
        horizontalSnapIncrement,
        verticalSnapIncrement,
        onColsChange,
        onRowHeightChange,
        onColumnWidthChange,
        onHorizontalSnapIncrementChange,
        onVerticalSnapIncrementChange,
        onReset
    }) => {
    return (
        <Paper
            style={{
                position: 'fixed',
                bottom: '60px',
                right: '20px',
                padding: '20px',
                zIndex: 1000,
                maxWidth: '300px'
            }}
            shadow="md"
        >
            <Stack gap="sm">
                <NumberInput
                    label="Columns"
                    value={cols}
                    onChange={(val) => onColsChange(Number(val))}
                    min={1}
                    max={12}
                />
                <NumberInput
                    label="Row Height"
                    value={rowHeight}
                    onChange={(val) => onRowHeightChange(Number(val))}
                    min={50}
                    max={500}
                    step={10}
                />
                <NumberInput
                    label="Column Width"
                    value={columnWidth}
                    onChange={(val) => onColumnWidthChange(Number(val))}
                    min={50}
                    max={500}
                    step={10}
                />
                <NumberInput
                    label="Horizontal Snap Increment"
                    value={horizontalSnapIncrement}
                    onChange={(val) => onHorizontalSnapIncrementChange(Number(val))}
                    min={1}
                    max={1000}
                />
                <NumberInput
                    label="Vertical Snap Increment"
                    value={verticalSnapIncrement}
                    onChange={(val) => onVerticalSnapIncrementChange(Number(val))}
                    min={1}
                    max={1000}
                />
                <Button onClick={onReset}>Reset Layout</Button>
            </Stack>
        </Paper>
    );
};

export default GridSettings;
