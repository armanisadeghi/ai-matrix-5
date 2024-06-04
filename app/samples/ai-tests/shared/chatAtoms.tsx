// AtomPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from "@mantine/core";
import { activeUserAtom } from "@/context/atoms/userAtoms";
import {
    activeChatIdAtom,
    activeChatMessagesArrayAtom,
    detailsForAllChatsAtom,
    systemMessagesAtom,
    allChatsAtom
} from "@/context/atoms/chatAtoms";
import TestingUI from './tests/AtomTestUi';

interface AtomPageProps {
    showTests?: boolean;
}

const AtomPage: React.FC<AtomPageProps> = ({ showTests = false }) => {
    const [isTesterVisible, setIsTesterVisible] = useState(showTests);
    const setSystemMessages = useSetRecoilState(systemMessagesAtom);
    const systemMessages = useRecoilValue(systemMessagesAtom);
    const [activeUser] = useRecoilState(activeUserAtom);
    const [detailsForAllChats, setDetailsForAllChats] = useRecoilState(detailsForAllChatsAtom);
    const [currentChatId, setCurrentChatId] = useRecoilState(activeChatIdAtom);
    const [allChats, setAllChats] = useRecoilState(allChatsAtom);
    const [currentChatMessages, setCurrentChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const chatManager = ChatManager.getInstance();

    useEffect(() => {
        const initializeChat = async () => {
            if (chatManager) {
                const allUserChats = await chatManager.initializeAllChatsForUser('a048d457-c058-481b-a9a1-7d821b6435d5');
                setDetailsForAllChats(allUserChats);

                const chatId = await chatManager.createChat('New Chat');

                if (chatId) {
                    setCurrentChatId(chatId);
                    console.log("Default System Messages:", systemMessages);
                }
                const activeChat = chatManager.getActiveChat();
                console.log('Active Chat:', activeChat);
            }
        };
        initializeChat();
    }, [chatManager, setDetailsForAllChats, setCurrentChatId, systemMessages]);

    useEffect(() => {
        if (currentChatId && chatManager) {
            const currentChat = chatManager.getChat(currentChatId);
            console.log('Current Chat:', currentChat);
            if (currentChat) {
                setCurrentChatMessages(currentChat.getChatMessagesArray());
            }
        }
    }, [currentChatId, chatManager]);

    return (
        <div>
            <Button variant="filled" size="xs" radius="md" onClick={() => setIsTesterVisible(!isTesterVisible)}>
                {isTesterVisible ? 'Hide Tester' : 'Show Tester'}
            </Button>
            {isTesterVisible && (
                <TestingUI
                    currentChatId={currentChatId}
                    chatManager={chatManager}
                    setCurrentChatId={setCurrentChatId}
                    inputRef={inputRef}
                />
            )}
        </div>
    );
};

export default AtomPage;
