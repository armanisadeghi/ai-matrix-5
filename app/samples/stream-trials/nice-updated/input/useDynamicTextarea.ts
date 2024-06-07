import { useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { activeChatMessagesArrayAtom, useChatMessages } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import { useRequestManager } from "@/app/samples/ai-tests/shared/services/RequestManager";

type Role = 'user' | 'assistant' | 'system'

interface MessageEntry {
    role: Role;
    text: string;
}

export interface DynamicTextareaProps {
    systemText: string;
    placeholderText: string;
    userInput: string;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const useDynamicTextarea = (handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { addMessage } = useChatMessages();
    const { handleRequest } = useRequestManager();
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
        handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
    };

    const handleSubmitMessage = async () => {
        const text = textareaRef.current?.value || '';
        if (text.trim()) {
            const newUserMessage: MessageEntry = {
                role: 'user',
                text: text.trim()
            };
            addMessage(newUserMessage);
            handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
            textareaRef.current?.focus();

            await handleRequest({
                updatedChat: [newUserMessage],
                updateCallback: (chunk: string) => {
                    setActiveMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'assistant') {
                            const updatedMessage: MessageEntry = {
                                ...lastMessage,
                                text: lastMessage.text + chunk
                            };
                            return [
                                ...prevMessages.slice(0, prevMessages.length - 1),
                                updatedMessage,
                            ];
                        } else {
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
                    setActiveMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'assistant') {
                            const updatedMessage: MessageEntry = {
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

    return {
        collapsed,
        isFocused,
        setIsFocused,
        textareaRef,
        handleToggle,
        handleBoxClick,
        handleUpload,
        handleDelete,
        handleSubmitMessage
    };
};
