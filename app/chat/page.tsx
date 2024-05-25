"use client"

import React from 'react'
import Chat from '@/components/Chat'
import { ChatProvider } from '@/context/chatContext'
import ChatPage from "@/app/chat/chatpage";

const page = () => {
    return (
        <ChatProvider>
            <ChatPage />
        </ChatProvider>
    )
}

export default page
