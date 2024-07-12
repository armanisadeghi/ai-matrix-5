// app/trials/grids/components/AmeGridLayout.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import AmeTestCard from '@/app/trials/core-chat-trial/ui/AmeTestingCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


interface AmeGridLayoutProps {
    items: Array<{ title: string; content: React.ReactNode }>;
    columns?: number;
    rowHeight?: number;
    containerWidth?: number | string;
    isResizable?: boolean;
    isDraggable?: boolean;
    widthUnits?: number;
    heightUnits?: number;
}

const AmeGridLayout: React.FC<AmeGridLayoutProps> = (
    {
        items,
        columns = 2,
        rowHeight = 300,
        containerWidth = '100%',
        isResizable = true,
        isDraggable = true,
        widthUnits = 1,
        heightUnits = 1,
    }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [layout, setLayout] = useState<Array<{ i: string; x: number; y: number; w: number; h: number }>>([]);
    const [width, setWidth] = useState(0);

    // Generate unique keys from titles
    const itemsWithKeys = useMemo(() => {
        const keyMap = new Map<string, number>();
        return items.map(item => {
            let key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const count = keyMap.get(key) || 0;
            if (count > 0) {
                key = `${key}-${count}`;
            }
            keyMap.set(key, count + 1);
            return {...item, key};
        });
    }, [items]);

    useEffect(() => {
        const newLayout = itemsWithKeys.map((item, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;
            return {
                i: item.key,
                x: col * widthUnits,
                y: row * heightUnits,
                w: widthUnits,
                h: heightUnits,
            };
        });
        setLayout(newLayout);
    }, [itemsWithKeys, columns, widthUnits, heightUnits]);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth(); // Initial width set

        const resizeObserver = new ResizeObserver(updateWidth);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} style={{width: containerWidth}}>
            {width > 0 && (
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={columns * widthUnits}
                    rowHeight={rowHeight / heightUnits}
                    width={width}
                    isResizable={isResizable}
                    isDraggable={isDraggable}
                    onLayoutChange={setLayout}
                    autoSize={true}
                    margin={[10, 10]}
                    draggableHandle=".draggable-handle"
                >
                    {itemsWithKeys.map((item) => (
                        <div key={item.key}>
                            <AmeTestCard
                                rowHeight={rowHeight}
                                title={item.title}
                                scrollbar={true}
                            >
                                {item.content}
                            </AmeTestCard>
                        </div>
                    ))}
                </GridLayout>
            )}
        </div>
    );
};

export default AmeGridLayout;
