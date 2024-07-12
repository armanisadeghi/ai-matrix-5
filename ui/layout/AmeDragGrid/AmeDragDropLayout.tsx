// app/ui/layout/AmeGridLayout/AmeDragDropLayout.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import AmeTestCard from '@/app/trials/core-chat-trial/ui/AmeTestingCard';
import { ActionIcon } from '@mantine/core';
import { TbSettings } from 'react-icons/tb';
import GridSettings from './GridSettings';
import useGridLayout from './useGridLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const ResponsiveGridLayout = WidthProvider(Responsive);

interface AmeDragDropLayoutProps {
    items: Array<{ title: string; content: React.ReactNode }>;
    cols?: { [key: string]: number };
    breakpoints?: { [key: string]: number };
    initialRowHeight?: number;
    initialColumnWidth?: number;
    containerPadding?: [number, number];
    margin?: [number, number];
    isResizable?: boolean;
    isDraggable?: boolean;
    compactType?: 'vertical' | 'horizontal' | null;
    initialHorizontalSnapIncrement?: number;
    initialVerticalSnapIncrement?: number;
    containerWidth?: string | number;
}

const AmeDragDropLayout: React.FC<AmeDragDropLayoutProps> = (
    {
        items,
        cols = {lg: 4, md: 3, sm: 2, xs: 1},
        breakpoints = {lg: 1400, md: 1150, sm: 900, xs: 600},
        initialRowHeight = 300,
        initialColumnWidth = 250,
        containerPadding = [10, 10],
        margin = [10, 10],
        isResizable = true,
        isDraggable = true,
        compactType = 'vertical',
        initialHorizontalSnapIncrement = 100,
        initialVerticalSnapIncrement = 100,
        containerWidth = '100%'
    }) => {
    const [showSettings, setShowSettings] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        layouts,
        currentBreakpoint,
        currentCols,
        rowHeight,
        columnWidth,
        horizontalSnapIncrement,
        verticalSnapIncrement,
        setRowHeight,
        setColumnWidth,
        setHorizontalSnapIncrement,
        setVerticalSnapIncrement,
        onLayoutChange,
        onBreakpointChange,
        updateLayout,
        onDragStop,
        onResizeStop
    } = useGridLayout({
        items,
        cols,
        initialRowHeight,
        initialColumnWidth,
        initialHorizontalSnapIncrement,
        initialVerticalSnapIncrement
    });

    const resetLayout = () => {
        setRowHeight(initialRowHeight);
        setColumnWidth(initialColumnWidth);
        setHorizontalSnapIncrement(initialHorizontalSnapIncrement);
        setVerticalSnapIncrement(initialVerticalSnapIncrement);
        updateLayout();
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
                onDragStop={onDragStop}
                onResizeStop={onResizeStop}
                draggableHandle=".draggable-handle"
            >
                {items.map((item) => (
                    <div key={item.title}>
                        <AmeTestCard
                            rowHeight={rowHeight}
                            title={item.title}
                            scrollbar={true}
                            scrollAreaHeight={rowHeight - 70}
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
                <GridSettings
                    cols={currentCols}
                    rowHeight={rowHeight}
                    columnWidth={columnWidth}
                    horizontalSnapIncrement={horizontalSnapIncrement}
                    verticalSnapIncrement={verticalSnapIncrement}
                    onColsChange={(val) => {
                        cols[currentBreakpoint] = val;
                        updateLayout();
                    }}
                    onRowHeightChange={setRowHeight}
                    onColumnWidthChange={setColumnWidth}
                    onHorizontalSnapIncrementChange={setHorizontalSnapIncrement}
                    onVerticalSnapIncrementChange={setVerticalSnapIncrement}
                    onReset={resetLayout}
                />
            )}
        </div>
    );
};

export default AmeDragDropLayout;
