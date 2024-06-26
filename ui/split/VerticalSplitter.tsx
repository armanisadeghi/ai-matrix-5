// ui/split/VerticalSplitter.tsx
import React, { CSSProperties, ReactNode, useState, useRef } from 'react';
import Split from 'react-split';

interface VerticalSplitterProps {
    children: ReactNode[];
    initialSizes?: number[];
    expandToMin?: boolean;
}

const VerticalSplitter: React.FC<VerticalSplitterProps> = ({ children, initialSizes, expandToMin = true }) => {
    const sections = children.length;
    const defaultSizes = Array(sections).fill(100 / sections);
    const [sizes, setSizes] = useState<number[]>(initialSizes || defaultSizes);
    const gutters = useRef<HTMLDivElement[]>([]);

    const panelStyle: CSSProperties = {
        padding: '10px',
        height: '100%',
    };

    const gutterStyle: CSSProperties = {
        backgroundColor: '#403f3f',
    };

    return (
        <Split
            sizes={sizes}
            minSize={125}
            expandToMin={expandToMin}
            gutterSize={15}
            gutterAlign="center"
            snapOffset={10}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            onDragEnd={newSizes => setSizes(newSizes)}
            style={{ display: 'flex', height: 'calc(95vh)' }}
            gutter={(index, direction) => {
                const gutter = document.createElement('div');
                gutter.style.cssText = `height: 100%; background-color: transparent; width: 30px; cursor: col-resize; position: relative;`;

                const innerGutter = document.createElement('div');
                innerGutter.style.cssText = `height: 100%; background-color: ${gutterStyle.backgroundColor}; width: 1px; position: absolute; left: 2.5px;`;
                gutter.appendChild(innerGutter);
                gutters.current[index] = gutter;

                gutter.addEventListener('mouseenter', () => { gutter.style.cursor = 'col-resize'; }, { passive: true });
                gutter.addEventListener('mouseleave', () => { gutter.style.cursor = 'default'; }, { passive: true });

                return gutter;
            }}
        >
            {children.map((child, index) => (
                <div key={index} style={panelStyle}>
                    {child}
                </div>
            ))}
        </Split>
    );
};

export default VerticalSplitter;
