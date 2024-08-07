'use client';

import * as React from 'react';
import styles from '@/app/trials/custom-splitter/new-splitter/splitter.module.css';


export const Splitter: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const firstHalfRef = React.useRef<HTMLDivElement | null>(null);
    const secondHalfRef = React.useRef<HTMLDivElement | null>(null);
    const resizerRef = React.useRef<HTMLDivElement | null>(null);

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        const startPos = {
            x: e.clientX,
            y: e.clientY,
        };
        const currentLeftWidth = firstHalfRef.current!.getBoundingClientRect().width;

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            updateWidth(currentLeftWidth, dx);
            updateCursor();
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        const startPos = {
            x: touch.clientX,
            y: touch.clientY,
        };
        const currentLeftWidth = firstHalfRef.current!.getBoundingClientRect().width;

        const handleTouchMove = (e: TouchEvent) => {
            const touch = (e.touches[0] || e.changedTouches[0]);
            const dx = touch!.clientX - startPos.x;
            const dy = touch!.clientY - startPos.y;
            updateWidth(currentLeftWidth, dx);
            updateCursor();
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor();
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, []);

    const updateWidth = (currentLeftWidth: number, dx: number) => {
        const container = containerRef.current;
        const firstHalfEle = firstHalfRef.current;

        if (!container || !firstHalfEle) {
            return;
        }

        const containerWidth = container.getBoundingClientRect().width;
        const delta = currentLeftWidth + dx;
        const newFirstHalfWidth = (delta * 100) / containerWidth;
        firstHalfEle.style.width = `${newFirstHalfWidth}%`;
    };

    const updateCursor = () => {
        const container = containerRef.current;
        const firstHalfEle = firstHalfRef.current;
        const resizerEle = resizerRef.current;
        const secondHalfEle = secondHalfRef.current;

        if (!container || !firstHalfEle || !resizerEle || !secondHalfEle) {
            return;
        }

        resizerEle.style.cursor = 'ew-resize';
        document.body.style.cursor = 'ew-resize';
        firstHalfEle.style.userSelect = 'none';
        firstHalfEle.style.pointerEvents = 'none';
        secondHalfEle.style.userSelect = 'none';
        secondHalfEle.style.pointerEvents = 'none';
    };

    const resetCursor = () => {
        const container = containerRef.current;
        const firstHalfEle = firstHalfRef.current;
        const resizerEle = resizerRef.current;
        const secondHalfEle = secondHalfRef.current;

        if (!container || !firstHalfEle || !resizerEle || !secondHalfEle) {
            return;
        }

        resizerEle.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');
        firstHalfEle.style.removeProperty('user-select');
        firstHalfEle.style.removeProperty('pointer-events');
        secondHalfEle.style.removeProperty('user-select');
        secondHalfEle.style.removeProperty('pointer-events');
    };

    return (
        <>
            <div className={styles.splitter} ref={containerRef}>
                <div className={styles.splitter__first} ref={firstHalfRef}>
                    Left
                </div>
                <div
                    className={styles.splitter__resizer}
                    ref={resizerRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                />
                <div className={styles.splitter__second} ref={secondHalfRef}>
                    Right
                </div>
            </div>
            <div className="splitter splitter--vertical" ref={containerRef}>
                <div className="splitter__first" ref={firstHalfRef}>
                    Top
                </div>
                <div
                    className="splitter__resizer"
                    ref={resizerRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                />
                <div className="splitter__second" ref={secondHalfRef}>
                    Bottom
                </div>
            </div>

        </>
    );
};
