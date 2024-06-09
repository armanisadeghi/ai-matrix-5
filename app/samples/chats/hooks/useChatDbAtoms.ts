import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
    chatSummariesSelector,
    chatDetailsSelector,
    selectedChatIdAtom,
    selectedChatMessagesSelector,
    useFetchAndStoreChatDetails,
    userTextInputAtom,
    systemMessagesAtom,
    activeChatMessagesArrayAtom
} from '@/app/samples/ai-tests/shared/atoms/chatAtoms';
import { activeUserAtom } from '@/context/atoms/userAtoms';
import { useState } from 'react';
import supabase from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

export const useChatManager = () => {
    const activeUser = useRecoilValue(activeUserAtom);
    const [selectedChatId, setSelectedChatId] = useRecoilState(selectedChatIdAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
    const chatDetailsLoadable = useRecoilValueLoadable(chatDetailsSelector);
    const chatMessages = useRecoilValue(selectedChatMessagesSelector(selectedChatId || ''));
    const fetchAndStoreChatDetails = useFetchAndStoreChatDetails();

    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const [newMessage, setNewMessage] = useState('');
    const [newChatTitle, setNewChatTitle] = useState('');

    const userId = activeUser?.id ?? '';
    const firstName = activeUser?.firstName ?? '';
    const systemMessage = useRecoilValue(systemMessagesAtom);



    const handleChatSelect = async (chatId: string) => {
        setSelectedChatId(chatId);
        await fetchAndStoreChatDetails(chatId);
    };




    const handleCreateChat = () => {
        setSelectedChatId(null);
        setNewChatTitle('New Chat');
        setNewMessage('');
        setActiveChatMessages([]);
    };

    const addNewChatToDatabase = async () => {
        const title = newMessage.slice(0, 20);
        const newChatId = uuidv4();
        const initialMessages = [
            { index: 0, text: systemMessage.text, role: systemMessage.role },
            { index: 1, role: 'user', text: userTextInput }
        ];

        const { data, error } = await supabase
            .from('chats')
            .insert({
                chat_id: newChatId,
                user_id: userId,
                chat_title: title,
                created_at: new Date(),
                last_edited: new Date(),
                messages_array: initialMessages
            })
            .select();

        if (error) {
            console.error('Error creating new chat:', error);
        } else {
            console.log('New chat created:', data);
            setSelectedChatId(newChatId);
        }
    };

    const handleAddMessage = async () => {
        if (!newMessage) return;

        setUserTextInput(newMessage);

        const newMessageEntry = { index: activeChatMessages.length, role: 'user', text: newMessage };
        const updatedMessagesArray = [...activeChatMessages, newMessageEntry];
        setActiveChatMessages(updatedMessagesArray);

        if (!selectedChatId) {
            await addNewChatToDatabase();
        } else {
            const { data, error } = await supabase
                .from('chats')
                .update({ messages_array: updatedMessagesArray, last_edited: new Date() })
                .match({ chat_id: selectedChatId })
                .select();

            if (error) {
                console.error('Error adding message:', error);
            } else {
                console.log('Message added:', data);
                fetchAndStoreChatDetails(selectedChatId);
            }
        }

        setNewMessage('');
    };

    return {
        activeUser,
        selectedChatId,
        setSelectedChatId,
        chatSummariesLoadable,
        chatDetailsLoadable,
        chatMessages,
        userTextInput,
        setUserTextInput,
        activeChatMessages,
        setActiveChatMessages,
        newMessage,
        setNewMessage,
        newChatTitle,
        setNewChatTitle,
        userId,
        firstName,
        systemMessage,
        handleChatSelect,
        handleCreateChat,
        handleAddMessage,
    };
};
