import { chatMessagesSelectorFamily, chatSummariesAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MessageType } from '@/types';

export function useChatMessages(chatId: string) {
    const chatMessagesSelectorState = useRecoilValue(chatMessagesSelectorFamily(chatId));
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const chats = useRecoilValue(chatSummariesAtom);
    const chatEntry = chats.find(chat => chat.chatId === chatId);
    const newChat = useRecoilValue(isNewChatAtom);

    useEffect(() => {
        if (newChat) {
            setMessages([]);
            setLoading(false);
            setError(null);
            return;
        }

        const loadMessages = async () => {
            try {
                const fetchedMessages = await chatMessagesSelectorState.fetchMessages();
                setMessages(fetchedMessages);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [chatId, chatMessagesSelectorState, newChat]);

    const addUserMessage = useCallback(async (userInput: string) => {
        const updatedMessages = await chatMessagesSelectorState.addUserMessage(userInput);
        setMessages(updatedMessages);
    }, [chatMessagesSelectorState]);

    const addAssistantText = useCallback(async (messageId: string, fullResponse: string) => {
        await chatMessagesSelectorState.addAssistantText(messageId, fullResponse);
    }, [chatMessagesSelectorState]);

    return {
        messages: newChat ? [] : messages,
        loading: newChat ? false : loading,
        error: newChat ? null : error,
        chatEntry,
        addUserMessage,
        addAssistantText
    };
}
