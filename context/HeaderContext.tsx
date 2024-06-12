// AiContext/SidebarContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";

type NavState = "large" | "medium" | "compact";

interface HeaderContextProps {
    headerState: NavState;
    toggleHeader: (value: NavState) => void;
    setContent: (content: ReactNode) => void;
    content: ReactNode;
    handleToggle: () => void;
    handleExpand: () => void;
    handleCollapse: () => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider = ({ children, initialState }: { children: ReactNode; initialState?: NavState }) => {
    const [content, setContent] = useState<ReactNode>(null);
    const [headerConfig, setHeaderConfig] = useLocalStorage<NavState>({
        key: "ai-matrix-header",
        defaultValue: initialState,
    });

    const toggleHeader = (state: NavState) => setHeaderConfig(state);

    const handleToggle = () => {
        if (headerConfig === "large") toggleHeader("medium");
        else if (headerConfig === "medium") toggleHeader("compact");
        else toggleHeader("large");
    };

    const handleExpand = () => {
        if (headerConfig === "compact") toggleHeader("medium");
        else if (headerConfig === "medium") toggleHeader("large");
    };

    const handleCollapse = () => {
        if (headerConfig === "large") toggleHeader("medium");
        else toggleHeader("compact");
    };

    useEffect(() => {
        setHeaderConfig(initialState ?? "medium");
    }, [initialState]);

    return (
        <HeaderContext.Provider
            value={{
                headerState: headerConfig,
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
