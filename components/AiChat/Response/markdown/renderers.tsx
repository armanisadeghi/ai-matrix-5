// renderers.tsx
import React, { ReactNode } from 'react';
import AmeCodeHighlight from "@/ui/highlight/AmeCodeHighlight";
import { CustomTable, CustomTableHead, CustomTableBody, CustomTableRow, CustomTableCell, CustomTableHeaderCell } from './CustomTable';

const isBlockLevelElement = (element: ReactNode) => {
    if (!React.isValidElement(element)) return false;
    const blockElements = ['table', 'thead', 'tbody', 'tr', 'th', 'td', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'div'];
    return blockElements.includes(element.type as string);
};

const renderers = {
    code: ({ className, children }) => {
        const language = className ? className.replace('language-', '') : '';
        return (
            <AmeCodeHighlight
                code={String(children).trim()}
                language={language}
                title={language.charAt(0).toUpperCase() + language.slice(1)}
            />
        );
    },
    inlineCode: ({ children }) => <code>{children}</code>,
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
        return <p>{children}</p>;
    },
};

export default renderers;
