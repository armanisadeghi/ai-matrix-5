/*

'use client';
import { useActiveChat } from '@/hooks/ai/useActiveChat';
import React, { useEffect, useState, ReactNode } from 'react';


interface PageProps {
    params: { chatId: string };
    children: ReactNode;
}

const Page: React.FC<PageProps> = ({params, children}) => {
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const chatId = decodeURIComponent(params.chatId);
    const {startNewChat} = useActiveChat();

    console.log(params)
    console.log('Chat ID:', chatId);

    const handleNewChat = async () => {
        await startNewChat();
    };

    useEffect(() => {
        if (chatId === 'new-chat') {
            handleNewChat();
        } else if (!chatId) {
            throw new Error('No chat ID provided');
        } else {
            setActiveChatId(chatId);
            console.log('Chat ID:', chatId);
        }
    }, [chatId, handleNewChat]);

    return (
        <>
            {children}
        </>
    );
};

export default Page;
*/






/*
 function Page() {
 const { bottomPadding } = useDynamicChatLayout();

 return (
 <ResponseArea bottomPadding={bottomPadding} />
 );
 }

 export default Page;
 */
