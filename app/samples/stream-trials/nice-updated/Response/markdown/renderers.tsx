// renderers.tsx
import React from 'react';
import AmeCodeHighlight from "@/ui/highlight/AmeCodeHighlight";
import { CustomTable, CustomTableHead, CustomTableBody, CustomTableRow, CustomTableCell, CustomTableHeaderCell } from './CustomTable';

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
    li: ({ children }) => (
        <li>
            {React.Children.map(children, (child) =>
                typeof child === 'string' ? (
                    child
                ) : (
                    <div>{child}</div>
                )
            )}
        </li>
    ),
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
};

export default renderers;
