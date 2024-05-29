// context/SidebarContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextProps {
    asideOpen: boolean;
    toggleAside: () => void;
    setSidebarContent: (content: ReactNode) => void;
    sidebarContent: ReactNode;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [asideOpen, setAsideOpen] = useState(true);
    const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);

    const toggleAside = () => setAsideOpen(prev => !prev);

    return (
        <SidebarContext.Provider value={{ asideOpen, toggleAside, setSidebarContent, sidebarContent }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
