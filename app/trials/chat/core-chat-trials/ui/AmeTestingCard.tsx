import React, { ReactNode, memo } from 'react';
import { Group, Paper, ScrollArea } from '@mantine/core';
import { TbDragDrop } from 'react-icons/tb';
import styles from './gridLayout.module.css';
import AmeActionIcon from '@/ui/button/AmeActionIcon';


interface AmeTestCardProps {
    rowHeight: number;
    title: string;
    scrollbar?: boolean;
    scrollAreaHeight?: number;
    children: ReactNode;
}

const DragButton: React.FC = memo(() => (
    <Group justify="flex-end">
        <AmeActionIcon size="xs" title="Drag" className={`draggable-handleo ${styles.dragIconWrapper}`}>
            <TbDragDrop/>
        </AmeActionIcon>
    </Group>
));

const AmeTestCard: React.FC<AmeTestCardProps> = (
    {
        rowHeight,
        title,
        scrollbar = true,
        scrollAreaHeight = 230,
        children
    }) => {
    return (
        <div>
            <Paper withBorder p="md" style={{height: rowHeight, overflow: 'auto'}}>
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <DragButton/>
                </div>
                {scrollbar ? (
                    <ScrollArea style={{height: scrollAreaHeight}} scrollbarSize={4}>
                        {children}
                    </ScrollArea>
                ) : (
                    <div style={{height: scrollAreaHeight}}>
                        {children}
                    </div>
                )}
            </Paper>
        </div>
    );
};

export default memo(AmeTestCard);
