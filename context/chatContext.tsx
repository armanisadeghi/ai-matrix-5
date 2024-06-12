
import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect
} from "react";
// import axios from 'axios';
import loadChatHistory from '../app/data/fake-data/fake-chat-history/fake-chat-history';
import { iChat } from "@/app/samples/ai-tests/chat-app/types/types";

const ChatContext = createContext<{
    chatHistory: iChat[];
    setChatHistory: React.Dispatch<React.SetStateAction<iChat[]>>;
}>({
    chatHistory: [],
    setChatHistory: () => {}
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chatHistory, setChatHistory] = useState<iChat[]>([]);

    // Uncomment below to switch to real API data fetching
    /*
    useEffect(() => {
        const handledata = async () => {
            const result = await axios.get('https://aimatrix-api.vercel.app/api/aichat', {
                params: { user_id: user?.uid }
            });
            const chatData = result.data;
            if (chatData) {
                setIndex(chatData._id);
                if (chatData?.history) {
                    setChatHistory(chatData.history);
                    if (chatData.history.length > 0) {
                        setCurrentChat(0);
                    }
                }
            }
        };
        handledata();
    }, []);
    */

    return (
        <ChatContext.Provider
            value={{
                chatHistory,
                setChatHistory
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
