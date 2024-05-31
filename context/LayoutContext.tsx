"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";

type NavState = "full" | "compact" | "icons" | "hidden";

interface LayoutContextType {
    opened: boolean;
    asideOpen: boolean;
    toggleOpened: () => void;
    navbarState: NavState;
    handleNavbarToggle: () => void;
    handleNavbarExpand: () => void;
    handleNavbarCollapse: () => void;
    handleIconMouseover: () => void;
    handleEndIconMouseover: () => void;
    iconMouseOver: boolean;
    toggleNavbar: (value: NavState) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) throw new Error("useLayout must be used within a LayoutProvider");
    return context;
};

interface LayoutProviderProps {
    children: ReactNode;
    initialNavbarState?: NavState;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children, initialNavbarState }) => {
    const [opened, setOpened] = useState(false);
    const [asideOpen, setAsideOpen] = useState(false);
    const [iconMouseOver, setIconMouseOver] = useState(false);
    const [navbarConfig, setNavbarConfig] = useLocalStorage<NavState>({
        key: "ai-matrix-navbar",
        defaultValue: initialNavbarState,
    });

    const toggleOpened = () => setOpened(!opened);
    // const toggleAside = () => setAsideOpen(!asideOpen);
    const toggleNavbar = (state: NavState) => setNavbarConfig(state);

    const handleIconMouseover = () => {
        if (!iconMouseOver) {
            setIconMouseOver(true);
            setNavbarConfig("compact");
        }
    };

    const handleEndIconMouseover = () => {
        if (iconMouseOver) {
            setIconMouseOver(false);
            setNavbarConfig("icons");
        }
    };

    const handleNavbarToggle = () => {
        setIconMouseOver(false);
        if (navbarConfig === "full") toggleNavbar("compact");
        else if (navbarConfig === "compact") toggleNavbar("icons");
        else if (navbarConfig === "icons") toggleNavbar("hidden");
        else toggleNavbar("full");
    };

    const handleNavbarExpand = () => {
        setIconMouseOver(false);
        if (navbarConfig === "icons") toggleNavbar("compact");
        else if (navbarConfig === "compact") toggleNavbar("full");
    };

    const handleNavbarCollapse = () => {
        setIconMouseOver(false);
        if (navbarConfig === "full") toggleNavbar("compact");
        else if (navbarConfig === "compact") toggleNavbar("icons");
    };

    return (
        <LayoutContext.Provider
            value={{
                opened,
                toggleOpened,
                asideOpen,
                navbarState: navbarConfig,
                handleNavbarToggle,
                handleNavbarExpand,
                handleNavbarCollapse,
                handleIconMouseover,
                handleEndIconMouseover,
                iconMouseOver,
                toggleNavbar,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};
