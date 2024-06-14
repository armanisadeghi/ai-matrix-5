// AiContext/SidebarContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { HeaderAtomState, headerState } from "./atoms";

interface HeaderContextProps {
    headerState: HeaderAtomState;
    toggleHeader: (value: HeaderAtomState) => void;
    setContent: (content: ReactNode) => void;
    content: ReactNode;
    handleToggle: () => void;
    handleExpand: () => void;
    handleCollapse: () => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider = ({ children, initialState }: { children: ReactNode; initialState?: HeaderAtomState }) => {
    const [content, setContent] = useState<ReactNode>(null);
    const [headState, setHeadState] = useRecoilState(headerState);

    const toggleHeader = (state: HeaderAtomState) => setHeadState(state);

    const handleToggle = () => {
        if (headState === "large") toggleHeader("medium");
        else if (headState === "medium") toggleHeader("compact");
        else toggleHeader("large");
    };

    const handleExpand = () => {
        if (headState === "compact") toggleHeader("medium");
        else if (headState === "medium") toggleHeader("large");
    };

    const handleCollapse = () => {
        if (headState === "large") toggleHeader("medium");
        else toggleHeader("compact");
    };

    useEffect(() => {
        setHeadState(initialState ?? "medium");
    }, [initialState]);

    return (
        <HeaderContext.Provider
            value={{
                headerState: headState,
                toggleHeader,
                setContent,
                content,
                handleToggle,
                handleExpand,
                handleCollapse,
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
