import { chatMessagesSelectorFamily, chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MessageType } from '@/types';

export function useChatMessages(chatId: string) {
    const chatMessagesSelectorState = useRecoilValue(chatMessagesSelectorFamily(chatId));
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const chats = useRecoilValue(chatSummariesAtom)
    const chatEntry = chats.find(chat => chat.chatId === chatId);




    const addUserMessage = useCallback(async (userInput: string) => {
        const updatedMessages = await chatMessagesSelectorState.addUserMessage(userInput);
        setMessages(updatedMessages);
    }, [chatMessagesSelectorState]);

    const addAssistantText = useCallback(async (messageId: string, fullResponse: string) => {
        await chatMessagesSelectorState.addAssistantText (messageId, fullResponse);
    }, [chatMessagesSelectorState]);

    return {
        chatEntry,
        addUserMessage,
        addAssistantText
    };
}
