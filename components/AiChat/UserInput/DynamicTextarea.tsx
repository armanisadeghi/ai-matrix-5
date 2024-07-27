'use client';

import React, { forwardRef, useState } from 'react';
import { Textarea, ActionIcon, Group, Box } from '@mantine/core';
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import styles from './DynamicTextarea.module.css';
import { useDynamicTextArea } from '../../../hooks/ui/useDynamicTextarea';
import useDynamicTextareaLogic from '../../../hooks/ai/useDynamicTextareaLogic';
import useKeyDownHandler from "@/utils/commonUtils/useKeyDownHandler";
import ResponsiveSlider from '@/components/AiChat/UserInput/settings/MatrixSlider/ResponsiveSlider';
import SimpleChatSettingsModal from "./settings/SimpleChatSettingsModal";
import AmeOverComponentIcon from "@/ui/button/AmeOverComponentIcon";
import { AmeFileUploadOverComponent } from "@/ui/button/AmeFileUploadOverComponent";

interface DynamicTextareaProps {
    systemText: string;
    placeholderText: string;
  className?: string;
}


// TODO - Replace slider with this one: AmeResponsiveSlider (After testing to make sure there are no styling issues)


const DynamicTextarea = forwardRef<HTMLDivElement, DynamicTextareaProps>((
  { systemText, placeholderText, className }, ref) => {
    const {
        userInput,
        handleInputChange,
        handleSendMessage,
        textareaRef,
        streamTrigger,
        setStreamTrigger,
    } = useDynamicTextareaLogic();

    const { collapsed, isFocused, handleToggle, handleBoxClick } = useDynamicTextArea(() => handleSendMessage(textareaRef));
    const handleKeyDown = useKeyDownHandler(() => handleSendMessage(textareaRef));
    const [settingsModalOpened, setSettingsModalOpened] = useState(false);
    const openSettingsModal = () => setSettingsModalOpened(true);
    const closeSettingsModal = () => setSettingsModalOpened(false);
    const handleDelete = () => handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
    const handleStreamComplete = () => setStreamTrigger(false);

    return (
    <div ref={ref} className={className}>
            <Box className={`${styles.dynamicTextareaContainer} ${isFocused ? styles.focused : ''}`} onClick={handleBoxClick} tabIndex={-1}>
                <Group justify='space-between' style={{ width: '100%', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#909090', userSelect: 'none' }}>
                        {systemText}
                    </div>
                    <div>
                        <ActionIcon.Group>
                            <AmeOverComponentIcon tooltip="Chat settings" onClick={openSettingsModal} >
                                <RiSettings2Line />
                            </AmeOverComponentIcon>
                            <AmeFileUploadOverComponent></AmeFileUploadOverComponent>
                            <AmeOverComponentIcon tooltip="Clear all text" onClick={handleDelete} >
                                <RiDeleteBin3Line />
                            </AmeOverComponentIcon>
                            <AmeOverComponentIcon tooltip="Expand or collapse without impacting the text content" onClick={handleToggle}>
                                <FaExpandArrowsAlt />
                            </AmeOverComponentIcon>
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
                    size="sm"
                    variant="unstyled"
                    className={styles.textareaStyle}
                    onKeyDown={handleKeyDown}
                />
            </Box>
            <ResponsiveSlider />
            <div style={{ height: '185px' }}></div>
            <SimpleChatSettingsModal opened={settingsModalOpened} onClose={closeSettingsModal} />
        </div>
    );
});

DynamicTextarea.displayName = 'DynamicTextarea';

export default DynamicTextarea;
