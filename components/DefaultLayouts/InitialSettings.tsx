// interface/DefaultLayouts/InitialSettings.tsx
"use client";

import { useEffect, useState } from "react";
import { useLayout } from "@/context/LayoutContext";
import { useSidebar } from "@/context/SidebarContext";
import { useHeader } from "@/context/HeaderContext";
import { useFooter } from "@/context/FooterContext";
import { useSetRecoilState } from 'recoil';
import { presetAtom, PresetType } from "@/context/atoms/layoutAtoms";

interface InitialSettingsProps {
    preset: PresetType;
}

const InitialSettings: React.FC<InitialSettingsProps> = ({ preset }) => {
    const { toggleNavbar } = useLayout();
    const { toggleAside } = useSidebar();
    const { toggleHeader } = useHeader();
    const { toggleFooter } = useFooter();
    const setPreset = useSetRecoilState(presetAtom);
    const [initialSettingsApplied, setInitialSettingsApplied] = useState(false);

    useEffect(() => {
        if (!initialSettingsApplied) {
            switch (preset) {
                case "Standard":
                    toggleNavbar("compact");
                    toggleAside("hidden");
                    toggleHeader("medium");
                    toggleFooter("hidden");
                    break;
                case "MinimalNav":
                    toggleNavbar("icons");
                    toggleAside("hidden");
                    toggleHeader("medium");
                    toggleFooter("hidden");
                    break;
                case "IconsFullAside":
                    toggleNavbar("icons");
                    toggleAside("full");
                    toggleHeader("medium");
                    toggleFooter("hidden");
                    break;
                case "IconsCompactAside":
                    toggleNavbar("icons");
                    toggleAside("compact");
                    toggleHeader("medium");
                    toggleFooter("hidden");
                    break;
                case "Balanced":
                    toggleNavbar("compact");
                    toggleAside("compact");
                    toggleHeader("medium");
                    toggleFooter("hidden");
                    break;
                case "Public":
                    toggleNavbar("hidden");
                    toggleAside("hidden");
                    toggleHeader("hidden");
                    toggleFooter("hidden");
                    break;
                default:
                    break;
            }
            setPreset(preset);
            setInitialSettingsApplied(true);
        }
    }, [preset, toggleNavbar, toggleAside, toggleHeader, toggleFooter, initialSettingsApplied, setPreset]);

    return null;
};

export default InitialSettings;
