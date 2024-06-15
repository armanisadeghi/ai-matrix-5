import { atom } from "recoil";

export type NavbarAtomState = "full" | "compact" | "icons" | "hidden";

export const navbarState = atom<NavbarAtomState>({
    key: "navbarState",
    default: "hidden",
});
