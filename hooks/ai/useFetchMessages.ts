import { chatMessagesAtomFamily } from '@/state/aiAtoms/aiChatAtoms';
import supabase from '@/utils/supabase/client';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';

export function useChatMessages(chatId: string) {
    const [messages, setMessages] = useRecoilState(chatMessagesAtomFamily(chatId));
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchMessages() {
            if (messages && messages.length > 0) {
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase.rpc('fetch_messages', { matrix_chat_id: chatId });
                if (error) throw error;
                setMessages(data);
            } catch (err) {
                console.error('Error fetching chat messages:', err);
                setError('Failed to fetch messages');
            } finally {
                setLoading(false);
            }
        }

        fetchMessages();
    }, [chatId, messages, setMessages]);

    return { messages, error, loading };
}
