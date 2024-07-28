import { ReactNode, createContext, useContext, useState } from "react";

interface SidebarContextProps {
    title?: string;
    setSidebarContent: (content: ReactNode, title?: string) => void;
    sidebarContent: ReactNode;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children, initialTitle = "" }: { children: ReactNode; initialTitle?: string }) => {
    const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);
    const [title, setTitle] = useState<string | undefined>(initialTitle);

    return (
        <SidebarContext.Provider
            value={{
                title,
                setSidebarContent: (content, title) => {
                    setSidebarContent(content);
                    setTitle(title);
                },
                sidebarContent,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
