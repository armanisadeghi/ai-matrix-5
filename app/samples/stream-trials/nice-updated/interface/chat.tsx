// Chat.tsx
'use client';

import React from 'react';
import { useHeader } from "@/context/HeaderContext";
import { activeChatMessagesArrayAtom, useChatMessages } from "../../../ai-tests/shared/atoms/chatAtoms";
import styles from '../../../../../components/AiChat/Response/chat.module.css';
import { useChatSubmission } from "./../hooks/useChatSubmission";
import UserInputArea from '../input/UserInputArea';
import ResponseColumn from '../../../../../components/AiChat/Response/extra/ResponseColumn';
import { useMediaQuery } from "@mantine/hooks";
import { Space, Textarea } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import AmeJsonInput from "@/ui/json/AmeJsonInput";
import { ChatSidebarListAtom } from "../../../ai-tests/shared/atoms/chatAtoms";

export default function Chat() {
    const { userTextInput, setUserTextInput, messages, handleSubmit } = useChatSubmission();
    const { headerState } = useHeader();
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const combinedResponses = messages.map(msg => msg.response).join("\n");

    const [ activeChatMessagesArray, setActiveChatMessagesArray ] = useRecoilState(activeChatMessagesArrayAtom);
    const [ chatSidebarList ] = useRecoilState(ChatSidebarListAtom);

    console.log('activeChatMessagesArray', activeChatMessagesArray);

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
            <Space h={10} />

            <AmeJsonInput
                value={JSON.stringify(activeChatMessagesArray, null, 2)}
                label="Message Array From Atom"
            />
            <AmeJsonInput
                value={JSON.stringify(chatSidebarList, null, 2)}
                label="Message Array From Atom"
            />


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
