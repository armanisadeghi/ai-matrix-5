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

export const windowWidthState = atom<number | null>({
    key: "windowWidthState",
    default: null,
});

export const windowHeightState = atom<number | null>({
    key: "windowHeightState",
    default: null,
});

export const availableWidthSelector = selector({
    key: "availableWidthSelector",
    get: ({ get }) => {
        const { leftNavWidth, rightNavWidth, windowWidth } = get(
            waitForAll({
                leftNavWidth: navbarWidthDirectAtom,
                rightNavWidth: sidebarWidthDirectAtom,
                windowWidth: windowWidthState,
            }),
        );
        console.log("Width Data:", { leftNavWidth, rightNavWidth, windowWidth });

        if (windowWidth === null) {
            throw new Error("windowWidth is null");
        }

        return {
            width: windowWidth - (leftNavWidth ?? 0) - (rightNavWidth ?? 0),  // TODO KEVIN: Armani updated this to fix your error, but not sure if it's the way you want. If it's not, change it and make it better but don't delete my code.
        };
    },
});

export const availableHeightSelector = selector({
    key: "availableHeightSelector",
    get: ({ get }) => {
        const { headerHeight, footerHeight, windowHeight } = get(
            waitForAll({
                headerHeight: headerHeightDirectAtom,
                footerHeight: footerHeightDirectAtom,
                windowHeight: windowHeightState,
            }),
        );
        console.log("Height Data:", { headerHeight, footerHeight, windowHeight });

        if (windowHeight === null) {
            throw new Error("windowHeight is null");
        }

        return {
            height: windowHeight - (headerHeight ?? 0) - (footerHeight ?? 0),    // TODO KEVIN: Armani showing Kevin respect with comments about why he edited things. (I wish Kevin would do the same)
        };
    },
});
