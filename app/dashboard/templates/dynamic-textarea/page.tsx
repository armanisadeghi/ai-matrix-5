// Path: app/dashboard/templates/dynamic-textarea/page.tsx
'use client'; // Ensure this is a client component in Next.js
import React, { useState, useRef, useEffect } from 'react';
import { Textarea, ActionIcon, Group, Box, Space } from '@mantine/core';
import { MdPermMedia } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";
import styles from './DynamicTextarea.module.css';  // Ensure the path is correct

const DynamicTextarea = () => {
    const [value, setValue] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

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

    const handleDelete = () => {
        setValue('');
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
                }}>SYSTEM
                </div>
                <div>
                    <ActionIcon size="sm" onClick={handleUpload} style={{color: '#909090'}}>
                        <MdPermMedia/>
                    </ActionIcon>
                    <ActionIcon size="sm" onClick={handleDelete} style={{color: '#909090'}}>
                        <RiDeleteBin3Line/>
                    </ActionIcon>
                    <ActionIcon size="sm" onClick={handleToggle} style={{color: '#909090'}}>
                        <FaExpandArrowsAlt/>
                    </ActionIcon>
                </div>
            </Group>
            <Textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                autosize
                minRows={2}
                maxRows={collapsed ? 2 : undefined}
                placeholder="Enter system message..."
                size="xs"
                variant="unstyled"
                className={styles.textareaStyle}
            />
        </Box>

        </div>
    );
};

export default DynamicTextarea;
