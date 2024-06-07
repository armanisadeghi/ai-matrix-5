// Chat.tsx
'use client';

import React from 'react';
import { useHeader } from "@/context/HeaderContext";
import { useChatMessages } from "../../../ai-tests/shared/atoms/chatAtoms";
import styles from './chat.module.css';
import { useChatSubmission } from "./../hooks/useChatSubmission";
import UserInputArea from '../input/UserInputArea';
import ResponseColumn from '../Response/ResponseColumn';
import { useMediaQuery } from "@mantine/hooks";

export default function Chat() {
    const { userTextInput, setUserTextInput, messages, handleSubmit } = useChatSubmission();
    const activeChatMessagesArray = useChatMessages();
    const { headerState } = useHeader();
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <ResponseColumn messages={messages} />
                <UserInputArea
                    userTextInput={userTextInput}
                    setUserTextInput={setUserTextInput}
                    handleSubmit={handleSubmit}
                />
            </div>
            {isSmallScreen && (
                <div style={{
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    zIndex: 1000
                }}>
                </div>
            )}
        </>
    );
};
