// hooks43/useGridLayout.ts
import { useState, useCallback, useEffect } from 'react';
import { Layout } from 'react-grid-layout';


interface UseGridLayoutProps {
    items: Array<{ title: string; content: React.ReactNode }>;
    cols: { [key: string]: number };
    initialRowHeight: number;
    initialColumnWidth: number;
    initialHorizontalSnapIncrement: number;
    initialVerticalSnapIncrement: number;
}

const useGridLayout = (
    {
        items,
        cols,
        initialRowHeight,
        initialColumnWidth,
        initialHorizontalSnapIncrement,
        initialVerticalSnapIncrement
    }: UseGridLayoutProps) => {
    const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});
    const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
    const [currentCols, setCurrentCols] = useState(cols.lg);
    const [rowHeight, setRowHeight] = useState(initialRowHeight);
    const [columnWidth, setColumnWidth] = useState(initialColumnWidth);
    const [horizontalSnapIncrement, setHorizontalSnapIncrement] = useState(initialHorizontalSnapIncrement);
    const [verticalSnapIncrement, setVerticalSnapIncrement] = useState(initialVerticalSnapIncrement);

    const generateLayout = useCallback((): Layout[] => {
        return items.map((item, index) => ({
            i: item.title,
            x: (index % currentCols) * 2,
            y: Math.floor(index / currentCols) * 2,
            w: 2,
            h: 2
        }));
    }, [items, currentCols]);

    useEffect(() => {
        const initialLayouts: { [key: string]: Layout[] } = {};
        Object.keys(cols).forEach(breakpoint => {
            initialLayouts[breakpoint] = generateLayout();
        });
        setLayouts(initialLayouts);
    }, [cols, generateLayout]);

    const onLayoutChange = (currentLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
        setLayouts(allLayouts);
    };

    const onBreakpointChange = (newBreakpoint: string, newCols: number) => {
        setCurrentBreakpoint(newBreakpoint);
        setCurrentCols(newCols);
    };

    const updateLayout = () => {
        setLayouts(prevLayouts => ({
            ...prevLayouts,
            [currentBreakpoint]: generateLayout()
        }));
    };

    const onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        const snappedItem = {
            ...newItem,
            x: Math.round(newItem.x * horizontalSnapIncrement) / horizontalSnapIncrement,
            y: Math.round(newItem.y * verticalSnapIncrement) / verticalSnapIncrement
        };
        const newLayout = layout.map(item => item.i === snappedItem.i ? snappedItem : item);
        setLayouts({...layouts, [currentBreakpoint]: newLayout});
    };

    const onResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        const snappedItem = {
            ...newItem,
            w: Math.round(newItem.w * horizontalSnapIncrement) / horizontalSnapIncrement,
            h: Math.round(newItem.h * verticalSnapIncrement) / verticalSnapIncrement
        };
        const newLayout = layout.map(item => item.i === snappedItem.i ? snappedItem : item);
        setLayouts({...layouts, [currentBreakpoint]: newLayout});
    };

    return {
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
    };
};

export default useGridLayout;
