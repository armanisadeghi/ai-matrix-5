'use client';
import React, { useContext } from 'react';
import { HistoryContext } from '@/context/AiContext/HistoryContext';
import ChatSidebar from "@/app/dashboard/intelligence/ai-chatbot/components/sidebar/ChatSidebar";
import { useSidebar } from "@/context/SidebarContext";

const ParentComponent: React.FC = () => {
    const { chatHistory, isLoading } = useContext(HistoryContext);
    const { setSidebarContent } = useSidebar();

    React.useEffect(() => {
        if (isLoading) {
            setSidebarContent(<div>Loading...</div>);
        } else {
            setSidebarContent(
                <ChatSidebar chatHistory={chatHistory} isLoading={isLoading} />
            );
        }

        return () => {
            setSidebarContent(null);
        };
    }, [isLoading, setSidebarContent]);

    return (
        <ChatSidebar chatHistory={chatHistory} isLoading={isLoading} />
    );
};

export default ParentComponent;
