import React, { useState, useRef } from 'react';
import { RoleType, MessageEntry } from '@/types/chat';
import { Button, Space } from "@mantine/core";
import UserMessageArea from "@/app/samples/ai-tests/ai-chatbot/components/input/UserMessageArea";
import { useRecoilState } from 'recoil';
import { allChatsAtom, activeChatIdAtom, activeChatMessagesArrayAtom} from '@/context/atoms/chatAtoms';
import { submitChatRequest } from '@/app/samples/ai-tests/shared/SteamOpenAi';


const ChatComponent: React.FC = () => {
    const [allChats, setAllChats] = useRecoilState(allChatsAtom);
    const [currentChatId, setCurrentChatId] = useRecoilState(activeChatIdAtom);
    const [currentChatMessages, setCurrentChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const [userInput, setUserInput] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);



    const handleSendMessage = async () => {
        if (userInput.trim()) {
            const newMessage: MessageEntry = { text: userInput, role: 'user' as RoleType };
            const updatedChat = [...currentChatMessages, newMessage];
            setCurrentChatMessages(updatedChat);
            setUserInput("");

            try {
                if (currentChatId) {
                    await submitChatRequest(updatedChat, (message: MessageEntry) => {
                        console.log('Message:', message);

                            setCurrentChatMessages(prevChat => {
                                const chatCopy = [...prevChat];
                                chatCopy[chatCopy.length - 1] = message;
                                return chatCopy;
                            });
                        },
                        (message: MessageEntry) => {
                            setCurrentChatMessages(prevChat => {
                                const chatCopy = [...prevChat];
                                chatCopy[chatCopy.length - 1] = message;
                                return chatCopy;
                            });
                        }
                    );
                }
            } catch (error) {
                console.error('Failed to submit chat request:', error);
            }

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

    return (
        <div>
            <div>
                {allChats.map(chat => (
                    <Button variant="filled" size="xs" radius="md" key={chat.chatId} onClick={() => setCurrentChatId(chat.chatId)}>
                        {chat.chatTitle}
                    </Button>
                ))}
            </div>

            <div>
                {currentChatMessages.map((msg, index) => (
                    <div key={index}>
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
                handleKeyDown={handleKeyDown}
                // @ts-ignore
                ref={inputRef}
            />
            <Space h="xl" />
        </div>
    );
};

export default ChatComponent;
