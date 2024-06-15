import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { Textarea, ActionIcon, Group, Box, Modal, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { RiDeleteBin3Line, RiSettings2Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";
import AmeOverComponentIcon from "@/ui/button/AmeOverComponentIcon";
import { AmeFileUploadOverComponent } from "@/ui/button/AmeFileUploadOverComponent";
import styles from './FancyText.module.css';
import useKeyDownHandler from "@/utils/commonUtils/useKeyDownHandler";
import AmeSettingsModal from '@/ui/modal/AmeSettingsModal';
import { AtomName, matrixLevelSetting } from "@/state/aiAtoms/settingsAtoms";
import AmeResponsiveSlider from "@/ui/slider/AmeResponsiveSlider";


export interface AmeTextWithSliderProps {
    label?: string;
    placeholder?: string;
    className?: string;
    settingAtomNames?: AtomName[];
    modalType?: 'none' | 'custom' | 'default';
    customModal?: React.ReactNode;
    fileUploadEnabled?: boolean;
    onSubmit?: (text: string) => void;
}

const AmeTextWithSlider = forwardRef<HTMLDivElement, AmeTextWithSliderProps>((
    {
        label,
        placeholder,
        className,
        settingAtomNames = [],
        modalType = 'default',
        customModal,
        fileUploadEnabled = true,
        onSubmit
    }, ref) => {

    const [userInput, setUserInput] = useState('');
    const [settingsModalOpened, setSettingsModalOpened] = useState(false);
    const [defaultModalOpened, setDefaultModalOpened] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleSubmitMessage = () => {
        const text = textareaRef.current?.value || '';
        if (onSubmit) {
            onSubmit(text);
        } else {
            setDefaultModalOpened(true);
        }
    };

    const handleKeyDown = useKeyDownHandler(() => handleSubmitMessage());

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

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    useEffect(() => {
        const textArea = textareaRef.current;
        textArea?.addEventListener('focus', handleFocus);
        textArea?.addEventListener('blur', handleBlur);

        return () => {
            textArea?.removeEventListener('focus', handleFocus);
            textArea?.removeEventListener('blur', handleBlur);
        };
    }, []);

    const openSettingsModal = () => setSettingsModalOpened(true);
    const closeSettingsModal = () => setSettingsModalOpened(false);
    const handleDelete = () => setUserInput('');

    return (
        <Box
            ref={ref}
            bg={colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]}
            className={`${className || ''} ${styles['amefancy-container']} ${isFocused ? styles['amefancy-focused'] : ''}`}
            onClick={handleBoxClick}
            tabIndex={-1}>
            <Group justify='space-between' className={styles['amefancy-group']}>
                <div className={styles['amefancy-label']}>
                    {label}
                </div>
                <div>
                    <ActionIcon.Group>
                        {modalType !== 'none' && (
                            <AmeOverComponentIcon tooltip="Chat settings" onClick={openSettingsModal}
                                                  className={styles['amefancy-action-icon']}>
                                <RiSettings2Line/>
                            </AmeOverComponentIcon>
                        )}
                        {fileUploadEnabled && <AmeFileUploadOverComponent/>}
                        <AmeOverComponentIcon tooltip="Clear all text" onClick={handleDelete}
                                              className={styles['amefancy-action-icon']}>
                            <RiDeleteBin3Line/>
                        </AmeOverComponentIcon>
                        <AmeOverComponentIcon tooltip="Expand or collapse without impacting the text content"
                                              onClick={handleToggle} className={styles['amefancy-action-icon']}>
                            <FaExpandArrowsAlt/>
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
            <AmeResponsiveSlider setting={matrixLevelSetting}/>
            {modalType === 'default' && (
                <AmeSettingsModal
                    opened={settingsModalOpened}
                    onClose={closeSettingsModal}
                    atomNames={settingAtomNames}
                />
            )}
            {modalType === 'custom' && customModal}
            <Modal
                opened={defaultModalOpened}
                onClose={() => setDefaultModalOpened(false)}
                title="Text Submitted"
            >
                {textareaRef.current?.value}
            </Modal>
        </Box>

    );
});

AmeTextWithSlider.displayName = 'AmeTextWithSlider';

export default AmeTextWithSlider;
