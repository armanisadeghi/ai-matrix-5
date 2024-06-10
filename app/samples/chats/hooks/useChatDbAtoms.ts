import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
    chatSummariesSelector,
    chatDetailsSelector,
    activeChatIdAtom,
    selectedChatMessagesSelector,
    useFetchAndStoreChatDetails,
    userTextInputAtom,
    activeChatMessagesArrayAtom, startingMessageArrayAtom
} from '@/state/aiAtoms/chatAtoms';
import { activeUserAtom } from '@/context/atoms/userAtoms';
import { useState } from 'react';
import supabase from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { MatrixMessage } from "@/types";


export const useChatDbAtoms = () => {
    const activeUser = useRecoilValue(activeUserAtom);
    const [activeChatId, setSelectedChatId] = useRecoilState(activeChatIdAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
    const chatDetailsLoadable = useRecoilValueLoadable(chatDetailsSelector);
    const chatMessages = useRecoilValue(selectedChatMessagesSelector(activeChatId || ''));
    const fetchAndStoreChatDetails = useFetchAndStoreChatDetails();

    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);

    const [newMessage, setNewMessage] = useState('');
    const [newChatTitle, setNewChatTitle] = useState('');

    const userId = activeUser?.id ?? '';
    const firstName = activeUser?.firstName ?? '';
    const startingMessageArray = useRecoilValue(startingMessageArrayAtom);

    const handleChatSelect = async (chatId: string) => {
        setSelectedChatId(chatId);
        await fetchAndStoreChatDetails(chatId);
    };

    const handleCreateChatLocal = () => {
        setSelectedChatId(null);
        setNewChatTitle('New Chat');
        setNewMessage('');
        setActiveChatMessagesArray([]);
    };

    const newUserMessageEntry: MatrixMessage = {
        index: startingMessageArray.length,
        role: 'user',
        text: userTextInput,
    };

    const firstUserInputToDb = async () => {

    }

    const addNewChatToDatabase = async () => {
        const title = userTextInput.slice(0, 20);
        const newChatId = uuidv4();

        const initialMessages = [...startingMessageArray, newUserMessageEntry];

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

    const addUserMessageToDb = () => {
        if (!userTextInput) {
            console.error('User message is empty. User Text Input Value:', userTextInput);
            return;
        }
        updateMessageArray(newUserMessageEntry);
        pushUpdatedArrayToDb();
    }

    const updateMessageArray =(newMessageEntry: MatrixMessage) => {
        const updatedArray = [...activeChatMessagesArray, newUserMessageEntry];
        setActiveChatMessagesArray(updatedArray);
    }

    const pushUpdatedArrayToDb = async () => {
        console.log('Pushing updated array to database:', activeChatMessagesArray);
        if (!activeChatId && !userTextInput) {
            throw new Error('No Chat ID and No User Text Input. Cannot add message to database.');
        }

        if (!activeChatId && userTextInput) {
            await addNewChatToDatabase();

        } else {
            const { data, error } = await supabase
                .from('chats')
                .update({ messages_array: activeChatMessagesArray, last_edited: new Date() })
                .match({ chat_id: activeChatId })
                .select();

            if (error) {
                console.error('Error adding message:', error);
            } else {
                console.log('Message added:', data);
                fetchAndStoreChatDetails(activeChatId);
            }
        }

        setNewMessage('');
    };

    return {
        activeUser,
        activeChatId,
        setSelectedChatId,
        chatSummariesLoadable,
        chatDetailsLoadable,
        chatMessages,
        userTextInput,
        setUserTextInput,
        newMessage,
        setNewMessage,
        newChatTitle,
        setNewChatTitle,
        userId,
        firstName,
        handleChatSelect,
        addNewChatToDatabase,
        handleCreateChatLocal,
        addUserMessageToDb,
        pushUpdatedArrayToDb,
    };
};
