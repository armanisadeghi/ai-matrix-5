import React from 'react';
import NewChatLogic from '@/app/dashboard/intelligence/ai-chat/NewChatLogic';

interface PageProps {
    params: { id?: string };
}

export default function Page({ params }: PageProps) {
    const chatId = params.id ? decodeURIComponent(params.id) : 'matrix-ai';

    return (
            <NewChatLogic chatId={chatId} />
    );
}
