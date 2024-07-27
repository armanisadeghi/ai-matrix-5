// app/dashboard/intelligence/ai-chat/[id]/page.tsx

import { ResponseArea } from '@/components/AiChat';
import AutoFetch from '@/components/AiChat/new/AutoFetch';
import React from 'react';
import ChatClientLogic from './ChatClientLogic';


interface PageProps {
    params: { id: string };
}

export default function Page({params}: PageProps) {
    const chatId = decodeURIComponent(params.id);

    return (
        <>


            <ChatClientLogic chatId={chatId}/>
        </>
    );
}
