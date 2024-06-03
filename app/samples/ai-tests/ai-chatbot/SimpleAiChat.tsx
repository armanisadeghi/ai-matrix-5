import React, { useState, useEffect, useRef } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { allChatsAtom, chatIdAtom, chatTitleAtom, chatMessagesAtom, addMessageAtom, switchChatAtom, startNewChatAtom, editChatTitleAtom, currentChatAtom } from '@/armaniLocal/org/atoms/ChatAtoms';
import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { Button, Space, Textarea } from "@mantine/core";
import UserMessageArea from "@/app/samples/ai-tests/ai-chatbot/components/input/UserMessageArea";

const ChatComponent: React.FC = () => {
    const allChats = useAtomValue(allChatsAtom);
    const currentChatId = useAtomValue(chatIdAtom);
    const currentChatMessages = useAtomValue(chatMessagesAtom);
    const currentChatTitle = useAtomValue(chatTitleAtom);
    const addMessage = useSetAtom(addMessageAtom);
    const switchChat = useSetAtom(switchChatAtom);
    const startNewChat = useSetAtom(startNewChatAtom);
    const editChatTitle = useSetAtom(editChatTitleAtom);
    const [userInput, setUserInput] = useState("");
    const [editTitle, setEditTitle] = useState(currentChatTitle);
    const [selectedAtom, setSelectedAtom] = useState<string>('');
    const [atomValue, setAtomValue] = useState<string>('');

    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setEditTitle(currentChatTitle);
    }, [currentChatTitle]);

    // Start a new chat when the component mounts
    useEffect(() => {
        if (allChats.length === 0) {
            startNewChat();
        }
    }, [startNewChat, allChats.length]);

    const handleSendMessage = () => {
        if (userInput.trim()) {
            addMessage({ text: userInput, role: 'user' as RoleType });
            setUserInput("");
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSaveAndNewChat = () => {
        startNewChat();
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.target.value);
    };

    const handleSaveTitle = () => {
        if (currentChatId) {
            editChatTitle(editTitle);
        } else {
            console.error('No current chat ID set. Cannot save title.');
        }
    };

    // Handle atom selection and display value
    const handleAtomSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedAtom(selected);
        const value = getAtomValue(selected);
        setAtomValue(value);
    };

    // Function to get the current value of the selected atom
    const getAtomValue = (atomName: string) => {
        switch (atomName) {
            case 'allChatsAtom':
                return JSON.stringify(allChats, null, 2);
            case 'chatIdAtom':
                return JSON.stringify(currentChatId, null, 2);
            case 'chatMessagesAtom':
                return JSON.stringify(currentChatMessages, null, 2);
            case 'chatTitleAtom':
                return JSON.stringify(currentChatTitle, null, 2);
            default:
                return 'Unknown Atom';
        }
    };

    return (
        <div>
            <div>
                {allChats.map(chat => (
                    <Button variant="filled" size="xs" radius="md"  key={chat.chatId} onClick={() => switchChat(chat.chatId)}>
                        {chat.title}
                    </Button>
                ))}
            </div>
            <Space h="md" />
            <div>
                <h3>{currentChatTitle}</h3>
            </div>
            <Space h="md" />

            <div>
                {currentChatMessages.map((msg) => (
                    <div key={msg.id}>
                        <span>{msg.role}: </span>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            <Space h="md" />
            <UserMessageArea
                userInput={userInput}
                handleInputChange={handleInputChange}
                handleSendMessage={handleSendMessage}
                ref={inputRef}
            />
            <Space h="xl" />


            <Button variant="filled" size="xs" radius="md" onClick={handleSaveAndNewChat}>Save and New</Button>
            <Space h="md" />


            <div>
                <input
                    type="text"
                    value={editTitle}
                    onChange={handleTitleChange}
                    placeholder="Edit chat title"
                />
                <Button variant="filled" size="xs" radius="md"  onClick={handleSaveTitle}>Save Title</Button>
            </div>
            <Space h="md" />

            <div style={{ marginTop: '20px' }}>
                <label htmlFor="atom-select">Select Atom to View: </label>
                <select id="atom-select" value={selectedAtom} onChange={handleAtomSelect}>
                    <option value="">Select Atom</option>
                    <option value="allChatsAtom">allChatsAtom</option>
                    <option value="chatIdAtom">chatIdAtom</option>
                    <option value="chatMessagesAtom">chatMessagesAtom</option>
                    <option value="chatTitleAtom">chatTitleAtom</option>
                </select>
                <Space h="md" />
                <AmeJsonInput label={'JSON Display'} value={atomValue} onChange={setAtomValue}/>
            </div>
        </div>
    );
};

export default ChatComponent;
