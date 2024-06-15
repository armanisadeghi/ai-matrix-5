import { atom } from "recoil";

export type FooterAtomState = "full" | "compact" | "icons" | "hidden";

export const footerState = atom<FooterAtomState>({
    key: "footerState",
    default: "hidden",
});
