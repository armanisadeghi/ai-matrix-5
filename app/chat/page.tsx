// app/chat/page.tsx

"use client"

import React from 'react'
import { ChatProvider } from './context/ChatContext';
import ChatPage from "@/app/chat/chatpage";

const page = () => {
    return (
        <ChatProvider>
            <ChatPage />
        </ChatProvider>
    )
}

export default page
