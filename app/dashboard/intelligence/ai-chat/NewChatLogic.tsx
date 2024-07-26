// app/dashboard/intelligence/ai-chat/NewChatLogic.tsx

'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { activeChatIdAtom, chatTransitionAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { v4 } from 'uuid';


interface ChatClientLogicProps {
    chatId: string;
}

export default function NewChatLogic({chatId}: ChatClientLogicProps) {
    const [, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const [transitionState, setTransitionState] = useRecoilState(chatTransitionAtom);

    useEffect(() => {
        setActiveChatId(chatId);
        if (chatId === 'matrix-ai') {
            setIsNewChat(true);
        }

    }, [chatId]);

    useEffect(() => {
        if (!isNewChat) return;

        const newChatId = v4();
        setTransitionState('new');
        setActiveChatId(newChatId);

    }, [isNewChat, setTransitionState, setActiveChatId]);

    useEffect(() => {
        if (transitionState === 'transition') {
            setIsNewChat(false);
            setTransitionState('idle');

        }
    }, [transitionState, setIsNewChat]);

    return null;
}
