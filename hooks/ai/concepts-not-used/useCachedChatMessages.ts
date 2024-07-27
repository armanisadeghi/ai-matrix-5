// useCachedChatMessages.ts
import { useState, useEffect } from 'react';
import { useChatMessages } from '@/hooks/ai/useChatMessages';

const cache: Record<string, any> = {};

export const useCachedChatMessages = (chatId: string) => {
    const [cacheKey] = useState(chatId);
    const result = useChatMessages(chatId);

    useEffect(() => {
        if (!cache[cacheKey] && !result.loading && !result.error) {
            cache[cacheKey] = result;
        }
    }, [cacheKey, result]);

    return cache[cacheKey] || result;
};

