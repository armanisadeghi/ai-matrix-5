import React, { forwardRef, useState } from 'react';
import { Textarea, ActionIcon, Group, Box } from '@mantine/core';
import { RiDeleteBin3Line, RiSettings2Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";
import AmeOverComponentIcon from "@/ui/button/AmeOverComponentIcon";
import { AmeFileUploadOverComponent } from "@/ui/button/AmeFileUploadOverComponent";

const boxStyles = {
    border: '1px solid rgba(128, 128, 128, 0.62)',
    borderRadius: '12px',
    padding: '8px',
    cursor: 'text',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
};

const focusedStyles = {
    border: '2px solid rgba(128, 128, 128, 0.62)',
    boxShadow: '0 0 12px rgba(232, 229, 229, 0.2)',
};

const hoverStyles = {
    boxShadow: '0 0 12px rgba(205, 202, 202, 0.2)',
};

const textareaStyles = {
    fontFamily: "'Google Sans', 'Helvetica Neue', sans-serif",
};

interface AmeTextAreaFancyProps {
    systemText: string;
    placeholderText: string;
    isFocused: boolean;
    handleBoxClick: () => void;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSendMessage: () => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    handleDelete: () => void;
    handleToggle: () => void;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    userInput: string;
    collapsed: boolean;
    openSettingsModal: () => void;
}

const AmeTextAreaFancy = forwardRef<HTMLDivElement, AmeTextAreaFancyProps>(({
                                                                                systemText,
                                                                                placeholderText,
                                                                                isFocused,
                                                                                handleBoxClick,
                                                                                handleInputChange,
                                                                                handleSendMessage,
                                                                                handleKeyDown,
                                                                                handleDelete,
                                                                                handleToggle,
                                                                                textareaRef,
                                                                                userInput,
                                                                                collapsed,
                                                                                openSettingsModal,
                                                                            }, ref) => (
    <Box
        className={`${isFocused ? 'focused' : ''}`}
        onClick={handleBoxClick}
        tabIndex={-1}
        style={{
            ...boxStyles,
            ...(isFocused ? focusedStyles : {}),
            ':hover': hoverStyles,
        }}
    >
        <Group justify='space-between' style={{ width: '100%', alignItems: 'center' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#909090', userSelect: 'none' }}>
                {systemText}
            </div>
            <div>
                <ActionIcon.Group>
                    <AmeOverComponentIcon toolTip="Chat settings" onClick={openSettingsModal}>
                        <RiSettings2Line />
                    </AmeOverComponentIcon>
                    <AmeFileUploadOverComponent />
                    <AmeOverComponentIcon toolTip="Clear all text" onClick={handleDelete}>
                        <RiDeleteBin3Line />
                    </AmeOverComponentIcon>
                    <AmeOverComponentIcon toolTip="Expand or collapse without impacting the text content" onClick={handleToggle}>
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
            style={textareaStyles}
            onKeyDown={handleKeyDown}
        />
    </Box>
));

AmeTextAreaFancy.displayName = 'AmeTextAreaFancy';

export default AmeTextAreaFancy;
