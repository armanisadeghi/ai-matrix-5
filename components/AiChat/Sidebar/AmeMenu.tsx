import React, { useState, useContext, ReactNode } from 'react';
import { Menu, rem, Modal, Text, TextInput, Button, Box, Space } from '@mantine/core';
import { BsPencil, BsCloudDownload } from "react-icons/bs";
import { FaShareFromSquare } from "react-icons/fa6";
import { SiXdadevelopers, SiAppstore } from "react-icons/si";
import { CiViewList } from "react-icons/ci";
import { IconTrash } from '@tabler/icons-react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeUserAtom } from '@/context/atoms/userAtoms';
import { activeChatMessagesArrayAtom, activeChatIdAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import { MessageEntry } from "@/types";
import AssistantMessage from "@/components/AiChat/Response/AssistantMessage";
import UserMessage from "@/components/Abstain/extra/UserMessage";

interface AmeMenuProps {
    children: ReactNode;
    initialValue: string;  // New prop for the initial value
    onPeak?: () => void;
    context?: React.Context<any>;  // Optional prop for store
    onShare?: () => void;
    onRename?: () => void;
    onDownload?: () => void;
    onUseInPlayground?: () => void;
    onUseForApps?: () => void;
    onDelete?: () => void;
    open: boolean; // New prop to control menu open state
    onClose: () => void; // New prop to control menu close action
}

const AmeMenu: React.FC<AmeMenuProps> & { Target: React.FC<{ children: ReactNode }> } = (
    {
        children,
        initialValue,
        onPeak,
        context,
        onShare,
        onRename,
        onDownload,
        onUseInPlayground,
        onUseForApps,
        onDelete,
        open,
        onClose
    }) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [renameModalOpened, setRenameModalOpened] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const contextValue = context ? useContext(context) : null;
    const messages = useRecoilValue(activeChatMessagesArrayAtom);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const activeUser = useRecoilValue(activeUserAtom);
    const setChatMessages = useSetRecoilState(activeChatMessagesArrayAtom);

    const handlePeak = () => {
        const message = contextValue ? contextValue.message : initialValue;
        setModalTitle(message);
        setModalOpened(true);
        if (onPeak) {
            onPeak();
        }
    };

    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            alert('URL copied to clipboard');
        } catch (err) {
            console.error('Failed to copy URL', err);
        }
    };

    const handleRename = () => {
        setRenameModalOpened(true);
    };

    const handleDownload = () => {
        const textContent = messages.map(msg => `${msg.role}: ${msg.text}`).join('\n\n');
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${initialValue}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleRenameSubmit = async () => {
        // Implement renaming logic here, e.g., updating the database and recoil state
        // After renaming:
        setRenameModalOpened(false);
    };

    return (
        <>
            <Menu
                opened={open}
                onClose={onClose}
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
                    }}/>} onClick={handleShare}>
                        Share
                    </Menu.Item>
                    <Menu.Item leftSection={<BsPencil style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={handleRename}>
                        Rename
                    </Menu.Item>
                    <Menu.Item leftSection={<BsCloudDownload style={{
                        width: rem(14),
                        height: rem(14)
                    }}/>} onClick={handleDownload}>
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
                size="xl"

                title={modalTitle}  // Display the initial value as the title
                transitionProps={{
                    transition: 'fade',
                    duration: 600,
                    timingFunction: 'linear'
                }}
            >
                <Box>
                    {messages.map((entry: MessageEntry, entryIndex: number) => (

                        <div key={entryIndex}>
                            {entry.role === 'assistant' ? (
                                <AssistantMessage text={entry.text}/>
                            ) : (
                                <UserMessage text={entry.text}/>
                            )}
                            <Space h={10}/>
                        </div>

                    ))}
                </Box>
            </Modal>

            <Modal
                opened={renameModalOpened}
                onClose={() => setRenameModalOpened(false)}
                title="Rename Chat"
            >
                <TextInput
                    label="New Chat Title"
                    placeholder="Enter new chat title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.currentTarget.value)}
                />
                <Button onClick={handleRenameSubmit} style={{ marginTop: '10px' }}>Rename</Button>
            </Modal>
        </>
    );
};

const Target: React.FC<{ children: ReactNode }> = ({children}) => (
    <Menu.Target>{children}</Menu.Target>
);

AmeMenu.Target = Target;

export default AmeMenu;
