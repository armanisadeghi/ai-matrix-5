import { activeChatIdAtom, chatTransitionAtom, systemMessageAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatDetailsType, MessageType } from '@/types';
import { createChatStartEntry } from '@/utils/supabase/chatDb';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const useChatStarter = () => {
    const chatTransitionState = useRecoilValue(chatTransitionAtom);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const userId = useRecoilValue(activeUserAtom).matrixId;
    const systemMessage = useRecoilValue(systemMessageAtom);

    return (userMessage: string, chatId: string): ChatDetailsType => {
        if (chatTransitionState !== 'new') throw new Error('ERROR! chatStarter called when transition state is not "NEW"');
        if (chatId !== activeChatId) throw new Error('ERROR! chatStarter ChatId does NOT MATCH activeChatId');
        if (userMessage.length === 0) throw new Error('ERROR! chatStarter called with empty messages');
        if (!userId) throw new Error('ERROR! chatStarter called but User Id not found');

        const systemMessageEntry: MessageType = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index: 0,
            role: 'system',
            text: systemMessage,
        };

        const userMessageEntry: MessageType = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index: 1,
            role: 'user',
            text: userMessage,
        };

        const assistantEntry = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index: 2,
            role: 'assistant',
            text: '',
        };

        const initialMessages: MessageType[] = [systemMessageEntry, userMessageEntry, assistantEntry];
        const chatTitle = userMessage.length > 25 ? userMessage.substring(0, 25) + '...' : userMessage;

        const chatStartObject = {
            chatId: activeChatId,
            chatTitle: chatTitle,
            createdAt: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            matrixId: userId,
            metadata: {},
            messages: initialMessages,
        };





        Promise.resolve().then(() => {
            createChatStartEntry(chatStartObject).catch(error => {
                console.error('Failed to add custom message:', error);
            });
        });

        return chatStartObject;
    };
};
