import { createContext, ReactNode, useContext, useState } from "react";

interface NavbarContextProps {
    opened: boolean;
    toggleOpened: () => void;
}

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
    const [opened, setOpened] = useState(false);

    const toggleOpened = () => setOpened(!opened);

    return (
        <NavbarContext.Provider
            value={{
                opened,
                toggleOpened,
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
