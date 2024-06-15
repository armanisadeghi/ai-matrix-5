import { atom } from "recoil";

export type HeaderAtomState = "large" | "medium" | "compact";

export const headerState = atom<HeaderAtomState>({
    key: "headerState",
    default: "medium",
});
