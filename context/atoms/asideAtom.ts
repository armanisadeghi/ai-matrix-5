import { atom } from "recoil";

export type AsideAtomState = "full" | "compact" | "icons" | "hidden";

export const sidebarState = atom<AsideAtomState>({
    key: "sidebarState",
    default: "hidden",
});
