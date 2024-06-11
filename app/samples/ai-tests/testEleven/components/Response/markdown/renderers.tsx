// renderers.tsx
import React, { ReactNode } from 'react';
import AmeCodeHighlight from "@/ui/highlight/AmeCodeHighlight";
import { CustomTable, CustomTableHead, CustomTableBody, CustomTableRow, CustomTableCell, CustomTableHeaderCell } from './CustomTable';
import { Code } from '@mantine/core';

const isBlockLevelElement = (element: ReactNode) => {
    if (!React.isValidElement(element)) return false;
    const blockElements = ['table', 'thead', 'tbody', 'tr', 'th', 'td', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'div'];
    return blockElements.includes(element.type as string);
};

/*
const logRendererInfo = (type, props) => {
    console.log(`Renderer type: ${type}`);
    console.log('Props received:', props);

};
*/

const renderers = {
    code: ({ node, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className ?? "");

        return match ? (
            <AmeCodeHighlight
                code={String(children).trim()}
                language={match[1]}
                title={match[1].charAt(0).toUpperCase() + match[1].slice(1)}
                {...props}
            />
        ) : (
            <Code color="var(--mantine-color-blue-light)">{children}</Code>
        );
    },
    table: ({ children }) => <CustomTable>{children}</CustomTable>,
    thead: ({ children }) => <CustomTableHead>{children}</CustomTableHead>,
    tbody: ({ children }) => <CustomTableBody>{children}</CustomTableBody>,
    tr: ({ children }) => <CustomTableRow>{children}</CustomTableRow>,
    th: ({ children }) => <CustomTableHeaderCell>{children}</CustomTableHeaderCell>,
    td: ({ children }) => <CustomTableCell>{children}</CustomTableCell>,
    li: ({ children }) => <li>{children}</li>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    p: ({ children }) => {
        const childrenArray = React.Children.toArray(children);
        const hasBlockChild = childrenArray.some(isBlockLevelElement);

        if (hasBlockChild) {
            return <div>{children}</div>;
        }
        return <span>{children}</span>;
    },
};

export default renderers;
