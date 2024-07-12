/*
import { activeChatIdAtom, activeChatMessagesArrayAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { useState } from 'react';
import supabase from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { activeUserAtom } from "@/state/userAtoms";


export const oldChatDbAtoms = () => {
    const activeUser = useRecoilValue(activeUserAtom)
    const [activeChatId, setSelectedChatId] = useRecoilState(activeChatIdAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [newMessage, setNewMessage] = useState('');
    const [newChatTitle, setNewChatTitle] = useState('');
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);

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

    const newUserMessageEntry = {
        index: activeChatMessagesArray.length,
        role: 'user',
        text: userTextInput,
    };

    const firstUserInputToDb = async () => {

    }

    const addNewChatToDatabase = async () => {
        const title = userTextInput.slice(0, 20);
        const newChatId = uuidv4();

        const initialMessages = [...activeChatMessagesArray, newUserMessageEntry];

        const { data, error } = await supabase
            .from('chats')
            .insert({
                chat_id: newChatId,
                user_id: activeUser.matrixId,
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

    const updateMessageArray =(newMessageEntry) => {
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
        activeChatId,
        setSelectedChatId,
        userTextInput,
        setUserTextInput,
        newMessage,
        setNewMessage,
        newChatTitle,
        setNewChatTitle,
        handleChatSelect,
        addNewChatToDatabase,
        handleCreateChatLocal,
        addUserMessageToDb,
        pushUpdatedArrayToDb,
    };
};
*/
