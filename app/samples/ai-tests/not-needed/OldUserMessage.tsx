// /ai-chatbot/nice-working/response/UserMessage.tsx

import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Paper, Textarea, Button, ActionIcon, Box, Group } from '@mantine/core';
import { FiEdit2 } from "react-icons/fi";
import { activeChatMessagesArrayAtom } from '@/context/atoms/chatAtoms';
import { MessageEntry } from '@/types/chat';
import styles from "@/app/samples/ai-tests/shared/input/DynamicTextarea.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import { MdPermMedia } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";

interface UserMessageProps {
    messageId: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ messageId }) => {
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const message: MessageEntry | undefined = activeChatMessages[parseInt(messageId)];
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(message?.text || '');

    if (!message) {
        return null;
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (message) {
            const updatedMessage = { ...message, text: content };
            setActiveChatMessages(
                activeChatMessages.map((m, index) => index === parseInt(messageId) ? updatedMessage : m)
            );
            setIsEditing(false);
        }
    };
    const [collapsed, setCollapsed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setCollapsed(!collapsed);
    };

    const handleBoxClick = () => {
        if (collapsed) {
            setCollapsed(false);
        }
        textareaRef.current?.focus();
    };

    const handleUpload = () => {
        // Placeholder for upload logic
    };


    useEffect(() => {
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const textArea = textareaRef.current;
        textArea?.addEventListener('focus', handleFocus);
        textArea?.addEventListener('blur', handleBlur);

        return () => {
            textArea?.removeEventListener('focus', handleFocus);
            textArea?.removeEventListener('blur', handleBlur);
        };
    }, []);

    return (
        <div>
            <Box
                className={`${styles.dynamicTextareaContainer} ${isFocused ? styles.focused : ''}`}
                onClick={handleBoxClick}
                tabIndex={-1}
            >
                <Group justify='space-between' style={{
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        color: '#909090',
                        userSelect: 'none'
                    }}>
                    </div>
                    <div>
                        <ActionIcon size="sm" variant="transparent" onClick={handleEdit} style={{color: '#909090'}}>
                            <MdPermMedia/>
                        </ActionIcon>
                        <ActionIcon size="sm" variant="transparent" onClick={handleToggle} style={{color: '#909090'}}>
                            <HiMiniArrowPathRoundedSquare/>
                        </ActionIcon>
                    </div>
                </Group>
                <Textarea
                    ref={textareaRef}
                    value={message.text}
                    onChange={handleSave}
                    autosize
                    minRows={3}
                    maxRows={collapsed ? 2 : undefined}
                    size="xs"
                    variant="unstyled"
                    className={styles.textareaStyle}
                />
            </Box>
        </div>
    );
};

export default UserMessage;
