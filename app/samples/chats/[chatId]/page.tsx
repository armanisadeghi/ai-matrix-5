// app/samples/chats/[chatId]/page.tsx
'use client';

import React, { useEffect } from 'react';
import ChatDetail from '../../ChatComponents/ChatDetail';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeUserAtom } from '@/context/atoms/userAtoms';
import { activeChatIdAtom } from "@/context/atoms/chatAtoms";


const ChatPage = ({ params }: { params: { chatId: string } }) => {
    const activeUser = useRecoilValue(activeUserAtom);
    const setActiveChatId = useSetRecoilState(activeChatIdAtom);
    const { chatId } = params;

    useEffect(() => {
        setActiveChatId(chatId);
    }, [chatId, setActiveChatId]);

    return (
        <div>
            {activeUser ? (
                <ChatDetail user_id={activeUser.id} chat_id={chatId} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ChatPage;
