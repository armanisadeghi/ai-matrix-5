import { MessageType } from '@/types';
import { useRecoilState } from 'recoil';
import { useCallback, useState, useEffect } from 'react';
import { activeChatIdAtom, chatMessagesAtomFamily } from '@/state/aiAtoms/aiChatAtoms';

export const useActiveChatMessages = () => {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [activeMessages, setActiveMessages] = useState<MessageType[]>([]);
    const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
    const [messagesAtom, setMessagesAtom] = useRecoilState(chatMessagesAtomFamily(activeChatId));

    // Initialize active messages when the component mounts or activeChatId changes
    useEffect(() => {
        if (activeChatId) {
            setActiveMessages(messagesAtom);
            setNewMessageIds(new Set());
        }
    }, [activeChatId, messagesAtom]);


    // Add a new message to active state
    const addMessage = useCallback((message: MessageType) => {
        setActiveMessages(prev => [...prev, message]);
        setNewMessageIds(prev => new Set(prev).add(message.id));
    }, []);


    // Update an existing message in active state
    const updateMessage = useCallback((updatedMessage: MessageType) => {
        setActiveMessages(prev =>
            prev.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg)
        );
    }, []);


    // Push updates to chatMessagesAtomFamily and reset new message tracking
    const pushUpdatesToFamily = useCallback(() => {
        const newMessages = activeMessages.filter(msg => newMessageIds.has(msg.id));
        setMessagesAtom(prev => [...prev, ...newMessages]);
        setNewMessageIds(new Set());
    }, [activeMessages, newMessageIds, setMessagesAtom]);


    // Finalize changes when switching chats or unmounting
    useEffect(() => {
        return () => {
            if (activeChatId) {
                pushUpdatesToFamily();
            }
        };
    }, [activeChatId, pushUpdatesToFamily]);


    return {
        activeChatId,
        setActiveChatId,
        activeMessages,
        addMessage,
        updateMessage,
        pushUpdatesToFamily,
    };
};
