// AiContext/SidebarContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";

type NavState = "full" | "compact" | "icons" | "hidden";

interface FooterContextProps {
    footerState: NavState;
    toggleFooter: (value: NavState) => void;
    setSidebarContent: (content: ReactNode) => void;
    sidebarContent: ReactNode;
    handleToggle: () => void;
    handleExpand: () => void;
    handleCollapse: () => void;
}

const FooterContext = createContext<FooterContextProps | undefined>(undefined);

export const FooterProvider = ({ children, initialState }: { children: ReactNode; initialState?: NavState }) => {
    const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);
    const [footerConfig, setFooterConfig] = useLocalStorage<NavState>({
        key: "ai-matrix-footer",
        defaultValue: initialState,
    });

    const toggleFooter = (state: NavState) => setFooterConfig(state);

    const handleToggle = () => {
        if (footerConfig === "full") toggleFooter("compact");
        else if (footerConfig === "compact") toggleFooter("icons");
        else if (footerConfig === "icons") toggleFooter("hidden");
        else toggleFooter("full");
    };

    const handleExpand = () => {
        if (footerConfig === "icons") toggleFooter("compact");
        else if (footerConfig === "compact") toggleFooter("full");
    };

    const handleCollapse = () => {
        if (footerConfig === "full") toggleFooter("compact");
        else if (footerConfig === "compact") toggleFooter("icons");
        else toggleFooter("hidden");
    };

    return (
        <FooterContext.Provider
            value={{
                footerState: footerConfig,
                toggleFooter,
                setSidebarContent,
                sidebarContent,
                handleToggle,
                handleExpand,
                handleCollapse,
            }}
        >
        </FooterContext.Provider>
    );
};

export const useFooter = () => {
    const context = useContext(FooterContext);
    if (!context) {
        console.log("useFooter must be used within a FooterProvider");
    }
    return context;
};
