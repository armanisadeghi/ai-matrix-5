'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
    opened: boolean;
    toggleOpened: () => void;
    asideOpen: boolean;
    toggleAside: () => void;
    navbarState: "full" | "compact" | "icons" | "hidden";
    handleNavbarToggle: () => void;
    handleNavbarExpand: () => void;
    handleNavbarCollapse: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) throw new Error('useLayout must be used within a LayoutProvider');
    return context;
};

export const LayoutProvider: React.FC<{ children: ReactNode, initialNavbarState: "full" | "compact" | "icons" | "hidden" }> = ({ children, initialNavbarState }) => {
    const [opened, setOpened] = useState(false);
    const [asideOpen, setAsideOpen] = useState(false);
    const [navbarState, setNavbarState] = useState(initialNavbarState);

    const toggleOpened = () => setOpened(!opened);
    const toggleAside = () => setAsideOpen(!asideOpen);

    const handleNavbarToggle = () => {
        if (navbarState === "full") setNavbarState("compact");
        else if (navbarState === "compact") setNavbarState("icons");
        else if (navbarState === "icons") setNavbarState("hidden");
        else setNavbarState("full");
    };

    const handleNavbarExpand = () => {
        if (navbarState === "icons") setNavbarState("compact");
        else if (navbarState === "compact") setNavbarState("full");
    };

    const handleNavbarCollapse = () => {
        if (navbarState === "full") setNavbarState("compact");
        else if (navbarState === "compact") setNavbarState("icons");
    };

    return (
        <LayoutContext.Provider value={{
            opened, toggleOpened, asideOpen, toggleAside,
            navbarState, handleNavbarToggle, handleNavbarExpand, handleNavbarCollapse
        }}>
            {children}
        </LayoutContext.Provider>
    );
};
