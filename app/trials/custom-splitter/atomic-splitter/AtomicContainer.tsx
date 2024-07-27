'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    mouseDownState,
    activeHandleState,
    mousePositionState,
    containerRefState,
    constraintsState,
    themeState,
    containerStyleSelector,
    isResizingSelector,
} from './atoms';
import styles from './AtomicContainer.module.css';

const ResizableContainer: React.FC = () => {
    const [mouseDown, setMouseDown] = useRecoilState(mouseDownState);
    const [activeHandle, setActiveHandle] = useRecoilState(activeHandleState);
    const [containerRef, setContainerRef] = useRecoilState(containerRefState);
    const [mousePosition, setMousePosition] = useRecoilState(mousePositionState);
    const constraints = useRecoilValue(constraintsState);
    const [theme, setTheme] = useRecoilState(themeState);
    const containerStyle = useRecoilValue(containerStyleSelector);
    const isResizing = useRecoilValue(isResizingSelector);

    const containerElement = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>, handle: string | null) => {
        e.preventDefault();
        setMouseDown(true);
        setActiveHandle(handle);
        setMousePosition({ x: e.clientX, y: e.clientY });
    }, [setMouseDown, setActiveHandle, setMousePosition]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!mouseDown) return;

        const dx = e.clientX - mousePosition.x;
        const dy = e.clientY - mousePosition.y;

        setContainerRef((prev) => {
            let newRef = { ...prev };

            switch (activeHandle) {
                case 'top':
                    newRef.top += dy;
                    newRef.height += dy;
                    break;
                case 'right':
                    newRef.width += dx;
                    break;
                case 'bottom':
                    newRef.height += dy;
                    break;
                case 'left':
                    newRef.left += dx;
                    newRef.width -= dx;
                    break;
                case 'top-left':
                    newRef.top += dy;
                    newRef.left += dx;
                    newRef.width -= dx;
                    newRef.height -= dy;
                    break;
                case 'top-right':
                    newRef.top += dy;
                    newRef.width += dx;
                    newRef.height -= dy;
                    break;
                case 'bottom-left':
                    newRef.left += dx;
                    newRef.width -= dx;
                    newRef.height += dy;
                    break;
                case 'bottom-right':
                    newRef.width += dx;
                    newRef.height += dy;
                    break;
                case null: // Moving the container
                    newRef.top += dy;
                    newRef.left += dx;
                    break;
            }

            // Apply constraints
            newRef.width = Math.min(Math.max(newRef.width, constraints.minWidth), constraints.maxWidth);
            newRef.height = Math.min(Math.max(newRef.height, constraints.minHeight), constraints.maxHeight);
            newRef.top = Math.max(newRef.top, 0);
            newRef.left = Math.max(newRef.left, 0);

            return newRef;
        });

        setMousePosition({ x: e.clientX, y: e.clientY });
    }, [mouseDown, activeHandle, setContainerRef, setMousePosition, constraints, mousePosition]);

    const handleMouseUp = useCallback(() => {
        setMouseDown(false);
        setActiveHandle(null);
    }, [setMouseDown, setActiveHandle]);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            handleMouseMove(e);
        };

        const handleGlobalMouseUp = () => {
            handleMouseUp();
        };

        if (mouseDown) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [mouseDown, handleMouseMove, handleMouseUp]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div
            className={`${styles.containerRoot} ${styles[containerStyle['--theme-class']]}`}
            style={containerStyle as React.CSSProperties}
        >
            <button onClick={toggleTheme}>Toggle Theme</button>
            <p>Resizable Container Content</p>

            <div
                ref={containerElement}
                className={`${styles.resizableContainer} ${isResizing ? styles.resizing : ''}`}
                onMouseDown={(e) => handleMouseDown(e, null)}
                style={{
                    top: `${containerRef.top}px`,
                    left: `${containerRef.left}px`,
                    width: `${containerRef.width}px`,
                    height: `${containerRef.height}px`,
                }}
            >
                <div className={`${styles.handle} ${styles['handle-top']}`} onMouseDown={(e) => handleMouseDown(e, 'top')}/>
                <div className={`${styles.handle} ${styles['handle-right']}`} onMouseDown={(e) => handleMouseDown(e, 'right')}/>
                <div className={`${styles.handle} ${styles['handle-bottom']}`} onMouseDown={(e) => handleMouseDown(e, 'bottom')}/>
                <div className={`${styles.handle} ${styles['handle-left']}`} onMouseDown={(e) => handleMouseDown(e, 'left')}/>
                <div className={`${styles.handle} ${styles['handle-top-left']}`} onMouseDown={(e) => handleMouseDown(e, 'top-left')}/>
                <div className={`${styles.handle} ${styles['handle-top-right']}`} onMouseDown={(e) => handleMouseDown(e, 'top-right')}/>
                <div className={`${styles.handle} ${styles['handle-bottom-left']}`} onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}/>
                <div className={`${styles.handle} ${styles['handle-bottom-right']}`} onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}/>
            </div>
        </div>
    );
};

export default ResizableContainer;
