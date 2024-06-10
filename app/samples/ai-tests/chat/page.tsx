// app/chat/page.tsx

"use client"

import React from 'react'
import { ChatProvider } from './context/ChatContext';
import ChatPage from "@/app/samples/ai-tests/chat/chatpage";

const page = () => {
    return (
        <ChatProvider>
            <ChatPage />
        </ChatProvider>
    )
}

export default page
