"use client";

import useDynamicDimensions from "@/hooks/layout/useDynamicDimensions";
import React, { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import Split from "react-split";

interface VerticalSplitterProps {
    children: React.ReactNode[];
    initialSizes?: number[];
    expandToMin?: boolean;
}

const VerticalSplitter: React.FC<VerticalSplitterProps> = React.memo(
    ({ children, initialSizes, expandToMin = true }) => {
        const sections = children.length;
        const defaultSizes = useMemo(() => Array(sections).fill(100 / sections), [sections]);
        const [sizes, setSizes] = useState<number[]>(initialSizes || defaultSizes);
        const gutters = useRef<HTMLDivElement[]>([]);
        const [ref, dimensions] = useDynamicDimensions();

        const panelStyle: CSSProperties = useMemo(
            () => ({
                height: "100%",
            }),
            [],
        );

        const gutterStyle: CSSProperties = useMemo(
            () => ({
                backgroundColor: "#403f3f",
            }),
            [],
        );

        const filteredChildren = useMemo(() => children.filter((_, index) => sizes[index] > 0), [children, sizes]);
        const filteredSizes = useMemo(() => sizes.filter((size) => size > 0), [sizes]);

        const newHeight = dimensions.availableHeight * 0.99;

        const createGutter = useCallback(
            (index: number, direction: string) => {
                const gutter = document.createElement("div");
                gutter.style.cssText = `height: 100%; background-color: transparent; width: 30px; cursor: col-resize; position: relative;`;

                const innerGutter = document.createElement("div");
                innerGutter.style.cssText = `height: 100%; background-color: ${gutterStyle.backgroundColor}; width: 1px; position: absolute; left: 2.5px;`;
                gutter.appendChild(innerGutter);
                gutters.current[index] = gutter;

                gutter.addEventListener(
                    "mouseenter",
                    () => {
                        gutter.style.cursor = "col-resize";
                    },
                    { passive: true },
                );
                gutter.addEventListener(
                    "mouseleave",
                    () => {
                        gutter.style.cursor = "default";
                    },
                    { passive: true },
                );

                return gutter;
            },
            [gutterStyle.backgroundColor],
        );

        const handleDragEnd = useCallback((newSizes: number[]) => {
            setSizes(newSizes);
        }, []);

        const splitProps = useMemo(
            () => ({
                sizes: filteredSizes,
                minSize: 125,
                expandToMin: expandToMin,
                gutterSize: 15,
                gutterAlign: "center" as const,
                snapOffset: 10,
                dragInterval: 1,
                direction: "horizontal" as const,
                cursor: "col-resize" as const,
                onDragEnd: handleDragEnd,
                style: { display: "flex", height: "100%" } as const,
                gutter: createGutter,
            }),
            [filteredSizes, expandToMin, handleDragEnd, createGutter],
        );

        return (
            <div ref={ref} style={{ height: `${newHeight}px` }}>
                <Split {...splitProps}>
                    {filteredChildren.map((child, index) => (
                        <div key={`section-${index}`} style={panelStyle}>
                            {child}
                        </div>
                    ))}
                </Split>
            </div>
        );
    },
);

export default VerticalSplitter;
