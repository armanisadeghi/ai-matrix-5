// app/trials/chat-cache/[id]/page.tsx

import MessageList from '@/app/trials/chat-cache/[id]/MessageList';
import React from 'react';

interface PageProps {
    params: { id: string };
}

export default function Page({ params }: PageProps) {
    const chatId = decodeURIComponent(params.id);

    return (
        <div>
            <MessageList chatId={chatId} />
        </div>
    );
}
