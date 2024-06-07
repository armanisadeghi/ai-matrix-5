// AiContext/NavbarContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";

type NavState = "full" | "compact" | "icons" | "hidden";

interface NavbarContextProps {
    opened: boolean;
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

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const NavbarProvider = ({ children, initialNavState }: { children: ReactNode; initialNavState?: NavState }) => {
    const [opened, setOpened] = useState(false);
    const [iconMouseOver, setIconMouseOver] = useState(false);
    const [navConfig, setNavConfig] = useLocalStorage<NavState>({
        key: "ai-matrix-navbar",
        defaultValue: initialNavState,
    });

    const toggleOpened = () => setOpened(!opened);

    const toggleNav = (state: NavState) => setNavConfig(state);

    const handleToggle = () => {
        if (navConfig === "full") toggleNav("compact");
        else if (navConfig === "compact") toggleNav("icons");
        else if (navConfig === "icons") toggleNav("hidden");
        else toggleNav("full");
    };

    const handleExpand = () => {
        if (navConfig === "icons") toggleNav("compact");
        else if (navConfig === "compact") toggleNav("full");
    };

    const handleCollapse = () => {
        if (navConfig === "full") toggleNav("compact");
        else if (navConfig === "compact") toggleNav("icons");
        else if (navConfig === "icons") toggleNav("hidden");
    };

    const handleIconMouseover = () => {
        if (!iconMouseOver) {
            setIconMouseOver(true);
            setNavConfig("compact");
        }
    };

    const handleEndIconMouseover = () => {
        if (iconMouseOver) {
            setIconMouseOver(false);
            setNavConfig("icons");
        }
    };

    useEffect(() => {
        setNavConfig(initialNavState ?? "compact");
    }, [initialNavState]);

    return (
        <NavbarContext.Provider
            value={{
                opened,
                toggleOpened,
                navbarState: navConfig,
                handleNavbarToggle: handleToggle,
                handleNavbarExpand: handleExpand,
                handleNavbarCollapse: handleCollapse,
                handleIconMouseover,
                handleEndIconMouseover,
                iconMouseOver,
                toggleNavbar: toggleNav,
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error("useNavbar must be used within a NavbarProvider");
    }
    return context;
};
