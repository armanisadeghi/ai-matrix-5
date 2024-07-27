import AmeActionTextInput from '@/ui/input/AmeActionTextInput';
import React, { useState, useCallback } from 'react';
import { Flex, ActionIcon, ScrollArea, Stack, Button, Text } from '@mantine/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useColorUtils from '@/utils/colorUtils';

interface SidebarItemData {
    id: string;
    name: string;
    value: string | number;
}

interface SidebarSectionProps {
    title: string;
    actionTitle: string;
    sectionItems: SidebarItemData[];
    onItemClick: (id: string) => void;
    onItemAction: (id: string) => void;
    onSectionAction: () => void;
}

const SidebarItem: React.FC<{ item: SidebarItemData; onItemClick: (id: string) => void; onItemAction: (id: string) => void }> = ({ item, onItemClick, onItemAction }) => {
    const [hovered, setHovered] = useState(false);
    const { getDefaultBackgroundColor, getHoverBackgroundColor, getModerateTextColor } = useColorUtils();

    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    const handleIconClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        onItemAction(item.id);
    }, [item.id, onItemAction]);

    return (
        <Flex
            mih={0}
            gap="0"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="nowrap"
            style={{ width: '100%', margin: '0', padding: '0' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onItemClick(item.id)}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: hovered ? getHoverBackgroundColor() : getDefaultBackgroundColor(),
                    color: getModerateTextColor(),
                    transition: 'background-color 0.3s',
                    borderRadius: '2px',
                    padding: '0 5px',
                    position: 'relative'
                }}
            >
                <div style={{ cursor: 'pointer', padding: '0', margin: '0', width: '100%' }}>
                    <AmeActionTextInput
                        initialValue={`${item.name}: ${item.value}`}
                        editable={false}
                        variant={'unstyled'}
                        style={{
                            textDecoration: 'none',
                            padding: '0',
                            width: '100%',
                        }}
                        highlightOnClick={false}
                    />
                </div>
                {hovered && (
                    <ActionIcon
                        variant="transparent"
                        size="xs"
                        style={{ cursor: 'pointer', position: 'absolute', right: 5 }}
                        onClick={handleIconClick}
                    >
                        <BsThreeDotsVertical />
                    </ActionIcon>
                )}
            </div>
        </Flex>
    );
};

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, sectionItems, onItemClick, onItemAction, onSectionAction, actionTitle }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mantine-spacing-xs)' }}>
            <Text size="md" c="grape">{title}</Text>
            <ScrollArea h={200} scrollbarSize={4} scrollHideDelay={500}>
                    {sectionItems.map(item => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            onItemClick={onItemClick}
                            onItemAction={onItemAction}
                        />
                    ))}
            </ScrollArea>
            <Button fullWidth variant="filled" color="grape" size="xs" onClick={onSectionAction}>
                {actionTitle}
            </Button>
        </div>
    );
};

export default SidebarSection;
