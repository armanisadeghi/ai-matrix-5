import React, { useState, useContext, ReactNode } from 'react';
import { Menu, rem, Modal, Text } from '@mantine/core';
import { BsPencil, BsCloudDownload } from "react-icons/bs";
import { FaShareFromSquare } from "react-icons/fa6";
import { SiXdadevelopers, SiAppstore } from "react-icons/si";
import { CiViewList } from "react-icons/ci";
import { IconTrash } from '@tabler/icons-react';

interface AmeMenuProps {
    children: ReactNode;
    onPeak?: () => void;
    context?: React.Context<any>;  // Optional prop for context
    onShare?: () => void;
    onRename?: () => void;
    onDownload?: () => void;
    onUseInPlayground?: () => void;
    onUseForApps?: () => void;
    onDelete?: () => void;
}

const AmeMenu: React.FC<AmeMenuProps> & { Target: React.FC<{ children: ReactNode }> } = (
    {
        children,
        onPeak,
        context,
        onShare,
        onRename,
        onDownload,
        onUseInPlayground,
        onUseForApps,
        onDelete
    }) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const contextValue = context ? useContext(context) : null;

    const handlePeak = () => {
        const message = contextValue ? contextValue.message : 'Default message';
        setModalMessage(message);
        setModalOpened(true);
        if (onPeak) {
            onPeak();
        }
    };

    return (
        <>
            <Menu
                trigger="click"
                loop={false}
                withinPortal={false}
                trapFocus={false}
                shadow="md"
                width={200}
                position="bottom-end"
            >
                {children}
                <Menu.Dropdown>
                    <Menu.Item leftSection={<CiViewList style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={handlePeak}>
                        Peak
                    </Menu.Item>
                    <Menu.Item leftSection={<FaShareFromSquare style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={onShare}>
                        Share
                    </Menu.Item>
                    <Menu.Item leftSection={<BsPencil style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={onRename}>
                        Rename
                    </Menu.Item>
                    <Menu.Item leftSection={<BsCloudDownload style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={onDownload}>
                        Download
                    </Menu.Item>

                    <Menu.Divider/>

                    <Menu.Label>Pro</Menu.Label>
                    <Menu.Item leftSection={<SiXdadevelopers style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={onUseInPlayground}>
                        Use in Playground
                    </Menu.Item>

                    <Menu.Divider/>

                    <Menu.Label>Premium</Menu.Label>
                    <Menu.Item leftSection={<SiAppstore style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={onUseForApps}>
                        Use for Apps
                    </Menu.Item>

                    <Menu.Divider/>

                    <Menu.Label>Danger Zone</Menu.Label>
                    <Menu.Item color="red" leftSection={<IconTrash style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={onDelete}>
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Please consider this"
                transitionProps={{
                    transition: 'fade',
                    duration: 600,
                    timingFunction: 'linear'
                }}
            >
                <Text size="md">
                    {modalMessage}
                </Text>
            </Modal>
        </>
    );
};

const Target: React.FC<{ children: ReactNode }> = ({children}) => (
    <Menu.Target>{children}</Menu.Target>
);

AmeMenu.Target = Target;

export default AmeMenu;
