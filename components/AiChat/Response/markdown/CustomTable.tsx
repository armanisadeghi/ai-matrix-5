import { copyTableToClipboard, exportToCSV, tableToData } from '@/components/AiChat/Response/markdown/utils';
import React, { useRef, useMemo, useCallback } from 'react';
import { Button, Group, Table } from '@mantine/core';
import styles from '@/components/AiChat/Response/ResponseArea.module.css';

interface TableHandlerProps {
    children: React.ReactNode;
}

// Memoization function to determine if props are equal, thus avoiding unnecessary re-renders
const areEqual = (prevProps: any, nextProps: any) => {
    // Simple shallow compare, can be deepened as needed based on actual data structures
    return prevProps.child === nextProps.child && prevProps.wrapChildrenWithClasses === nextProps.wrapChildrenWithClasses;
};

// Memoized TableRow component to wrap each child with classes only when necessary
const TableRow = React.memo(({ child, wrapChildrenWithClasses }: { child: React.ReactElement, wrapChildrenWithClasses: (child: React.ReactNode) => React.ReactNode }) => {
    // Wrapped the child with classes and return
    return wrapChildrenWithClasses(child);
}, areEqual);

export const TableHandler: React.FC<TableHandlerProps> = ({ children }) => {
    const tableRef = useRef<HTMLTableElement>(null);

    const handleCopyToClipboard = useCallback(() => {
        if (tableRef.current) {
            copyTableToClipboard(tableRef.current);
        }
    }, []);

    const handleExportToCSV = useCallback(() => {
        if (tableRef.current) {
            exportToCSV(tableToData(tableRef.current));
        }
    }, []);

    // Function to wrap children with classes
    const wrapChildrenWithClasses = useMemo(() => (child: React.ReactNode): React.ReactNode => {
        if (!React.isValidElement(child)) {
            return child;
        }

        let newProps: { [key: string]: any } = { ...child.props };
        let newChildren = child.props.children;

        // Apply classes based on the type of the element
        if (child.type === 'thead') {
            newProps.className = `${newProps.className || ''} m_b242d975 mantine-Table-thead`.trim();
        } else if (child.type === 'tbody') {
            newProps.className = `${newProps.className || ''} m_b2404537 mantine-Table-tbody`.trim();
        } else if (child.type === 'tr') {
            newProps.className = `${newProps.className || ''} m_4e7aa4fd mantine-Table-tr`.trim();
            newProps['data-striped'] = 'odd';
            newProps['data-hover'] = 'true';
        } else if (child.type === 'th') {
            newProps.className = `${newProps.className || ''} m_4e7aa4f3 mantine-Table-th`.trim();
            newProps['data-with-column-border'] = 'true';
        } else if (child.type === 'td') {
            newProps.className = `${newProps.className || ''} m_4e7aa4ef mantine-Table-td`.trim();
            newProps['data-with-column-border'] = 'true';
        }

        // Recursively apply this wrapping to children
        if (React.Children.count(child.props.children) > 0) {
            newChildren = React.Children.map(child.props.children, wrapChildrenWithClasses);
        }

        return React.cloneElement(child, newProps, newChildren);
    }, []);

    // Memoizing the transformation of children to avoid unnecessary re-renders
    const memoizedChildren = useMemo(() => React.Children.map(children, (child) =>
        React.isValidElement(child) ? <TableRow child={child} wrapChildrenWithClasses={wrapChildrenWithClasses} /> : child
    ), [children, wrapChildrenWithClasses]);

    return (
        <div className={styles.customTableWrapper}>
            <Group justify="flex-end" mb="md">
                <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
                <Button onClick={handleExportToCSV}>Export to CSV</Button>
            </Group>

            <Table
                ref={tableRef}
                striped
                highlightOnHover
                withTableBorder
                withColumnBorders
                withRowBorders={false}
                className={styles.customTable}
            >
                {memoizedChildren}
            </Table>
        </div>
    );
};
