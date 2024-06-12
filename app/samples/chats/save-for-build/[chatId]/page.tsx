/*
'use client';

import { activeUserAtom } from "@/state/userAtoms";

console.log('app/samples/chats/[chatId]/page.tsx');

import React, { useEffect } from 'react';
import ChatDetail from '../components/ChatDetail';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeChatIdAtom } from "@/state/aiAtoms/chatAtoms";


const ChatPage = ({ params }: { params: { chatId: string } }) => {
    const activeUser = useRecoilValue(activeUserAtom);
    const setActiveChatId = useSetRecoilState(activeChatIdAtom);
    const user_id = activeUser?.sub; // Use sub instead of id
    const { chatId } = params;
    console.log('ChatPage chatId:', chatId);

    useEffect(() => {
        setActiveChatId(chatId);
    }, [chatId, setActiveChatId]);

    return (
        <div>
            {activeUser ? (
                <ChatDetail user_id={user_id} chat_id={chatId} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ChatPage;
*/
