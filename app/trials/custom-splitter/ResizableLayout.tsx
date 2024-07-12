'use client';

import React, { useState, useCallback, useMemo } from 'react';
import styles from './resizable-layout.module.css';

const ResizableLayout: React.FC = () => {
    const [leftWidth, setLeftWidth] = useState(250);
    const [rightWidth, setRightWidth] = useState(250);
    const [leftTopHeight, setLeftTopHeight] = useState(200);
    const [rightTopHeight, setRightTopHeight] = useState(200);
    const [rightMiddleHeight, setRightMiddleHeight] = useState(200);

    const MIN_HEIGHT = 50;

    const startHorizontalResize = useCallback((e: React.MouseEvent<HTMLDivElement>, isLeft: boolean) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = isLeft ? leftWidth : rightWidth;

        const doDrag = (e: MouseEvent) => {
            const newWidth = startWidth + (isLeft ? e.clientX - startX : startX - e.clientX);
            if (isLeft) {
                setLeftWidth(Math.max(50, Math.min(newWidth, window.innerWidth - rightWidth - 100)));
            } else {
                setRightWidth(Math.max(50, Math.min(newWidth, window.innerWidth - leftWidth - 100)));
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
    }, [leftWidth, rightWidth]);

    const startVerticalResize = useCallback((e: React.MouseEvent<HTMLDivElement>, section: 'leftTop' | 'rightTop' | 'rightMiddle') => {
        e.preventDefault();
        const startY = e.clientY;
        let startHeight = 0;
        let nextSectionHeight = 0;

        if (section === 'leftTop') {
            startHeight = leftTopHeight;
        } else if (section === 'rightTop') {
            startHeight = rightTopHeight;
            nextSectionHeight = rightMiddleHeight;
        } else if (section === 'rightMiddle') {
            startHeight = rightMiddleHeight;
            nextSectionHeight = rightTopHeight;
        }

        const doDrag = (e: MouseEvent) => {
            const diffY = e.clientY - startY;

            if (section === 'leftTop') {
                setLeftTopHeight(Math.max(MIN_HEIGHT, startHeight + diffY));
            } else if (section === 'rightTop') {
                const newTopHeight = Math.max(MIN_HEIGHT, startHeight + diffY);
                const remainingHeight = rightTopHeight + rightMiddleHeight - newTopHeight;

                if (remainingHeight < MIN_HEIGHT) {
                    setRightTopHeight(rightTopHeight + rightMiddleHeight - MIN_HEIGHT);
                    setRightMiddleHeight(MIN_HEIGHT);
                } else {
                    setRightTopHeight(newTopHeight);
                    setRightMiddleHeight(remainingHeight);
                }
            } else if (section === 'rightMiddle') {
                const newMiddleHeight = Math.max(MIN_HEIGHT, startHeight + diffY);
                const remainingHeight = rightTopHeight + rightMiddleHeight - newMiddleHeight;

                if (remainingHeight < MIN_HEIGHT) {
                    setRightMiddleHeight(rightTopHeight + rightMiddleHeight - MIN_HEIGHT);
                    setRightTopHeight(MIN_HEIGHT);
                } else {
                    setRightMiddleHeight(newMiddleHeight);
                    setRightTopHeight(remainingHeight);
                }
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
    }, [leftTopHeight, rightTopHeight, rightMiddleHeight]);

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
        <div className={memoizedStyles.layout}>
            <header className={memoizedStyles.header}>Header</header>
            <div className={memoizedStyles.content}>
                <aside className={memoizedStyles.sidebar} style={{ width: `${leftWidth}px` }}>
                    <div className={memoizedStyles.sidebarSection} style={{ height: `${leftTopHeight}px` }}>
                        Left Top
                    </div>
                    <div className={memoizedStyles.resizerVertical} onMouseDown={(e) => startVerticalResize(e, 'leftTop')}></div>
                    <div className={memoizedStyles.sidebarSection} style={{ flex: 1 }}>
                        Left Bottom
                    </div>
                    <div className={memoizedStyles.resizerLeft} onMouseDown={(e) => startHorizontalResize(e, true)}></div>
                </aside>
                <main className={memoizedStyles.main}>Main Content</main>
                <aside className={memoizedStyles.sidebar} style={{ width: `${rightWidth}px` }}>
                    <div className={memoizedStyles.sidebarSection} style={{ height: `${rightTopHeight}px` }}>
                        Right Top
                    </div>
                    <div className={memoizedStyles.resizerVertical} onMouseDown={(e) => startVerticalResize(e, 'rightTop')}></div>
                    <div className={memoizedStyles.sidebarSection} style={{ height: `${rightMiddleHeight}px` }}>
                        Right Middle
                    </div>
                    <div className={memoizedStyles.resizerVertical} onMouseDown={(e) => startVerticalResize(e, 'rightMiddle')}></div>
                    <div className={memoizedStyles.sidebarSection} style={{ flex: 1 }}>
                        Right Bottom
                    </div>
                    <div className={memoizedStyles.resizerRight} onMouseDown={(e) => startHorizontalResize(e, false)}></div>
                </aside>
            </div>
        </div>
    );
};

export default ResizableLayout;
