'use client';

import React, { useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import styles from './complex-layout.module.css';


interface Props {
    direction?: 'horizontal' | 'vertical';
    initialSizes?: [number, number];
    minSizes?: [number, number];
    maxSizes?: [number, number];
    children: [ReactNode, ReactNode];
}

const EnhancedResizableLayout: React.FC<Props> = (
    {
        direction = 'horizontal',
        initialSizes = [250, 250],
        minSizes = [50, 50],
        maxSizes = [Infinity, Infinity],
        children
    }) => {
    const [sizes, setSizes] = useState(initialSizes);
    const containerRef = useRef<HTMLDivElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.style.setProperty('--first-size', `${sizes[0]}px`);
            container.style.setProperty('--second-size', `${sizes[1]}px`);
        }
    }, [sizes]);

    const startResize = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const container = containerRef.current;
        const resizer = resizerRef.current;
        if (!container || !resizer) return;

        const startPos = direction === 'horizontal' ?
            (e as React.MouseEvent).clientX || (e as React.TouchEvent).touches[0].clientX :
            (e as React.MouseEvent).clientY || (e as React.TouchEvent).touches[0].clientY;
        const startSizes = [...sizes];

        const resize = (e: MouseEvent | TouchEvent) => {
            const currentPos = direction === 'horizontal' ?
                (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX :
                (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
            const deltaPos = currentPos - startPos;

            const containerSize = direction === 'horizontal' ? container.offsetWidth : container.offsetHeight;
            const newSizes: any = [
                Math.max(minSizes[0], Math.min(maxSizes[0], startSizes[0] + deltaPos)),
                Math.max(minSizes[1], Math.min(maxSizes[1], startSizes[1] - deltaPos))
            ];

            requestAnimationFrame(() => {
                setSizes(newSizes);
            });
        };

        const stopResize = () => {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('touchmove', resize);
            document.removeEventListener('mouseup', stopResize);
            document.removeEventListener('touchend', stopResize);
            document.body.style.cursor = '';
        };

        document.addEventListener('mousemove', resize);
        document.addEventListener('touchmove', resize);
        document.addEventListener('mouseup', stopResize);
        document.addEventListener('touchend', stopResize);
        document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    }, [sizes, direction, minSizes, maxSizes]);

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${direction === 'vertical' ? styles.vertical : ''}`}
        >
            <div className={styles.panel}>{children[0]}</div>
            <div
                ref={resizerRef}
                className={styles.resizer}
                onMouseDown={startResize}
                onTouchStart={startResize}
            />
            <div className={styles.panel}>{children[1]}</div>
        </div>
    );
};

export default EnhancedResizableLayout;
