// app/ui/layout/AmeGridLayout/AmeGridLayoutAdjustable.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import AmeTestCard from '@/app/trials/core-chat-trial/ui/AmeTestingCard';
import { Button, NumberInput, Stack, Paper, ActionIcon } from '@mantine/core';
import { TbSettings } from 'react-icons/tb';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const ResponsiveGridLayout = WidthProvider(Responsive);

interface AmeGridLayoutAdjustableProps {
    items: Array<{ title: string; content: React.ReactNode }>;
    cols?: { [key: string]: number };
    breakpoints?: { [key: string]: number };
    initialLayout?: Layout[];
    rowHeight?: number;
    containerPadding?: [number, number];
    margin?: [number, number];
    isResizable?: boolean;
    isDraggable?: boolean;
    compactType?: 'vertical' | 'horizontal' | null;
    widthUnits?: number;
    heightUnits?: number;
    containerWidth?: string | number;
}

const AmeGridLayoutAdjustable: React.FC<AmeGridLayoutAdjustableProps> = (
    {
        items,
        cols= { lg: 4, md: 3, sm: 2, xs: 1 },
        breakpoints = { lg: 1400, md: 1150, sm: 900, xs: 600 },
        initialLayout,
        rowHeight: initialRowHeight = 300,
        containerPadding = [10, 10],
        margin = [10, 10],
        isResizable = true,
        isDraggable = true,
        compactType = 'vertical',
        widthUnits: initialWidthUnits = 100,
        heightUnits: initialHeightUnits = 100,
        containerWidth = '100%'
    }) => {
    const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});
    const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
    const [showSettings, setShowSettings] = useState(false);
    const [rowHeight, setRowHeight] = useState(initialRowHeight);
    const [widthUnits, setWidthUnits] = useState(initialWidthUnits);
    const [heightUnits, setHeightUnits] = useState(initialHeightUnits);
    const [currentCols, setCurrentCols] = useState(cols.lg);

    const containerRef = useRef<HTMLDivElement>(null);

    const generateLayout = useCallback((): Layout[] => {
        return items.map((item, index) => ({
            i: item.title,
            x: (index % currentCols) * widthUnits,
            y: Math.floor(index / currentCols) * heightUnits,
            w: widthUnits,
            h: heightUnits
        }));
    }, [items, currentCols, widthUnits, heightUnits]);

    useEffect(() => {
        const initialLayouts: { [key: string]: Layout[] } = {};
        Object.keys(cols).forEach(breakpoint => {
            initialLayouts[breakpoint] = initialLayout || generateLayout();
        });
        setLayouts(initialLayouts);
    }, [cols, initialLayout, generateLayout]);

    const onLayoutChange = (currentLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
        setLayouts(allLayouts);
    };

    const onBreakpointChange = (newBreakpoint: string, newCols: number) => {
        setCurrentBreakpoint(newBreakpoint);
        setCurrentCols(newCols);
    };

    const calculateActualHeight = (gridHeight: number): number => {
        return rowHeight * (gridHeight / heightUnits);
    };

    const resetLayout = () => {
        const resetLayouts = Object.keys(cols).reduce((acc, breakpoint) => {
            acc[breakpoint] = generateLayout();
            return acc;
        }, {} as { [key: string]: Layout[] });
        setLayouts(resetLayouts);
        setRowHeight(initialRowHeight);
        setWidthUnits(initialWidthUnits);
        setHeightUnits(initialHeightUnits);
        setCurrentCols(cols.lg);
    };

    return (
        <div ref={containerRef} style={{width: containerWidth, position: 'relative'}}>
            <ResponsiveGridLayout
                layouts={layouts}
                breakpoints={breakpoints}
                cols={cols}
                rowHeight={rowHeight}
                width={containerRef.current?.offsetWidth || 1200}
                containerPadding={containerPadding}
                margin={margin}
                isResizable={isResizable}
                isDraggable={isDraggable}
                compactType={compactType}
                onLayoutChange={onLayoutChange}
                onBreakpointChange={onBreakpointChange}
                draggableHandle=".draggable-handle"
            >
                {items.map((item) => (
                    <div key={item.title}>
                        <AmeTestCard
                            rowHeight={calculateActualHeight(layouts[currentBreakpoint]?.find(l => l.i === item.title)?.h || heightUnits)}
                            title={item.title}
                            scrollbar={true}
                            scrollAreaHeight={calculateActualHeight(layouts[currentBreakpoint]?.find(l => l.i === item.title)?.h || heightUnits) - 70}
                        >
                            {item.content}
                        </AmeTestCard>
                    </div>
                ))}
            </ResponsiveGridLayout>
            <ActionIcon
                style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000}}
                onClick={() => setShowSettings(!showSettings)}
            >
                <TbSettings size={24}/>
            </ActionIcon>
            {showSettings && (
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
                            value={currentCols}
                            onChange={(val) => {
                                const newCols = Number(val);
                                setCurrentCols(newCols);
                                setLayouts(prevLayouts => ({
                                    ...prevLayouts,
                                    [currentBreakpoint]: generateLayout()
                                }));
                            }}
                            min={1}
                            max={12}
                        />
                        <NumberInput
                            label="Row Height"
                            value={rowHeight}
                            onChange={(val) => {
                                setRowHeight(Number(val));
                            }}
                            min={50}
                            max={500}
                            step={10}
                        />
                        <NumberInput
                            label="Width Units"
                            value={widthUnits}
                            onChange={(val) => {
                                const newWidthUnits = Number(val);
                                setWidthUnits(newWidthUnits);
                                setLayouts(prevLayouts => ({
                                    ...prevLayouts,
                                    [currentBreakpoint]: generateLayout()
                                }));
                            }}
                            min={1}
                            max={1000}
                        />
                        <NumberInput
                            label="Height Units"
                            value={heightUnits}
                            onChange={(val) => {
                                const newHeightUnits = Number(val);
                                setHeightUnits(newHeightUnits);
                                setLayouts(prevLayouts => ({
                                    ...prevLayouts,
                                    [currentBreakpoint]: generateLayout()
                                }));
                            }}
                            min={1}
                            max={1000}
                        />
                        <Button onClick={resetLayout}>Reset Layout</Button>
                    </Stack>
                </Paper>
            )}
        </div>
    );
};

export default AmeGridLayoutAdjustable;
