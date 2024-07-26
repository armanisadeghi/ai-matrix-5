// renderers.tsx
import { TableHandler } from '@/components/AiChat/Response/markdown/CustomTable';
import React, { ReactNode } from 'react';

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
    table: ({ children }: { children: ReactNode }) => <TableHandler>{children}</TableHandler>,
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
