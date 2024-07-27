// app/dashboard/intelligence/ai-chat/[id]/ChatClientLogic.tsx

'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { activeChatIdAtom, chatMessagesSelectorFamily, chatTransitionAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useLoadChats } from '@/hooks/ai/useLoadChats';
import { v4 } from 'uuid';


interface ChatClientLogicProps {
    chatId: string;
}

export default function ChatClientLogic({chatId}: ChatClientLogicProps) {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const [transitionState, setTransitionState] = useRecoilState(chatTransitionAtom);
    const {chatSummaries, loading: chatsLoading, error: chatsError} = useLoadChats();
    const messages = chatMessagesSelectorFamily(chatId);

    useEffect(() => {
        setActiveChatId(chatId);
        if (chatId === 'matrix-ai') {
            setIsNewChat(true);
        } else {
            setIsNewChat(false);
        }
    }, [chatId]);

    useEffect(() => {
        if (!isNewChat) return;

        const newChatId = v4();
        setTransitionState('new');
        setActiveChatId(newChatId);
        console.log('DEBUG NewChatLogic useEffect:: isNewChat set a new newChatId: ', newChatId)

    }, [isNewChat, setTransitionState, setActiveChatId]);

    useEffect(() => {
        if (transitionState === 'transition') {
            setIsNewChat(false);
            setTransitionState('idle');
            console.log('DEBUG NewChatLogic useEffect:: transitioned chat')
        }
    }, [transitionState, setIsNewChat]);

    useEffect(() => {
        if (isNewChat !== false) return;
        if (chatId === 'matrix-ai' || activeChatId === 'matrix-ai') { return; }
        if (!messages) {
            console.log('Messages are not loaded');
        }

        if (chatId !== activeChatId) {
            console.log(`ERROR! ChatID Mismatch...`);
            console.log('chatId: ', chatId);
            console.log('Active: ', activeChatId);
        } else {
            console.log(`ID MATCH!: ${chatId}`);
        }
        const messageCount = Array.isArray(messages) ? messages.length : 0;
        console.log(`Message count: ${messageCount}`);

    }, [chatId, activeChatId]);

    useEffect(() => {
        if (chatsError) {
            console.error('Error loading chats:', chatsError);
        }
    }, []);

    return null;
}
