'use client';

import React, { useState, useCallback, useRef, useMemo } from 'react';
import styles from '@/app/trials/custom-splitter/Improved-resizable/improved-resizable-layout.module.css';


interface LayoutSettings {
    resizerSize: number;
    resizerLineSize: number;
    minSectionSize: number;
}

const ImprovedResizableLayout: React.FC<LayoutSettings> = (
    {
        resizerSize = 10,
        resizerLineSize = 1,
        minSectionSize = 50
    }) => {
    const [leftWidth, setLeftWidth] = useState(250);
    const [rightWidth, setRightWidth] = useState(250);
    const [leftTopHeight, setLeftTopHeight] = useState(200);
    const [rightTopHeight, setRightTopHeight] = useState(200);
    const [rightMiddleHeight, setRightMiddleHeight] = useState(200);

    const containerRef = useRef<HTMLDivElement>(null);

    const startHorizontalResize = useCallback((e: React.MouseEvent<HTMLDivElement>, isLeft: boolean) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = isLeft ? leftWidth : rightWidth;
        const containerWidth = containerRef.current?.clientWidth || 0;

        const doDrag = (e: MouseEvent) => {
            const currentX = e.clientX;
            const newWidth = startWidth + (isLeft ? currentX - startX : startX - currentX);
            const maxWidth = containerWidth - (isLeft ? rightWidth : leftWidth) - minSectionSize;

            if (isLeft) {
                setLeftWidth(Math.max(minSectionSize, Math.min(newWidth, maxWidth)));
            } else {
                setRightWidth(Math.max(minSectionSize, Math.min(newWidth, maxWidth)));
            }
        };

        const stopDrag = () => {
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
            document.body.style.cursor = 'default';
        };

        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
        document.body.style.cursor = 'col-resize';
    }, [leftWidth, rightWidth, minSectionSize]);

    const startVerticalResize = useCallback((e: React.MouseEvent<HTMLDivElement>, section: 'leftTop' | 'rightTop' | 'rightMiddle') => {
        e.preventDefault();
        const startY = e.clientY;
        const startHeight = section === 'leftTop' ? leftTopHeight : (section === 'rightTop' ? rightTopHeight : rightMiddleHeight);
        const containerHeight = containerRef.current?.clientHeight || 0;

        const doDrag = (e: MouseEvent) => {
            const currentY = e.clientY;
            const newHeight = startHeight + currentY - startY;
            const maxHeight = containerHeight - 2 * minSectionSize; // Ensure space for other sections

            switch (section) {
                case 'leftTop':
                    setLeftTopHeight(Math.max(minSectionSize, Math.min(newHeight, maxHeight)));
                    break;
                case 'rightTop':
                    setRightTopHeight(Math.max(minSectionSize, Math.min(newHeight, maxHeight - rightMiddleHeight)));
                    break;
                case 'rightMiddle':
                    setRightMiddleHeight(Math.max(minSectionSize, Math.min(newHeight, maxHeight - rightTopHeight)));
                    break;
            }
        };

        const stopDrag = () => {
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
            document.body.style.cursor = 'default';
        };

        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
        document.body.style.cursor = 'row-resize';
    }, [leftTopHeight, rightTopHeight, rightMiddleHeight, minSectionSize]);

    const memoizedStyles = useMemo(() => ({
        layout: styles.layout,
        header: styles.header,
        content: styles.content,
        sidebar: styles.sidebar,
        main: styles.main,
        resizer: styles.resizer,
        resizerHorizontal: `${styles.resizer} ${styles.horizontal}`,
        resizerVertical: `${styles.resizer} ${styles.vertical}`,
        resizerLeft: `${styles.resizer} ${styles.horizontal} ${styles.left}`,
        resizerRight: `${styles.resizer} ${styles.horizontal} ${styles.right}`,
        sidebarSection: styles['sidebar-section'],
    }), []);

    return (
        <div className={memoizedStyles.layout} style={{
            '--resizer-size': `${resizerSize}px`,
            '--resizer-line-size': `${resizerLineSize}px`,
            '--min-section-size': `${minSectionSize}px`
        } as React.CSSProperties}>
            <header className={memoizedStyles.header}>Header</header>
            <div className={memoizedStyles.content}>
                <aside className={memoizedStyles.sidebar} style={{width: `${leftWidth}px`}}>
                    <div className={memoizedStyles.sidebarSection} style={{height: `${leftTopHeight}px`}}>
                        Left Top
                    </div>
                    <div className={memoizedStyles.resizerVertical} onMouseDown={(e) => startVerticalResize(e, 'leftTop')}></div>
                    <div className={memoizedStyles.sidebarSection} style={{flex: 1}}>
                        Left Bottom
                    </div>
                    <div className={memoizedStyles.resizerLeft} onMouseDown={(e) => startHorizontalResize(e, true)}></div>
                </aside>
                <main className={memoizedStyles.main}>Main Content</main>
                <aside className={memoizedStyles.sidebar} style={{width: `${rightWidth}px`}}>
                    <div className={memoizedStyles.sidebarSection} style={{height: `${rightTopHeight}px`}}>
                        Right Top
                    </div>
                    <div className={memoizedStyles.resizerVertical} onMouseDown={(e) => startVerticalResize(e, 'rightTop')}></div>
                    <div className={memoizedStyles.sidebarSection} style={{height: `${rightMiddleHeight}px`}}>
                        Right Middle
                    </div>
                    <div className={memoizedStyles.resizerVertical} onMouseDown={(e) => startVerticalResize(e, 'rightMiddle')}></div>
                    <div className={memoizedStyles.sidebarSection} style={{flex: 1}}>
                        Right Bottom
                    </div>
                    <div className={memoizedStyles.resizerRight} onMouseDown={(e) => startHorizontalResize(e, false)}></div>
                </aside>
            </div>
        </div>
    );
};

export default ImprovedResizableLayout;
