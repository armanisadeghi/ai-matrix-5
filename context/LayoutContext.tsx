import React, { createContext, ReactNode, useContext, useState } from "react";

interface LayoutContextType {
    opened: boolean;
    asideOpen: boolean;
    toggleOpened: () => void;
    toggleAside: () => void;
    handleIconMouseover: () => void;
    handleEndIconMouseover: () => void;
    iconMouseOver: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) throw new Error("useLayout must be used within a LayoutProvider");
    return context;
};

interface LayoutProviderProps {
    children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
    const [opened, setOpened] = useState(false);
    const [asideOpen, setAsideOpen] = useState(false);
    const [iconMouseOver, setIconMouseOver] = useState(false);

    const toggleOpened = () => setOpened(!opened);
    const toggleAside = () => setAsideOpen(!asideOpen);

    const handleIconMouseover = () => {
        if (!iconMouseOver) {
            setIconMouseOver(true);
        }
    };

    const handleEndIconMouseover = () => {
        if (iconMouseOver) {
            setIconMouseOver(false);
        }
    };

    return (
        <LayoutContext.Provider
            value={{
                opened,
                toggleOpened,
                toggleAside,
                asideOpen,
                handleIconMouseover,
                handleEndIconMouseover,
                iconMouseOver,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};
