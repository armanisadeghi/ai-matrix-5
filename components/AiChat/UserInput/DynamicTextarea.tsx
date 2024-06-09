// chat-app/nice-working/DynamicTextarea.tsx

import React, { forwardRef, useState } from 'react';
import { Textarea, ActionIcon, Group, Box, FileButton } from '@mantine/core';
import { MdPermMedia } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";
import styles from './DynamicTextarea.module.css';
import { useDynamicTextArea } from './useDynamicTextarea';
import { useHandleSubmitMessage } from './handleSubmitMessage';
import useKeyDownHandler from "@/components/AiChat/UserInput/useKeyDownHandler";
import StreamOpenai from '../../../app/samples/chats/hooks/openAiStream';
import ResponsiveSlider from '@/components/AiChat/UserInput/settings/MatrixSlider/ResponsiveSlider';
import SimpleChatSettingsModal from "./settings/SimpleChatSettingsModal";
import { quickChatSettingsAtom } from "@/app/samples/ai-tests/shared/atoms/settingsAtoms";
import { useRecoilValue } from "recoil";
import useFileUpload from "@/app/samples/ai-tests/shared/hooks/useFileUpload";
import { RiSettings2Line } from "react-icons/ri";

interface DynamicTextareaProps {
    systemText: string;
    placeholderText: string;
    userInput: string;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DynamicTextarea = forwardRef<HTMLDivElement, DynamicTextareaProps>((
    { systemText, placeholderText, userInput, handleInputChange }, ref) => {
    const { handleSubmitMessage, streamTrigger, setStreamTrigger } = useHandleSubmitMessage(handleInputChange);
    const { collapsed, isFocused, textareaRef, handleToggle, handleBoxClick } = useDynamicTextArea(() => handleSubmitMessage(textareaRef));
    const handleKeyDown = useKeyDownHandler((e) => handleSubmitMessage(textareaRef));
    const aiSettings = useRecoilValue(quickChatSettingsAtom);
    const handleFileUpload = useFileUpload();

    const [settingsModalOpened, setSettingsModalOpened] = useState(false);



    const openSettingsModal = () => {
        setSettingsModalOpened(true);
    };

    const closeSettingsModal = () => {
        setSettingsModalOpened(false);
    };

    const handleDelete = () => {
        handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
    };

    const handleStreamComplete = () => {
        setStreamTrigger(false);
    };

    return (
        <div ref={ref}>
            <Box className={`${styles.dynamicTextareaContainer} ${isFocused ? styles.focused : ''}`}
                 onClick={handleBoxClick} tabIndex={-1}>
                <Group justify='space-between' style={{ width: '100%', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#909090', userSelect: 'none' }}>
                        {systemText}
                    </div>
                    <div>
                    <ActionIcon.Group>
                        <ActionIcon size="sm" variant="transparent" onClick={openSettingsModal} style={{ color: '#909090' }}>
                            <RiSettings2Line />
                        </ActionIcon>
                        <FileButton onChange={handleFileUpload} accept="*/*">
                            {(props) => (
                                <ActionIcon
                                    size="sm"
                                    variant="transparent"
                                    {...props}
                                    style={{ color: '#909090' }}
                                >
                            <MdPermMedia />
                        </ActionIcon>
                            )}
                        </FileButton>
                        <ActionIcon size="sm" variant="transparent" onClick={handleDelete} style={{ color: '#909090' }}>
                            <RiDeleteBin3Line />
                        </ActionIcon>
                        <ActionIcon size="sm" variant="transparent" onClick={handleToggle} style={{ color: '#909090' }}>
                            <FaExpandArrowsAlt />
                        </ActionIcon>
                    </ActionIcon.Group>
                    </div>
                </Group>
                <Textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={handleInputChange}
                    autosize
                    minRows={3}
                    maxRows={collapsed ? 2 : undefined}
                    placeholder={placeholderText}
                    size="xs"
                    variant="unstyled"
                    className={styles.textareaStyle}
                    onKeyDown={handleKeyDown}
                />
            </Box>
            <ResponsiveSlider />
            <div style={{ height: '185px' }}></div>
            {streamTrigger && <StreamOpenai trigger={streamTrigger} onComplete={handleStreamComplete} />}
            <SimpleChatSettingsModal opened={settingsModalOpened} onClose={closeSettingsModal} />
        </div>
    );
});

DynamicTextarea.displayName = 'DynamicTextarea';

export default DynamicTextarea;
