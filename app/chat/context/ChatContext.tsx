import { iChat } from "../types/types";
import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

const ChatContext = createContext<{
    chatHistory: iChat[];
    setChatHistory: React.Dispatch<React.SetStateAction<iChat[]>>;
}>({
    chatHistory: [],
    setChatHistory: () => {}
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chatHistory, setChatHistory] = useState<iChat[]>([]);

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
