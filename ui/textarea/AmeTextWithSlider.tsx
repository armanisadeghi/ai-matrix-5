'use client';

import MicrophoneButton, { audioStateAtom } from '@/components/Audio/MicrophoneButton';
import MicrophoneButtonSmall from '@/components/Audio/MicrophoneButtonSmall';
import InputDropUp from '@/ui/textarea/concepts/InputDropUp';
import React, { forwardRef, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Textarea, ActionIcon, Group, Box, Modal, useMantineTheme, useMantineColorScheme, NativeSelect, Select } from '@mantine/core';
import { RiDeleteBin3Line, RiSettings2Line } from 'react-icons/ri';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import AmeOverComponentIcon from '@/ui/button/AmeOverComponentIcon';
import { AmeFileUploadOverComponent } from '@/ui/button/AmeFileUploadOverComponent';
import { useRecoilState } from 'recoil';
import styles from './FancyText.module.css';
import useKeyDownHandler from '@/utils/commonUtils/useKeyDownHandler';
import AmeSettingsModal from '@/ui/modal/AmeSettingsModal';
import { AtomName, matrixLevelSetting } from '@/state/aiAtoms/settingsAtoms';
import AmeResponsiveSlider from '@/ui/slider/AmeResponsiveSlider';
import { FaMicrophone } from 'react-icons/fa6';

export interface AmeTextWithSliderProps {
    label?: string;
    placeholder?: string;
    className?: string;
    settingAtomNames?: AtomName[];
    modalType?: 'none' | 'custom' | 'default';
    customModal?: React.ReactNode;
    fileUploadEnabled?: boolean;
    onSubmit?: (text: string) => void;
    clearInput?: boolean;
    onInputCleared?: () => void;
}

interface ActionButtonsProps {
    modalType: 'none' | 'custom' | 'default';
    onMicClick: () => void;
    fileUploadEnabled: boolean;
    onSettingsClick: () => void;
    onDelete: () => void;
    onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = React.memo(({modalType, onMicClick, fileUploadEnabled, onSettingsClick, onDelete, onToggle}) => (
    <ActionIcon.Group>
        <MicrophoneButtonSmall/>
{/*
        <AmeOverComponentIcon tooltip="Use Mic" onClick={(e) => { e.stopPropagation(); onMicClick(); }} className={styles['amefancy-action-icon']}>
            <FaMicrophone/>
        </AmeOverComponentIcon>
*/}
        {modalType !== 'none' && (
            <AmeOverComponentIcon tooltip="Chat settings" onClick={(e) => { e.stopPropagation(); onSettingsClick(); }} className={styles['amefancy-action-icon']}>
                <RiSettings2Line/>
            </AmeOverComponentIcon>
        )}
        {fileUploadEnabled && <AmeFileUploadOverComponent  />}
        <AmeOverComponentIcon tooltip="Clear all text" onClick={(e) => { e.stopPropagation(); onDelete(); }} className={styles['amefancy-action-icon']}>
            <RiDeleteBin3Line/>
        </AmeOverComponentIcon>
        <AmeOverComponentIcon tooltip="Expand or collapse without impacting the text content" onClick={(e) => { e.stopPropagation(); onToggle(e); }} className={styles['amefancy-action-icon']}>
            <FaExpandArrowsAlt/>
        </AmeOverComponentIcon>
    </ActionIcon.Group>
));

ActionButtons.displayName = 'ActionButtons';

const AmeTextWithSlider = forwardRef<HTMLDivElement, AmeTextWithSliderProps>((props, ref) => {
    const {
        label,
        placeholder,
        className,
        settingAtomNames = [],
        modalType = 'default',
        customModal,
        fileUploadEnabled = true,
        onSubmit,
        clearInput = false,
        onInputCleared
    } = props;

    const [userInput, setUserInput] = useState('');
    const [settingsModalOpened, setSettingsModalOpened] = useState(false);
    const [defaultModalOpened, setDefaultModalOpened] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme();
    const [recording, setRecording] = useRecoilState(audioStateAtom);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (clearInput) {
            setUserInput('');
            if (onInputCleared) {
                onInputCleared();
            }
        }
    }, [clearInput, onInputCleared]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    }, []);

    const handleSubmitMessage = useCallback(() => {
        const text = textareaRef.current?.value || '';
        if (text.trim().length === 0) return;

        if (onSubmit) {
            onSubmit(text);
        } else {
            setDefaultModalOpened(true);
        }
    }, [onSubmit]);

    const handleKeyDown = useKeyDownHandler(handleSubmitMessage);

    const handleToggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setCollapsed(prev => !prev);
    }, []);

    const handleMicClick = useCallback(() => {
        setRecording(prev => !prev);
    }, []);

    const handleBoxClick = useCallback(() => {
        if (collapsed) {
            setCollapsed(false);
        }
        textareaRef.current?.focus();
    }, [collapsed]);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    useEffect(() => {
        const textArea = textareaRef.current;
        textArea?.addEventListener('focus', handleFocus);
        textArea?.addEventListener('blur', handleBlur);

        return () => {
            textArea?.removeEventListener('focus', handleFocus);
            textArea?.removeEventListener('blur', handleBlur);
        };
    }, [handleFocus, handleBlur]);

    const openSettingsModal = useCallback(() => setSettingsModalOpened(true), []);
    const closeSettingsModal = useCallback(() => setSettingsModalOpened(false), []);
    const handleDelete = useCallback(() => setUserInput(''), []);

    const boxStyle = useMemo(() => ({
        bg: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        className: `${className || ''} ${styles['amefancy-container']} ${isFocused ? styles['amefancy-focused'] : ''}`
    }), [colorScheme, theme.colors, className, isFocused]);

    const textareaProps = useMemo(() => ({
        autosize: true,
        minRows: 2,
        maxRows: collapsed ? 2 : 40,
        placeholder,
        size: 'sm' as const,
        variant: 'unstyled' as const,
        className: styles['amefancy-textarea'],
    }), [collapsed, placeholder]);

    const sliderClassName = useMemo(() => {
        return `${styles['amefancy-slider']} ${
            colorScheme === 'dark' ? styles['amefancy-slider-dark'] : styles['amefancy-slider-light']
        }`;
    }, [colorScheme]);

    return (
        <>
            <Box ref={ref} {...boxStyle} onClick={handleBoxClick} tabIndex={-1}>
                <Group justify="space-between" className={styles['amefancy-group']}>
                    <InputDropUp/>
                    <div className={styles['amefancy-label']}>
                        {label}
                    </div>
                    <ActionButtons
                        modalType={modalType}
                        onMicClick={handleMicClick}
                        fileUploadEnabled={fileUploadEnabled}
                        onSettingsClick={openSettingsModal}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                    />
                </Group>
                <Textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    {...textareaProps}
                />
                <div className={sliderClassName}>
                    <AmeResponsiveSlider setting={matrixLevelSetting}/>
                </div>
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
        </>
    );
});

AmeTextWithSlider.displayName = 'AmeTextWithSlider';

export default React.memo(AmeTextWithSlider);
