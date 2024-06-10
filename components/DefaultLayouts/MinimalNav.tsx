// interface/DefaultLayouts/MinimalNav.tsx
"use client";

import { useEffect, useState } from "react";
import { useLayout } from "@/context/LayoutContext";
import { useSidebar } from "@/context/SidebarContext";
import { useHeader } from "@/context/HeaderContext";
import { useFooter } from "@/context/FooterContext";

const InitialSettings: React.FC = () => {
    const { toggleNavbar } = useLayout();
    const { toggleAside } = useSidebar();
    const { toggleHeader } = useHeader();
    const { toggleFooter } = useFooter();
    const [initialSettingsApplied, setInitialSettingsApplied] = useState(false);

    useEffect(() => {
        if (!initialSettingsApplied) {
            toggleNavbar("icons");
            toggleAside("hidden");
            toggleHeader("medium");
            toggleFooter("hidden");
            setInitialSettingsApplied(true);
        }
    }, [toggleNavbar, toggleAside, toggleHeader, toggleFooter, initialSettingsApplied]);

    return null;
};

export default InitialSettings;
