import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "@mantine/hooks";

type NavState = "full" | "compact" | "icons" | "hidden";

interface SidebarContextProps {
    asideOpen: boolean;
    asideState: NavState;
    title?: string;  // Optional title property added by Armani (TODO Kevin: Remove comments after seeing this)
    toggleAside: (value: NavState) => void;
    setSidebarContent: (content: ReactNode, title?: string) => void;  // Update to accept title
    sidebarContent: ReactNode;
    handleToggle: () => void;
    handleExpand: () => void;
    handleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = (
    {
    children,
    initialAsideState,
    initialTitle,
}: {
    children: ReactNode;
    initialAsideState?: NavState;
    initialTitle?: string;
}) => {
    const [asideOpen, setAsideOpen] = useState(true);
    const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);
    const [title, setTitle] = useState<string | undefined>(initialTitle);
    const [asideConfig, setAsideConfig] = useLocalStorage<NavState>({
        key: "ai-matrix-aside",
        defaultValue: initialAsideState,
    });

    const toggleAside = (state: NavState) => setAsideConfig(state);

    const handleToggle = () => {
        if (asideConfig === "full") toggleAside("compact");
        else if (asideConfig === "compact") toggleAside("icons");
        else if (asideConfig === "icons") toggleAside("hidden");
        else toggleAside("hidden");
    };

    const handleExpand = () => {
        if (asideConfig === "icons") toggleAside("compact");
        else if (asideConfig === "compact") toggleAside("full");
    };

    const handleCollapse = () => {
        if (asideConfig === "full") toggleAside("compact");
        else if (asideConfig === "compact") toggleAside("icons");
        else if (asideConfig === "icons") toggleAside("hidden");
    };

    return (
        <SidebarContext.Provider
            value={{
                asideOpen,
                asideState: asideConfig,
                title,  // Provide title in the context
                toggleAside,
                setSidebarContent: (content, title) => {
                    setSidebarContent(content);
                    setTitle(title);
                },
                sidebarContent,
                handleToggle,
                handleExpand,
                handleCollapse,
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
