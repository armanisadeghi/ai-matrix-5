// app/ui/layout/AmeGridLayout/AmeGridLayoutAdjustable.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import AmeDragCard from '@/ui/layout/AmeDragGirdPlus/AmaDragCard';
import { Button, NumberInput, Stack, Paper, ActionIcon, Tabs, Modal, TextInput, Slider, Switch, Tooltip } from '@mantine/core';
import { TbSettings, TbZoomIn, TbZoomOut } from 'react-icons/tb';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useHotkeys } from '@mantine/hooks';


const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridItem {
    title: string;
    content: React.ReactNode;
    locked?: boolean;
    minimized?: boolean;
}

interface AmeGridLayoutAdjustableProps {
    items: GridItem[];
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
        items: initialItems,
        cols = {xl: 14, lg: 12, md: 10, sm: 6, xs: 4, xxs: 1},
        breakpoints = {xl: 1450, lg: 1200, md: 996, sm: 778, xs: 480, xxs: 0},
        initialLayout,
        rowHeight: initialRowHeight = 300,
        containerPadding = [10, 10],
        margin = [10, 10],
        isResizable = true,
        isDraggable = true,
        compactType = 'vertical',
        widthUnits: initialWidthUnits = 100,
        heightUnits: initialHeightUnits = 1,
        containerWidth = '100%'
    }) => {
    const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});
    const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
    const [showSettings, setShowSettings] = useState(false);
    const [rowHeight, setRowHeight] = useState(initialRowHeight);
    const [widthUnits, setWidthUnits] = useState(initialWidthUnits);
    const [heightUnits, setHeightUnits] = useState(initialHeightUnits);
    const [columns, setColumns] = useState(cols.lg);
    const [items, setItems] = useState<GridItem[]>(initialItems);
    const [zoom, setZoom] = useState(1);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [snapToGrid, setSnapToGrid] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useHotkeys([
        ['mod+R', () => resetLayout()],
        ['mod+S', () => setShowSettings((s) => !s)],
    ]);

    const generateLayout = useCallback((): Layout[] => {
        return items.map((item, index) => ({
            i: item.title,
            x: (index % 2) * widthUnits,
            y: Math.floor(index / 2) * heightUnits,
            w: widthUnits,
            h: heightUnits,
            isDraggable: !item.locked,
            isResizable: !item.locked,
        }));
    }, [items, widthUnits, heightUnits]);

    useEffect(() => {
        const savedLayouts = localStorage.getItem('gridLayouts');
        if (savedLayouts) {
            setLayouts(JSON.parse(savedLayouts));
        } else {
            const initialLayouts: { [key: string]: Layout[] } = {};
            Object.keys(cols).forEach(breakpoint => {
                initialLayouts[breakpoint] = initialLayout || generateLayout();
            });
            setLayouts(initialLayouts);
        }
    }, [cols, initialLayout, generateLayout]);

    const onLayoutChange = (currentLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
        setLayouts(allLayouts);
        localStorage.setItem('gridLayouts', JSON.stringify(allLayouts));
    };

    const onBreakpointChange = (newBreakpoint: string, newCols: number) => {
        setCurrentBreakpoint(newBreakpoint);
        setColumns(newCols);
    };

    const calculateActualHeight = (gridHeight: number): number => {
        return rowHeight * gridHeight + (gridHeight - 1) * margin[1];
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
        setColumns(cols.lg);
        setZoom(1);
        localStorage.removeItem('gridLayouts');
    };

    const toggleLock = (title: string) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.title === title ? {...item, locked: !item.locked} : item
            )
        );
    };

    const toggleMinimize = (title: string) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.title === title ? {...item, minimized: !item.minimized} : item
            )
        );
    };

    const addNewItem = () => {
        if (newItemTitle) {
            const newItem: GridItem = {
                title: newItemTitle,
                content: <div>New item content</div>,
            };
            setItems(prevItems => [...prevItems, newItem]);
            setNewItemTitle('');
            setShowAddItemModal(false);
        }
    };

    const compactLayout = () => {
        const compactedLayout = layouts[currentBreakpoint].sort((a, b) => a.y - b.y || a.x - b.x);
        setLayouts({...layouts, [currentBreakpoint]: compactedLayout});
    };

    const autoArrange = () => {
        const autoArrangedLayout = generateLayout();
        setLayouts({...layouts, [currentBreakpoint]: autoArrangedLayout});
    };

    const CustomResizeHandle = ({handleAxis, ...restProps}: any) => {
        return (
            <div
                className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
                {...restProps}
                style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '50%',
                    width: '10px',
                    height: '10px',
                    bottom: '5px',
                    right: '5px',
                }}
            />
        );
    };

    return (
        <div ref={containerRef} style={{width: containerWidth, position: 'relative'}}>
            <ResponsiveGridLayout
                layouts={layouts}
                breakpoints={breakpoints}
                cols={cols}
                rowHeight={rowHeight / heightUnits}
                width={containerRef.current?.offsetWidth || 1200}
                containerPadding={containerPadding}
                margin={margin}
                isResizable={isResizable}
                isDraggable={isDraggable}
                compactType={compactType}
                onLayoutChange={onLayoutChange}
                onBreakpointChange={onBreakpointChange}
                draggableHandle=".draggable-handle"
                resizeHandle={<CustomResizeHandle/>}
                transformScale={zoom}
                useCSSTransforms={true}
                preventCollision={!snapToGrid}
            >
                {items.map((item) => (
                    <div key={item.title} style={{display: item.minimized ? 'none' : 'block'}}>
                        <AmeDragCard
                            rowHeight={calculateActualHeight(layouts[currentBreakpoint]?.find(l => l.i === item.title)?.h || heightUnits)}
                            title={item.title}
                            scrollbar={true}
                            scrollAreaHeight={calculateActualHeight(layouts[currentBreakpoint]?.find(l => l.i === item.title)?.h || heightUnits) - 70}
                            onLockToggle={() => toggleLock(item.title)}
                            onMinimizeToggle={() => toggleMinimize(item.title)}
                            isLocked={item.locked || false}
                            isMinimized={item.minimized || false}
                        >
                            {item.content}
                        </AmeDragCard>
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
                    <Tabs defaultValue="general">
                        <Tabs.List>
                            <Tabs.Tab value="general">General</Tabs.Tab>
                            <Tabs.Tab value="layout">Layout</Tabs.Tab>
                            <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="general">
                            <Stack gap="sm">
                                <NumberInput
                                    label="Columns"
                                    value={columns}
                                    onChange={(val) => setColumns(Number(val))}
                                    min={1}
                                    max={12}
                                />
                                <NumberInput
                                    label="Row Height"
                                    value={rowHeight}
                                    onChange={(val) => setRowHeight(Number(val))}
                                    min={50}
                                    max={500}
                                    step={10}
                                />
                                <Button onClick={() => setShowAddItemModal(true)}>Add New Item</Button>
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="layout">
                            <Stack gap="sm">
                                <NumberInput
                                    label="Width Units"
                                    value={widthUnits}
                                    onChange={(val) => setWidthUnits(Number(val))}
                                    min={1}
                                    max={1000}
                                />
                                <NumberInput
                                    label="Height Units"
                                    value={heightUnits}
                                    onChange={(val) => setHeightUnits(Number(val))}
                                    min={1}
                                    max={1000}
                                />
                                <Button onClick={compactLayout}>Compact Layout</Button>
                                <Button onClick={autoArrange}>Auto Arrange</Button>
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="advanced">
                            <Stack gap="sm">
                                <Slider
                                    label="Zoom"
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                    value={zoom}
                                    onChange={setZoom}
                                />
                                <Switch
                                    label="Snap to Grid"
                                    checked={snapToGrid}
                                    onChange={(event) => setSnapToGrid(event.currentTarget.checked)}
                                />
                                <Button onClick={resetLayout}>Reset Layout</Button>
                            </Stack>
                        </Tabs.Panel>
                    </Tabs>
                </Paper>
            )}
            <Modal opened={showAddItemModal} onClose={() => setShowAddItemModal(false)} title="Add New Item">
                <TextInput
                    label="Item Title"
                    value={newItemTitle}
                    onChange={(event) => setNewItemTitle(event.currentTarget.value)}
                    placeholder="Enter item title"
                />
                <Button onClick={addNewItem} style={{marginTop: '10px'}}>Add Item</Button>
            </Modal>
            <div style={{position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000}}>
                <Tooltip label="Zoom In">
                    <ActionIcon onClick={() => setZoom(z => Math.min(z + 0.1, 2))}>
                        <TbZoomIn size={24}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Zoom Out">
                    <ActionIcon onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}>
                        <TbZoomOut size={24}/>
                    </ActionIcon>
                </Tooltip>
            </div>
        </div>
    );
};

export default AmeGridLayoutAdjustable;
