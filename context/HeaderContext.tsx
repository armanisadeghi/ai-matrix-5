import { createContext, ReactNode, useContext, useState } from "react";

interface HeaderContextProps {
    setContent: (content: ReactNode) => void;
    content: ReactNode;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode>(null);

    return (
        <HeaderContext.Provider
            value={{
                setContent,
                content,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeader must be used within a HeaderProvider");
    }
    return context;
};
