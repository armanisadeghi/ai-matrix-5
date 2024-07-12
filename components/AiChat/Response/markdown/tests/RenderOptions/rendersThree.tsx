// Enhanced renderers.tsx
import AmeFastCodeHighlight from '@/ui/highlight/AmeFastCodeHighlight'; // Assuming this is the correct path
import React, { ReactNode, useEffect, useState } from 'react';
import {
    CustomTable,
    CustomTableHead,
    CustomTableBody,
    CustomTableRow,
    CustomTableCell,
    CustomTableHeaderCell
} from './CustomTable';
import { Code } from '@mantine/core';

const isBlockLevelElement = (element: ReactNode) => {
    if (!React.isValidElement(element)) return false;
    const blockElements = ['table', 'thead', 'tbody', 'tr', 'th', 'td', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'div'];
    return blockElements.includes(element.type as string);
};

const logRendererInfo = (type: string, props: any) => {
    console.log(`Renderer type: ${type}`);
    console.log('Props received:', props);
};

interface RendererProps {
    node?: any;
    className?: string;
    children: ReactNode;
    [key: string]: any;
}

const RenderCode = React.memo(({ node, className, children, ...props }: RendererProps) => {
    const match = /language-(\w+)/.exec(className ?? "");

    return match ? (
        <AmeFastCodeHighlight
            code={Array.isArray(children) ? children.join('').trim() : String(children).trim()}
            language={match[1]}
            title={match[1].charAt(0).toUpperCase() + match[1].slice(1)}
            {...props}
        />
    ) : (
        <Code color="var(--mantine-color-blue-light)">{children}</Code>
    );
});

const useCodeChunks = (initialChunks: string = '') => {
    const [chunks, setChunks] = useState(initialChunks);

    const addChunk = (chunk: string) => {
        setChunks((prevChunks) => prevChunks + chunk);
    };

    return [chunks, addChunk] as const;
};

const renderers = {
    code: React.memo(({ node, className, children, ...props }: RendererProps) => {
        const [chunks, addChunk] = useCodeChunks(
            Array.isArray(children) ? children.join('').trim() : String(children).trim()
        );

        useEffect(() => {
            addChunk(
                Array.isArray(children) ? children.join('').trim() : String(children).trim()
            );
        }, [children]);

        const match = /language-(\w+)/.exec(className ?? "");

        return match ? (
            <AmeFastCodeHighlight
                code={chunks}
                language={match[1]}
                title={match[1].charAt(0).toUpperCase() + match[1].slice(1)}
                {...props}
            />
        ) : (
            <Code color="var(--mantine-color-blue-light)">{children}</Code>
        );
    }),

    table: ({ children }: { children: ReactNode }) => <CustomTable>{children}</CustomTable>,
    thead: ({ children }: { children: ReactNode }) => <CustomTableHead>{children}</CustomTableHead>,
    tbody: ({ children }: { children: ReactNode }) => <CustomTableBody>{children}</CustomTableBody>,
    tr: ({ children }: { children: ReactNode }) => <CustomTableRow>{children}</CustomTableRow>,
    th: ({ children }: { children: ReactNode }) => <CustomTableHeaderCell>{children}</CustomTableHeaderCell>,
    td: ({ children }: { children: ReactNode }) => <CustomTableCell>{children}</CustomTableCell>,
    li: ({ children }: { children: ReactNode }) => <li>{children}</li>,
    h1: ({ children }: { children: ReactNode }) => <h1>{children}</h1>,
    h2: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    h3: ({ children }: { children: ReactNode }) => <h3>{children}</h3>,
    h4: ({ children }: { children: ReactNode }) => <h4>{children}</h4>,
    h5: ({ children }: { children: ReactNode }) => <h5>{children}</h5>,
    h6: ({ children }: { children: ReactNode }) => <h6>{children}</h6>,
    p: ({ children }: { children: ReactNode }) => {
        const childrenArray = React.Children.toArray(children);
        const hasBlockChild = childrenArray.some(isBlockLevelElement);

        if (hasBlockChild) {
            return <div>{children}</div>;
        }
        return <span>{children}</span>;
    },
};

export default renderers;
