/*
import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { Textarea, ActionIcon, Group, Box, Grid, Slider } from '@mantine/core';
import { MdPermMedia } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaExpandArrowsAlt } from "react-icons/fa";
import styles from './DynamicTextarea.module.css';
import { IoSettingsOutline } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeChatMessagesArrayAtom, useChatMessages } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import { useRequestManager } from "@/app/samples/ai-tests/shared/services/RequestManager";

interface DynamicTextareaProps {
    systemText: string;
    placeholderText: string;
    userInput: string;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DynamicTextarea = forwardRef<HTMLDivElement, DynamicTextareaProps>((
    {
        systemText,
        placeholderText,
        userInput,
        handleInputChange,
    }, ref) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const {addMessage} = useChatMessages();
    const {handleRequest} = useRequestManager();
    const setActiveMessages = useSetRecoilState(activeChatMessagesArrayAtom);

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
        // Placeholder for file upload logic
    };

    const handleDelete = () => {
        handleInputChange({target: {value: ''}} as React.ChangeEvent<HTMLTextAreaElement>);
    };

    const handleSubmitMessage = async () => {
        const text = textareaRef.current?.value || '';
        if (text.trim()) {
            // Add user message
            const newUserMessage = {
                role: 'user',
                text: text.trim()
            };
            addMessage(newUserMessage);
            handleInputChange({target: {value: ''}} as React.ChangeEvent<HTMLTextAreaElement>);
            textareaRef.current?.focus();

            // Handle API request
            await handleRequest({
                updatedChat: [newUserMessage],
                updateCallback: (chunk: string) => {
                    setActiveMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'assistant') {
                            // Update last assistant message with new chunk
                            const updatedMessage = {
                                ...lastMessage,
                                text: lastMessage.text + chunk
                            };
                            return [
                                ...prevMessages.slice(0, prevMessages.length - 1),
                                updatedMessage,
                            ];
                        } else {
                            // Add new assistant message
                            return [
                                ...prevMessages,
                                {
                                    role: 'assistant',
                                    text: chunk
                                },
                            ];
                        }
                    });
                },
                finalizeCallback: (finalText: string) => {
                    // Add final message if necessary or do clean-up
                    setActiveMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'assistant') {
                            const updatedMessage = {
                                ...lastMessage,
                                text: lastMessage.text + finalText
                            };
                            return [
                                ...prevMessages.slice(0, prevMessages.length - 1),
                                updatedMessage,
                            ];
                        }
                        return [
                            ...prevMessages,
                            {
                                role: 'assistant',
                                text: finalText
                            },
                        ];
                    });
                }
            });
        }
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
        <div ref={ref}>
            <Box className={`${styles.dynamicTextareaContainer} ${isFocused ? styles.focused : ''}`}
                 onClick={handleBoxClick} tabIndex={-1}>
                <Group justify='space-between' style={{
                    width: '100%',
                    alignItems: 'center',
                }}>
                    <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        color: '#909090',
                        userSelect: 'none'
                    }}>{systemText} </div>
                    <div>
                        <ActionIcon size="md" variant="transparent" style={{color: '#909090'}}>
                            <IoSettingsOutline/>
                        </ActionIcon>
                        <ActionIcon size="sm" variant="transparent" onClick={handleUpload} style={{color: '#909090'}}>
                            <MdPermMedia/>
                        </ActionIcon>
                        <ActionIcon size="sm" variant="transparent" onClick={handleDelete} style={{color: '#909090'}}>
                            <RiDeleteBin3Line/>
                        </ActionIcon>
                        <ActionIcon size="sm" variant="transparent" onClick={handleToggle} style={{color: '#909090'}}>
                            <FaExpandArrowsAlt/>
                        </ActionIcon>
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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmitMessage();
                        }
                    }}
                />
            </Box>
            <div style={{
                height: '1px',
                marginTop: '10px',
                alignItems: 'center'
            }}>
                <Grid>
                    <Grid.Col span={1}></Grid.Col>
                    <Grid.Col span={10}>
                        <Slider
                            color="gray"
                            size="xs"
                            min={0}
                            max={10}
                            marks={[
                                {
                                    value: 0,
                                    label: 'Matrix AI'
                                },
                                {
                                    value: 2,
                                    label: 'GPT-4o'
                                },
                                {
                                    value: 4,
                                    label: 'Conductor'
                                },
                                {
                                    value: 6,
                                    label: 'Lattice'
                                },
                                {
                                    value: 8,
                                    label: 'Cluster'
                                },
                                {
                                    value: 10,
                                    label: 'Hypercluster'
                                },
                            ]}
                        />
                    </Grid.Col>
                    <Grid.Col span={1}></Grid.Col>
                </Grid>
            </div>
            <div style={{height: '185px'}}></div>
        </div>
    );
});

DynamicTextarea.displayName = 'DynamicTextarea';
export default DynamicTextarea;
*/