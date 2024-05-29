import { useEffect, useContext } from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { HistoryContext } from '@/context/AiContext/HistoryContext';
import ChatSidebar from '@/app/dashboard/intelligence/ai-chatbot/components/sidebar/ChatSidebar';
import NewContentComponent from './NewContentComponent';

const useSetupSidebar = () => {
    const {setSidebarContent} = useSidebar();
    const {
        chatHistory,
        isLoading
    } = useContext(HistoryContext);

    useEffect(() => {
        if (isLoading) {
            // Display simple loading text
            setSidebarContent(<div>Loading...</div>);
        } else {
            // Display the main sidebar content once loading is complete
            setSidebarContent(
                <>
                    <ChatSidebar chatHistory={chatHistory} isLoading={isLoading}/>
                    <NewContentComponent/>
                </>
            );
        }

        return () => {
            setSidebarContent(null);
        };
    }, [isLoading, setSidebarContent]); // Depend on isLoading to re-run when it changes
};

export default useSetupSidebar;
