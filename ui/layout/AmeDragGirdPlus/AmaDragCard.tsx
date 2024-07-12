// app/trials/core-chat-trial/ui/AmeDragCard.tsx
import React, { ReactNode, memo } from 'react';
import { Group, Paper, ScrollArea, ActionIcon, Tooltip } from '@mantine/core';
import { TbDragDrop, TbLock, TbLockOpen, TbMaximize, TbMinimize } from 'react-icons/tb';
import styles from './gridLayout.module.css';
import AmeActionIcon from '@/ui/button/AmeActionIcon';


interface AmeDragCardProps {
    rowHeight: number;
    title: string;
    scrollbar?: boolean;
    scrollAreaHeight?: number;
    children: ReactNode;
    onLockToggle: () => void;
    onMinimizeToggle: () => void;
    isLocked: boolean;
    isMinimized: boolean;
}

const DragButton: React.FC = memo(() => (
    <AmeActionIcon size="xs" title="Drag" className={`draggable-handle ${styles.dragIconWrapper}`}>
        <TbDragDrop/>
    </AmeActionIcon>
));

const AmeDragCard: React.FC<AmeDragCardProps> = (
    {
        rowHeight,
        title,
        scrollbar = true,
        scrollAreaHeight = 230,
        children,
        onLockToggle,
        onMinimizeToggle,
        isLocked,
        isMinimized
    }) => {
    return (
        <Paper withBorder p="md" style={{height: rowHeight, overflow: 'auto'}}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <Group>
                    <Tooltip label={isLocked ? 'Unlock' : 'Lock'}>
                        <ActionIcon onClick={onLockToggle} size="sm">
                            {isLocked ? <TbLock/> : <TbLockOpen/>}
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label={isMinimized ? 'Maximize' : 'Minimize'}>
                        <ActionIcon onClick={onMinimizeToggle} size="sm">
                            {isMinimized ? <TbMaximize/> : <TbMinimize/>}
                        </ActionIcon>
                    </Tooltip>
                    <DragButton/>
                </Group>
            </div>
            {!isMinimized && (
                scrollbar ? (
                    <ScrollArea style={{height: scrollAreaHeight}} scrollbarSize={4}>
                        {children}
                    </ScrollArea>
                ) : (
                    <div style={{height: scrollAreaHeight}}>
                        {children}
                    </div>
                )
            )}
        </Paper>
    );
};

export default memo(AmeDragCard);
