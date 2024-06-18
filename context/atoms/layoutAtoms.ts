import { atom, selector, waitForAll } from "recoil";

export type PresetType = "Standard" | "MinimalNav" | "IconsFullAside" | "IconsCompactAside" | "Balanced" | "Public";

export const presetAtom = atom<PresetType>({
    key: "presetState",
    default: "Standard",
});

export const splitterDimensionsState = atom({
    key: "splitterDimensionsState",
    default: { width: 0, height: 0 },
});

export const headerHeightDirectAtom = atom<number | null>({
    key: "headerHeightDirectAtom",
    default: null,
});

export const footerHeightDirectAtom = atom<number | null>({
    key: "footerHeightDirectAtom",
    default: null,
});

export const navbarWidthDirectAtom = atom<number | null>({
    key: "navbarWidthDirectAtom",
    default: null,
});

export const sidebarWidthDirectAtom = atom<number | null>({
    key: "sidebarWidthDirectAtom",
    default: null,
});


// Some of the selectors and atoms were slightly modified and moved to state\layoutAtoms.ts

