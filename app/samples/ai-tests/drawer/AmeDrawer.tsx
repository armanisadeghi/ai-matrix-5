import React from 'react';
import { Drawer, ScrollArea, DrawerProps, MantineSize, MantineColor, MantineShadow } from '@mantine/core';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

type AmeDrawerProps = {
    opened: boolean;
    onClose: () => void;
    header: React.ReactNode;
    content: React.ReactNode;
    size?: MantineSize | number;
    position?: 'left' | 'right' | 'top' | 'bottom';
    padding?: 'md' | number;
    allowScroll?: boolean;
    withOverlay?: boolean;
    overlayOpacity?: number;
    transitionDuration?: number;
};

const AmeDrawer: React.FC<AmeDrawerProps> = (
    {
        opened,
        onClose,
        header,
        content,
        size = 'xs',
        position = 'right',
        padding = 'xs',
        allowScroll = true,
        withOverlay = true,
        overlayOpacity = 0.5,
        transitionDuration = 200,
    }) => {
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            size={size}
            position={position}
            padding={padding}
            withOverlay={withOverlay}
            overlayProps={{opacity: overlayOpacity}}
            transitionProps={{duration: transitionDuration}}
            closeButtonProps={{
                icon: <TbLayoutSidebarLeftCollapseFilled size={20}/>,
            }}
        >
            <Drawer.Header>
                <Drawer.Title>{header}</Drawer.Title>
                <Drawer.CloseButton/>
            </Drawer.Header>
            {allowScroll ? (
                <ScrollArea style={{height: '100%'}}>
                    <Drawer.Body>{content}</Drawer.Body>
                </ScrollArea>
            ) : (
                <Drawer.Body>{content}</Drawer.Body>
            )}
        </Drawer>
    );
};

export default AmeDrawer;
