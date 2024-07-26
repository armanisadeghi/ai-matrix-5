// renderers.tsx
import { CustomTable, CustomTableBody, CustomTableCell, CustomTableHead, CustomTableHeaderCell, CustomTableRow } from '@/components/AiChat/Response/markdown/CustomTable';
import React, { ReactNode } from 'react';
import AmeCodeHighlight from "@/ui/highlight/AmeCodeHighlight";

import { Code, Alert, Container, Button } from '@mantine/core';

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

const renderers = {
    code: ({ node, className, children, ...props }: RendererProps) => {
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
    table: ({ children }: { children: ReactNode }) => <CustomTable>{children}</CustomTable>,
    thead: ({ children }: { children: ReactNode }) => <CustomTableHead>{children}</CustomTableHead>,
    tbody: ({children}: { children: ReactNode }) => <CustomTableBody>{children}</CustomTableBody>,
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
    img: ({ node, ...props }: RendererProps) => <img {...props} style={{ maxWidth: '100%', borderRadius: '8px' }} />,
    blockquote: ({ children }: { children: ReactNode }) => (
        <blockquote style={{ borderLeft: '4px solid var(--mantine-color-gray-light)', paddingLeft: '16px', color: 'var(--mantine-color-gray-dark)' }}>
            {children}
        </blockquote>
    ),
    a: ({ href, children }: { href: string, children: ReactNode }) => (
        <a href={href} style={{ color: 'var(--mantine-color-blue-dark)', textDecoration: 'underline' }}>
            {children}
        </a>
    ),
    button: ({ children }: { children: ReactNode }) => <Button>{children}</Button>,
    alert: ({ children, type }: { children: ReactNode, type: 'info' | 'warning' | 'error' | 'success' }) => (
        <Alert color={type === 'error' ? 'red' : type === 'warning' ? 'yellow' : type === 'success' ? 'green' : 'blue'}>
            {children}
        </Alert>
    ),
    container: ({ children }: { children: ReactNode }) => (
        <Container>
            {children}
        </Container>
    ),
};

export default renderers;
