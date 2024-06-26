import { atom } from "recoil";

export const iconSizesAtom = atom<number>({
    key: "iconSizesAtom",
    default: 18,
});
