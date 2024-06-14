// AiContext/NavbarContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { NavbarAtomState, navbarState } from "./atoms";

interface NavbarContextProps {
    opened: boolean;
    toggleOpened: () => void;
    navbarState: NavbarAtomState;
    handleNavbarToggle: () => void;
    handleNavbarExpand: () => void;
    handleNavbarCollapse: () => void;
    handleIconMouseover: () => void;
    handleEndIconMouseover: () => void;
    iconMouseOver: boolean;
    toggleNavbar: (value: NavbarAtomState) => void;
}

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const NavbarProvider = ({ children, initialState }: { children: ReactNode; initialState?: NavbarAtomState }) => {
    const [opened, setOpened] = useState(false);
    const [iconMouseOver, setIconMouseOver] = useState(false);
    const [navState, setNavState] = useRecoilState(navbarState);

    const toggleOpened = () => setOpened(!opened);

    const toggleNav = (state: NavbarAtomState) => setNavState(state);

    const handleToggle = () => {
        if (navState === "full") toggleNav("compact");
        else if (navState === "compact") toggleNav("icons");
        else if (navState === "icons") toggleNav("hidden");
        else toggleNav("full");
    };

    const handleExpand = () => {
        if (navState === "icons") toggleNav("compact");
        else if (navState === "compact") toggleNav("full");
    };

    const handleCollapse = () => {
        if (navState === "full") toggleNav("compact");
        else if (navState === "compact") toggleNav("icons");
        else if (navState === "icons") toggleNav("hidden");
    };

    const handleIconMouseover = () => {
        if (!iconMouseOver) {
            setIconMouseOver(true);
            setNavState("compact");
        }
    };

    const handleEndIconMouseover = () => {
        if (iconMouseOver) {
            setIconMouseOver(false);
            setNavState("icons");
        }
    };

    useEffect(() => {
        setNavState(initialState ?? "compact");
    }, [initialState]);

    return (
        <NavbarContext.Provider
            value={{
                opened,
                toggleOpened,
                navbarState: navState,
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
