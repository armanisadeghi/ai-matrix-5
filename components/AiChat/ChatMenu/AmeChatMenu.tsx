// AmeChatMenu.tsx
import React, { useState, ReactNode, MouseEvent, lazy, Suspense } from 'react';
import { Menu, rem } from '@mantine/core';
import { BsPencil, BsCloudDownload } from 'react-icons/bs';
import { FaShareFromSquare } from 'react-icons/fa6';
import { SiXdadevelopers, SiAppstore } from 'react-icons/si';
import { CiViewList } from 'react-icons/ci';
import { IconTrash } from '@tabler/icons-react';

const ChatDetailsModal = lazy(() => import('./ChatDetailsModal'));
const RenameChatModal = lazy(() => import('./RenameChatModal'));
const DeleteChatModal = lazy(() => import('@/components/AiChat/ChatMenu/DeleteChatModal'));
const DownloadChatModal = lazy(() => import('@/components/AiChat/ChatMenu/DownloadChatModal'));
const ShareChatModal = lazy(() => import('@/components/AiChat/ChatMenu/ShareChatModal'));
const UseForAppsModal = lazy(() => import('@/components/AiChat/ChatMenu/UseForAppsModal'));
const UseInPlaygroundModal = lazy(() => import('@/components/AiChat/ChatMenu/UseInPlaygroundModal'));

interface AmeChatMenuProps {
    children: React.ReactNode;
    chatId: string;
    open: boolean;
    onClose: () => void;
    onItemClick: () => void;
}

const AmeChatMenu: React.FC<AmeChatMenuProps> & { Target: React.FC<{ children: ReactNode }> } = ({children, chatId, open, onClose, onItemClick}) => {
    const [modalOpened, setModalOpened] = useState<string | null>(null);

    const handleOpenModal = (modalName: string) => (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setModalOpened(modalName);
        console.log('onItemClick', modalName);
        onItemClick();
    };

    const handleCloseModal = () => {
        setModalOpened(null);
    };

    const handleMenuItemClick = (handler: (event: MouseEvent) => void) => (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        handler(event);
    };

    const renderModal = () => {
        if (!modalOpened) return null;

        return (
            <Suspense fallback={<div>Loading...</div>}>
                {modalOpened === 'details' && <ChatDetailsModal chatId={chatId} opened={true} onClose={handleCloseModal}/>}
                {modalOpened === 'rename' && <RenameChatModal chatId={chatId} opened={true} onClose={handleCloseModal}/>}
                {modalOpened === 'share' && <ShareChatModal chatId={chatId} opened={true} onClose={handleCloseModal}/>}
                {modalOpened === 'download' && <DownloadChatModal chatId={chatId} opened={true} onClose={handleCloseModal}/>}
                {modalOpened === 'playground' && <UseInPlaygroundModal chatId={chatId} opened={true} onClose={handleCloseModal}/>}
                {modalOpened === 'apps' && <UseForAppsModal chatId={chatId} opened={true} onClose={handleCloseModal}/>}
                {modalOpened === 'delete' && <DeleteChatModal chatId={chatId} opened={true} onClose={handleCloseModal}/>}
            </Suspense>
        );
    };

    return (
        <>
            <Menu opened={open} onClose={onClose} withinPortal={true} trapFocus={false} shadow="md" width={200} position="bottom-end">
                {children}
                <Menu.Dropdown onClick={(e: MouseEvent) => e.stopPropagation()}>
                    <Menu.Item leftSection={<CiViewList style={{width: rem(14), height: rem(14)}}/>} onClick={handleMenuItemClick(handleOpenModal('details'))}>
                        Peak
                    </Menu.Item>
                    <Menu.Item leftSection={<FaShareFromSquare style={{width: rem(14), height: rem(14)}}/>} onClick={handleMenuItemClick(handleOpenModal('share'))}>
                        Share
                    </Menu.Item>
                    <Menu.Item leftSection={<BsPencil style={{width: rem(14), height: rem(14)}}/>} onClick={handleMenuItemClick(handleOpenModal('rename'))}>
                        Rename
                    </Menu.Item>
                    <Menu.Item leftSection={<BsCloudDownload style={{width: rem(14), height: rem(14)}}/>} onClick={handleMenuItemClick(handleOpenModal('download'))}>
                        Download
                    </Menu.Item>

                    <Menu.Divider/>

                    <Menu.Label>Pro</Menu.Label>
                    <Menu.Item leftSection={<SiXdadevelopers style={{width: rem(14), height: rem(14)}}/>} onClick={handleMenuItemClick(handleOpenModal('playground'))}>
                        Use in Playground
                    </Menu.Item>

                    <Menu.Divider/>

                    <Menu.Label>Premium</Menu.Label>
                    <Menu.Item leftSection={<SiAppstore style={{width: rem(14), height: rem(14)}}/>} onClick={handleMenuItemClick(handleOpenModal('apps'))}>
                        Use for Apps
                    </Menu.Item>

                    <Menu.Divider/>

                    <Menu.Label>Danger Zone</Menu.Label>
                    <Menu.Item color="red" leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>} onClick={handleMenuItemClick(handleOpenModal('delete'))}>
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            {renderModal()}
        </>
    );
};

const Target: React.FC<{ children: ReactNode }> = ({children}) => (
    <Menu.Target>{children}</Menu.Target>
);

AmeChatMenu.Target = Target;

export default AmeChatMenu;
