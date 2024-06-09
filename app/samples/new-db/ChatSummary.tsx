/*

import React, { useEffect, useState } from 'react';
import useChatApi from './hooks/useChatApi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeUserAtom } from "@/context/atoms/userAtoms";
import { chatSummaryAtom, selectedChatIdAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";


const ChatSummary = () => {
    const { loading, error, fetchChatSummaries, fetchChatDetails, createChat, addMessageToChat } = useChatApi();
    const activeUser = useRecoilValue(activeUserAtom);
    const [chatSummary, setChatSummaries] = useRecoilState(chatSummaryAtom);
    const setSelectedChatId = useSetRecoilState(selectedChatIdAtom);
    const userId = activeUser?.id ?? '';


    useEffect(() => {
        const loadChatSummaries = async () => {
            const summaries = await fetchChatSummaries(userId);
            setChatSummaries(summaries);
        };

        loadChatSummaries();
    }, [fetchChatSummaries]);



    const fetchSummaries = async (userId: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/db?userId=${userId}`);
            const data = await response.json();
            setChatSummaries(data);
        } catch (err) {
            setError('Failed to fetch chat summaries');
        }
        setLoading(false);
    };



    const handleChatSelect = (chatId: string) => {
        setSelectedChatId(chatId);
    };

    return (
        <div>
            <textarea value={userId} readOnly />
            {error && <p>{error}</p>}
            <ul>
                {chatSummary.map((chat) => (
                    <li key={chat.chatId} onClick={() => handleChatSelect(chat.chatId)}>
                        {chat.chatTitle}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSummary;
*/