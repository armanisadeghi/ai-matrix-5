import useDynamicDimensions from "@/hooks/layout/useDynamicDimensions";
import { CSSProperties, forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Split, { SplitProps } from "react-split";

interface HorizontalSplitterProps {
    children: ReactNode[];
    initialSizes?: number[];
}

export interface HorizontalSplitterRef {
    updateSizes: (sizes: number[]) => void;
}

const HorizontalSplitter = forwardRef<HorizontalSplitterRef, HorizontalSplitterProps>(
    ({ children, initialSizes }, ref) => {
        const sections = children.length;
        const defaultSizes = Array(sections).fill(100 / sections);
        const [sizes, setSizes] = useState<number[]>(initialSizes || defaultSizes);
        const gutters = useRef<HTMLDivElement[]>([]);
        const [elementRef, dimensions] = useDynamicDimensions();

        useImperativeHandle(ref, () => ({
            updateSizes: (newSizes: number[]) => setSizes(newSizes),
        }));

        const panelStyle = (index: number): CSSProperties => ({
            padding: "10px",
            width: "100%",
            overflow: "hidden",
            visibility: sizes[index] < 5 ? "hidden" : "visible",
        });

        const gutterStyle: CSSProperties = {
            backgroundColor: "#403f3f",
        };

        const filteredSizes = useMemo(() => sizes.filter((size) => size > 0), [sizes]);

        const splitProps: SplitProps = useMemo(
            () => ({
                sizes: sizes,
                minSize: 50,
                expandToMin: true,
                gutterSize: 15,
                gutterAlign: "center" as const,
                snapOffset: 10,
                dragInterval: 1,
                direction: "vertical" as const,
                cursor: "row-resize" as const,
                onDragEnd: (newSizes) => setSizes(newSizes),
                style: {
                    display: "flex",
                    // height: `${newHeight}vh`,
                    height: "100%",
                    flexDirection: "column",
                },
                gutter: (index, _direction) => {
                    const gutter = document.createElement("div");
                    gutter.style.cssText = `width: 100%; background-color: transparent; height: 30px; cursor: row-resize; position: relative;`;

                    const innerGutter = document.createElement("div");
                    innerGutter.style.cssText = `width: 100%; background-color: ${gutterStyle.backgroundColor}; height: 1px; position: absolute; top: 14.5px;`;
                    gutter.appendChild(innerGutter);
                    gutters.current[index] = gutter;

                    gutter.addEventListener("mouseenter", () => {
                        gutter.style.cursor = "row-resize";
                    });
                    gutter.addEventListener("mouseleave", () => {
                        gutter.style.cursor = "default";
                    });

                    return gutter;
                },
            }),
            [filteredSizes],
        );

        // useEffect(() => {
        //     const updatedSizes = sizes.map((size) => Math.max(size, 5));
        //     if (sizes.some((size, index) => size !== updatedSizes[index])) {
        //         setSizes(updatedSizes);
        //     }
        // }, [sizes]);

        const newHeight = dimensions.availableHeight * 0.99;

        return (
            <div style={{ maxHeight: "100%" }}>
                <Split {...splitProps}>
                    {children.map((child, index) => (
                        <div key={index} style={panelStyle(index)}>
                            {child}
                        </div>
                    ))}
                </Split>
            </div>
        );
    },
);

export default HorizontalSplitter;
