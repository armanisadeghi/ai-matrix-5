import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Divider, Space } from "@mantine/core";
import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { ChatManager } from '@/services/Chats';
import { activeUserAtom } from "@/context/atoms/userAtoms";
import {
    activeChatIdAtom,
    activeChatMessagesArrayAtom,
    detailsForAllChatsAtom,
    activeChatTitleAtom,
    activeChatDetailsAtom,
    systemMessagesAtom,
    chatTitlesAndIdsAtom,
    allChatsAtom
} from "@/context/atoms/chatAtoms";

const AtomPage: React.FC = () => {
    const [selectedAtom, setSelectedAtom] = useState('');
    const [atomValue, setAtomValue] = useState('');
    const [editTitle, setEditTitle] = useState('');
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

    const handleSaveAndNewChat = async () => {
        if (chatManager) {
            const newChatId = await chatManager.createChat('New Chat');
            console.log('handleSaveAndNewChat New Chat ID:', newChatId);

            setCurrentChatId(newChatId || ""); // Handle null case properly
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.target.value);
    };

    const handleSaveTitle = () => {
        if (currentChatId && chatManager) {
            chatManager.changeChatTitle(editTitle, currentChatId);
        } else {
            console.error('No current chat ID set. Cannot save title.');
        }
    };

    const handleAtomSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedAtom(selected);
        const value = getAtomValue(selected);
        setAtomValue(value);
    };

    const getAtomValue = (atomName: string) => {
        switch (atomName) {
            case 'allChatsAtom':
                return JSON.stringify(allChats, null, 2);
            case 'activeChatIdAtom':
                return JSON.stringify(currentChatId, null, 2);
            case 'activeChatMessagesArrayAtom':
                return JSON.stringify(currentChatMessages, null, 2);
            case 'activeUserAtom':
                return JSON.stringify(activeUser, null, 2);
            case 'systemMessagesAtom':
                return JSON.stringify(systemMessagesAtom, null, 2);
            case 'detailsForAllChatsAtom':
                return JSON.stringify(detailsForAllChatsAtom, null, 2);
            case 'chatTitlesAndIdsAtom':
                return JSON.stringify(chatTitlesAndIdsAtom, null, 2);
            case 'activeChatIdAtom':
                return JSON.stringify(activeChatIdAtom, null, 2);
            case 'activeChatDetailsAtom':
                return JSON.stringify(activeChatDetailsAtom, null, 2);
            case 'activeChatMessagesArrayAtom':
                return JSON.stringify(activeChatMessagesArrayAtom, null, 2);
            case 'activeChatTitleAtom':
                return JSON.stringify(activeChatTitleAtom, null, 2);
            default:
                return 'Unknown Atom';
        }
    };

    return (
        <div>
            <Space h="xl"/>
            <Divider my="xs" label="Testing Center" labelPosition="center"/>
            <Button variant="filled" size="xs" radius="md" onClick={handleSaveAndNewChat}>Save and New</Button>
            <Space h="md"/>
            <Space h="md"/>
            <div>
                <h3>{currentChatId ? chatManager?.getChat(currentChatId)?.chatTitle : "No Chat Selected"}</h3>
            </div>
            <Space h="md"/>
            <div>
                <input
                    type="text"
                    value={editTitle}
                    onChange={handleTitleChange}
                    placeholder="Edit chat title"
                />
                <Button variant="filled" size="xs" radius="md" onClick={handleSaveTitle}>Save Title</Button>
            </div>
            <Space h="md"/>
            <div style={{marginTop: '20px'}}>
                <label htmlFor="atom-select">Select Atom to View: </label>
                <select id="atom-select" value={selectedAtom} onChange={handleAtomSelect}>
                    <option value="">Select Atom</option>
                    <option value="chatManagerAtom">chatManagerAtom</option>
                    <option value="systemMessagesAtom">systemMessagesAtom</option>
                    <option value="detailsForAllChatsAtom">detailsForAllChatsAtom</option>
                    <option value="chatTitlesAndIdsAtom">chatTitlesAndIdsAtom</option>
                    <option value="activeChatIdAtom">activeChatIdAtom</option>
                    <option value="activeChatDetailsAtom">activeChatDetailsAtom</option>
                    <option value="activeChatMessagesArrayAtom">activeChatMessagesArrayAtom</option>
                    <option value="activeChatTitleAtom">activeChatTitleAtom</option>
                </select>
                <Space h="md"/>
                <AmeJsonInput label={'JSON Display'} value={atomValue} onChange={setAtomValue}/>
            </div>
        </div>
    );
};
export default AtomPage;
