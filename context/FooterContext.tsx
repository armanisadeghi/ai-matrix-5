import { createContext, ReactNode, useContext, useState } from "react";

interface FooterContextProps {
    setSidebarContent: (content: ReactNode) => void;
    sidebarContent: ReactNode;
}

const FooterContext = createContext<FooterContextProps | undefined>(undefined);

export const FooterProvider = ({ children }: { children: ReactNode }) => {
    const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);

    return (
        <FooterContext.Provider
            value={{
                setSidebarContent,
                sidebarContent,
            }}
        >
            {children}
        </FooterContext.Provider>
    );
};

export const useFooter = () => {
    const context = useContext(FooterContext);
    if (!context) {
        throw new Error("useFooter must be used within a FooterProvider");
    }
    return context;
};
