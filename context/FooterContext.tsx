// AiContext/SidebarContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FooterAtomState, footerState } from "@/context/atoms";

interface FooterContextProps {
    footerState: FooterAtomState;
    toggleFooter: (value: FooterAtomState) => void;
    setSidebarContent: (content: ReactNode) => void;
    sidebarContent: ReactNode;
    handleToggle: () => void;
    handleExpand: () => void;
    handleCollapse: () => void;
}

const FooterContext = createContext<FooterContextProps | undefined>(undefined);

export const FooterProvider = ({ children, initialState }: { children: ReactNode; initialState?: FooterAtomState }) => {
    const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);
    const [footState, setFootState] = useRecoilState(footerState);

    const toggleFooter = (state: FooterAtomState) => setFootState(state);

    const handleToggle = () => {
        if (footState === "full") toggleFooter("compact");
        else if (footState === "compact") toggleFooter("icons");
        else if (footState === "icons") toggleFooter("hidden");
        else toggleFooter("full");
    };

    const handleExpand = () => {
        if (footState === "icons") toggleFooter("compact");
        else if (footState === "compact") toggleFooter("full");
    };

    const handleCollapse = () => {
        if (footState === "full") toggleFooter("compact");
        else if (footState === "compact") toggleFooter("icons");
        else toggleFooter("hidden");
    };

    useEffect(() => {
        setFootState(initialState ?? "hidden");
    }, [initialState]);

    return (
        <FooterContext.Provider
            value={{
                footerState: footState,
                toggleFooter,
                setSidebarContent,
                sidebarContent,
                handleToggle,
                handleExpand,
                handleCollapse,
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
