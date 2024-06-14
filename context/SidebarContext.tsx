import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AsideAtomState, sidebarState } from "@/context/atoms/asideAtom";

interface SidebarContextProps {
    asideOpen: boolean;
    asideState: AsideAtomState;
    title?: string; // Optional title property added by Armani (TODO Kevin: Remove comments after seeing this)
    toggleAside: (value: AsideAtomState) => void;
    setSidebarContent: (content: ReactNode, title?: string) => void; // Update to accept title
    sidebarContent: ReactNode;
    handleToggle: () => void;
    handleExpand: () => void;
    handleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({
    children,
    initialAsideState = "hidden",
    initialTitle = "",
}: {
    children: ReactNode;
    initialAsideState?: AsideAtomState;
    initialTitle?: string;
}) => {
    const [asideOpen, setAsideOpen] = useState(true);
    const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);
    const [title, setTitle] = useState<string | undefined>(initialTitle);
    const [asideState, setAsideState] = useRecoilState(sidebarState);

    const toggleAside = (state: AsideAtomState) => setAsideState(state);

    const handleToggle = () => {
        if (asideState === "full") toggleAside("compact");
        else if (asideState === "compact") toggleAside("icons");
        else if (asideState === "icons") toggleAside("hidden");
        else toggleAside("hidden");
    };

    const handleExpand = () => {
        if (asideState === "icons") toggleAside("compact");
        else if (asideState === "compact") toggleAside("full");
    };

    const handleCollapse = () => {
        if (asideState === "full") toggleAside("compact");
        else if (asideState === "compact") toggleAside("icons");
        else if (asideState === "icons") toggleAside("hidden");
    };

    useEffect(() => {
        setAsideState(initialAsideState ?? "hidden");
    }, [initialAsideState]);

    return (
        <SidebarContext.Provider
            value={{
                asideOpen,
                asideState,
                title, // Provide title in the context
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
