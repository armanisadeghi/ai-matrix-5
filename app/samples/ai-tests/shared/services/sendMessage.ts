
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeUserAtom } from "@/context/atoms/userAtoms";
import saveMessageToDb from "./saveMessageToDb";
import { submitChatRequest } from './SteamOpenAi';
import { handleDynamicElements } from "./dynamicSocketHandler";
import { activeChatIdAtom, activeChatMessagesArrayAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import { MessageEntry } from "@/types/chat";


export const handleRequests = async (req: Request, res: Response) => {
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const [messageText, setMessageText] = useState<string>('');
    const [currentChatId, setCurrentChatId] = useRecoilState(activeChatIdAtom);
    const ActiveUserId = useRecoilValue(activeUserAtom);
    const user_id = useRecoilValue(activeUserAtom)?.id;
    const chat_id = useRecoilValue(activeChatIdAtom);


    // 1. Determine the





}

// Utility Functions
export const useChatMessages = () => {
    const [messages, setMessages] = useRecoilState(activeChatMessagesArrayAtom);

    const addMessage = (messageEntry: MessageEntry) => {
        setMessages([...messages, messageEntry]);
    };

    const deleteMessage = (index: number) => {
        setMessages(messages.filter((_, i) => i !== index));
    };

    const resetToIndex = (index: number) => {
        setMessages(messages.slice(0, index + 1));
    };

    const editMessage = (index: number, newMessage: MessageEntry) => {
        const newMessages = [...messages];
        newMessages[index] = newMessage;
        setMessages(newMessages);
    };

    return {
        messages,
        addMessage,
        deleteMessage,
        resetToIndex,
        editMessage,
    };
};
