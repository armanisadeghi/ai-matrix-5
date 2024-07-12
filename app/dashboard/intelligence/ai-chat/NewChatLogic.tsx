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
            console.log('DEBUG NewChatLogic useEffect: chatId was matrix-ai. Set isNewChat to true')
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
            console.log('DEBUG NewChatLogic useEffect: transitioned chat')

        }
    }, [transitionState, setIsNewChat]);

    return null;
}
