import React, { forwardRef, useState } from 'react';
import { Textarea, ActionIcon, Group, Box } from '@mantine/core';
import { RiDeleteBin3Line, RiSettings2Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";
import AmeOverComponentIcon from "@/ui/button/AmeOverComponentIcon";
import { AmeFileUploadOverComponent } from "@/ui/button/AmeFileUploadOverComponent";
import styles from './FancyText.module.css';
import { useDynamicTextArea } from '@/hooks/ui/useDynamicTextarea';
import useDynamicTextareaLogic from '@/hooks/ai/useDynamicTextareaLogic';
import useKeyDownHandler from "@/utils/commonUtils/useKeyDownHandler";
import AmeSettingsModal from '@/ui/modal/AmeSettingsModal';
import { AtomName } from "@/state/aiAtoms/settingsAtoms";

interface AmeTextAreaFancyProps {
    label?: string;
    placeholder?: string;
    className?: string;
    atomNames?: AtomName[];
}

const AmeTextAreaFancy = forwardRef<HTMLDivElement, AmeTextAreaFancyProps>((
    { label, placeholder, className, atomNames = [] }, ref) => {

    const { userInput, handleInputChange, handleSendMessage, textareaRef } = useDynamicTextareaLogic();
    const { collapsed, isFocused, handleToggle, handleBoxClick } = useDynamicTextArea(() => handleSendMessage(textareaRef));
    const handleKeyDown = useKeyDownHandler(() => handleSendMessage(textareaRef));
    const [settingsModalOpened, setSettingsModalOpened] = useState(false);
    const openSettingsModal = () => setSettingsModalOpened(true);
    const closeSettingsModal = () => setSettingsModalOpened(false);
    const handleDelete = () => handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);

    return (
        <Box
            ref={ref}
            className={`${className || ''} ${styles['amefancy-container']} ${isFocused ? styles['amefancy-focused'] : ''}`}
            onClick={handleBoxClick}
            tabIndex={-1}
        >
            <Group justify='space-between' style={{ width: '100%', alignItems: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#909090', userSelect: 'none' }}>
                    {label}
                </div>
                <div>
                    <ActionIcon.Group>
                        <AmeOverComponentIcon toolTip="Chat settings" onClick={openSettingsModal} className={styles['amefancy-action-icon']}>
                            <RiSettings2Line />
                        </AmeOverComponentIcon>
                        <AmeFileUploadOverComponent />
                        <AmeOverComponentIcon toolTip="Clear all text" onClick={handleDelete} className={styles['amefancy-action-icon']}>
                            <RiDeleteBin3Line />
                        </AmeOverComponentIcon>
                        <AmeOverComponentIcon toolTip="Expand or collapse without impacting the text content" onClick={handleToggle} className={styles['amefancy-action-icon']}>
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
                placeholder={placeholder}
                size="sm"
                variant="unstyled"
                className={styles['amefancy-textarea']}
                onKeyDown={handleKeyDown}
            />
            <AmeSettingsModal
                opened={settingsModalOpened}
                onClose={closeSettingsModal}
                atomNames={atomNames}
            />
        </Box>
    );
});

AmeTextAreaFancy.displayName = 'AmeTextAreaFancy';

export default AmeTextAreaFancy;
